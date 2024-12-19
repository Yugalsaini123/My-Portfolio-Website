import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import lightimg from "../assets/svg/lightimg.png";

const Container = styled.div`
    position: absolute;
    top: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const GlowingAnimation = ({ theme }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        class Vector {
            constructor(x, y) {
                this.x = x || 0;
                this.y = y || 0;
            }
            static add(v1, v2) {
                return new Vector(v1.x + v2.x, v1.y + v2.y);
            }
            static sub(v1, v2) {
                return new Vector(v1.x - v2.x, v1.y - v2.y);
            }
            add(v) {
                this.x += v.x;
                this.y += v.y;
                return this;
            }
            sub(v) {
                this.x -= v.x;
                this.y -= v.y;
                return this;
            }
            mult(value) {
                this.x *= value;
                this.y *= value;
                return this;
            }
            setXY(x, y) {
                this.x = x;
                this.y = y;
                return this;
            }
            dist(v) {
                const dx = this.x - v.x;
                const dy = this.y - v.y;
                return Math.sqrt(dx * dx + dy * dy);
            }
        }

        class Mouse {
            constructor(canvas) {
                this.pos = new Vector(-1000, -1000);
                this.radius = 50;

                canvas.onmousemove = (e) => this.pos.setXY(e.clientX, e.clientY);
                canvas.ontouchmove = (e) =>
                    this.pos.setXY(e.touches[0].clientX, e.touches[0].clientY);
                canvas.ontouchcancel = () => this.pos.setXY(-1000, -1000);
                canvas.ontouchend = () => this.pos.setXY(-1000, -1000);
            }
        }

        class Dot {
            constructor(x, y, color) {
                this.pos = new Vector(x, y);
                this.oldPos = new Vector(x, y);
                this.friction = 0.97;
                this.gravity = new Vector(0, 0.6);
                this.mass = 1;
                this.pinned = false;
                this.color = color;
                this.lightImg = document.querySelector("#light-img");
                this.lightSize = 20;
            }

            update(mouse) {
                if (this.pinned) return;

                let vel = Vector.sub(this.pos, this.oldPos);

                this.oldPos.setXY(this.pos.x, this.pos.y);

                vel.mult(this.friction);
                vel.add(this.gravity);

                let { x: dx, y: dy } = Vector.sub(mouse.pos, this.pos);
                const dist = Math.sqrt(dx * dx + dy * dy);

                const direction = new Vector(dx / dist, dy / dist);

                const force = Math.max((mouse.radius - dist) / mouse.radius, 0);

                if (force > 0.6) this.pos.setXY(mouse.pos.x, mouse.pos.y);
                else {
                    this.pos.add(vel);
                    this.pos.add(direction.mult(force));
                }
            }

            draw(ctx) {
                ctx.fillStyle = this.color;
                ctx.fillRect(
                    this.pos.x - this.mass,
                    this.pos.y - this.mass,
                    this.mass * 2,
                    this.mass * 2
                );
            }

            drawLight(ctx) {
                if (this.lightImg) {
                    ctx.drawImage(
                        this.lightImg,
                        this.pos.x - this.lightSize / 2,
                        this.pos.y - this.lightSize / 2,
                        this.lightSize,
                        this.lightSize
                    );
                }
            }
        }

        class Stick {
            constructor(p1, p2, color) {
                this.startPoint = p1;
                this.endPoint = p2;
                this.length = this.startPoint.pos.dist(this.endPoint.pos);
                this.tension = 0.3;
                this.color = color;
            }

            update() {
                const dx = this.endPoint.pos.x - this.startPoint.pos.x;
                const dy = this.endPoint.pos.y - this.startPoint.pos.y;

                const dist = Math.sqrt(dx * dx + dy * dy);
                const diff = (dist - this.length) / dist;

                const offsetX = diff * dx * this.tension;
                const offsetY = diff * dy * this.tension;

                const m = this.startPoint.mass + this.endPoint.mass;
                const m1 = this.endPoint.mass / m;
                const m2 = this.startPoint.mass / m;

                if (!this.startPoint.pinned) {
                    this.startPoint.pos.x += offsetX * m1;
                    this.startPoint.pos.y += offsetY * m1;
                }
                if (!this.endPoint.pinned) {
                    this.endPoint.pos.x -= offsetX * m2;
                    this.endPoint.pos.y -= offsetY * m2;
                }
            }

            draw(ctx) {
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1.5;
                ctx.moveTo(this.startPoint.pos.x, this.startPoint.pos.y);
                ctx.lineTo(this.endPoint.pos.x, this.endPoint.pos.y);
                ctx.stroke();
                ctx.closePath();
            }
        }

        class Rope {
            constructor(config) {
                this.x = config.x;
                this.y = config.y;
                this.segments = config.segments || 10;
                this.gap = config.gap || 15;
                this.color = config.color;
                this.dots = [];
                this.sticks = [];
                this.iterations = 10;

                this.createRope();
            }

            createRope() {
                // Create dots
                for (let i = 0; i < this.segments; i++) {
                    this.dots.push(new Dot(this.x, this.y + i * this.gap, this.color));
                }

                // Create sticks
                for (let i = 0; i < this.segments - 1; i++) {
                    this.sticks.push(new Stick(this.dots[i], this.dots[i + 1], this.color));
                }

                // Pin the first dot
                if (this.dots.length > 0) {
                    this.dots[0].pinned = true;
                }
            }

            update(mouse) {
                this.dots.forEach(dot => dot.update(mouse));
                for (let i = 0; i < this.iterations; i++) {
                    this.sticks.forEach(stick => stick.update());
                }
            }

            draw(ctx) {
                this.sticks.forEach(stick => stick.draw(ctx));
                this.dots.forEach(dot => dot.draw(ctx));
                if (this.dots.length > 0) {
                    this.dots[this.dots.length - 1].drawLight(ctx);
                }
            }
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const mouse = new Mouse(canvas);
        const ropes = [];
        const numRopes = window.innerWidth <= 768 ? 35 : 100;
        const canvasWidth = window.innerWidth;

        // Function to generate RGBA color based on theme
        const getRopeColor = () => {
            // Use the theme's textRgba values
            const baseColor = theme?.text || "#000000";
            const opacity = Math.random() * 0.4 + 0.3;
            return `${baseColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
        };

        // Create ropes with theme-based colors
        for (let i = 0; i < numRopes; i++) {
            ropes.push(
                new Rope({
                    x: Math.random() * canvasWidth,
                    y: 50,
                    segments: Math.floor(Math.random() * 10) + 10,
                    gap: Math.random() * 10 + 10,
                    color: getRopeColor()
                })
            );
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ropes.forEach(rope => {
                rope.update(mouse);
                rope.draw(ctx);
            });
            requestAnimationFrame(animate);
        }

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, [theme]);

    return (
        <Container>
            <canvas ref={canvasRef}></canvas>
            <img
                id="light-img"
                src={lightimg}
                alt="light"
                style={{ display: "none" }}
            />
        </Container>
    );
};

export default GlowingAnimation;