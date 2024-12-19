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

const GlowingAnimation = () => {
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
                this.isClicking = false;

                canvas.onmousemove = (e) => this.pos.setXY(e.clientX, e.clientY);
                canvas.ontouchmove = (e) =>
                    this.pos.setXY(e.touches[0].clientX, e.touches[0].clientY);
                canvas.ontouchcancel = () => this.pos.setXY(-1000, -1000);
                canvas.ontouchend = () => this.pos.setXY(-1000, -1000);
            }
        }

        class Dot {
            constructor(x, y) {
                this.pos = new Vector(x, y);
                this.oldPos = new Vector(x, y);

                this.friction = 0.97;
                this.gravity = new Vector(0, 0.6);
                this.mass = 1;

                this.pinned = false;

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

            drawLight(ctx) {
                ctx.drawImage(
                    this.lightImg,
                    this.pos.x - this.lightSize / 2,
                    this.pos.y - this.lightSize / 2,
                    this.lightSize,
                    this.lightSize
                );
            }

            draw(ctx) {
                ctx.fillStyle = "#aaa";
                ctx.fillRect(
                    this.pos.x - this.mass,
                    this.pos.y - this.mass,
                    this.mass * 2,
                    this.mass * 2
                );
            }
        }

        class Stick {
            constructor(p1, p2) {
                this.startPoint = p1;
                this.endPoint = p2;

                this.length = this.startPoint.pos.dist(this.endPoint.pos);
                this.tension = 0.3;
                this.isCut = false;
            }

            update() {
                if (this.isCut) return;

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
                if (this.isCut) return;

                ctx.beginPath();
                ctx.strokeStyle = "#999";
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
                this.color = config.color || "gray";

                this.dots = [];
                this.sticks = [];

                this.iterations = 10;
                this.isCut = false;
                this.cutIndex = null;

                this.create();
                this.pin(0);
            }

            pin(index) {
                this.dots[index].pinned = true;
            }

            create() {
                for (let i = 0; i < this.segments; i++) {
                    this.dots.push(new Dot(this.x, this.y + i * this.gap));
                }
                for (let i = 0; i < this.segments - 1; i++) {
                    this.sticks.push(new Stick(this.dots[i], this.dots[i + 1]));
                }
            }

            checkCut(mouse) {
                if (this.isCut) return;

                for (let i = 0; i < this.sticks.length; i++) {
                    const midX = (this.sticks[i].startPoint.pos.x + this.sticks[i].endPoint.pos.x) / 2;
                    const midY = (this.sticks[i].startPoint.pos.y + this.sticks[i].endPoint.pos.y) / 2;

                    const dist = Math.sqrt(
                        Math.pow(midX - mouse.pos.x, 2) + 
                        Math.pow(midY - mouse.pos.y, 2)
                    );

                    if (dist < mouse.radius) {
                        this.isCut = true;
                        this.cutIndex = i;
                        this.sticks[i].isCut = true;
                        return true;
                    }
                }
                return false;
            }

            update(mouse) {
                if (this.isCut) {
                    this.dots.forEach((dot) => {
                        if (this.cutIndex !== null && dot.pinned) {
                            dot.pinned = false;
                        }
                        dot.update(mouse);
                    });
                } else {
                    this.checkCut(mouse);
                    this.dots.forEach((dot) => {
                        dot.update(mouse);
                    });
                }

                for (let i = 0; i < this.iterations; i++) {
                    this.sticks.forEach((stick) => {
                        stick.update();
                    });
                }
            }

            draw(ctx) {
                this.dots.forEach((dot) => {
                    dot.draw(ctx);
                });
                this.sticks.forEach((stick) => {
                    stick.draw(ctx);
                });
                
                if (!this.isCut) {
                    this.dots[this.dots.length - 1].drawLight(ctx);
                } else {
                    // Draw light at cut point if rope is cut
                    const cutDot = this.dots[this.cutIndex + 1];
                    if (cutDot) {
                        cutDot.drawLight(ctx);
                    }
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
        const numRopes = window.innerWidth <= 768 ? 30 : 80;
        const canvasWidth = window.innerWidth;
        
        function createRope(x, y) {
            return new Rope({
                x: x,
                y: y,
                segments: Math.floor(Math.random() * 10) + 10,
                gap: Math.random() * 10 + 10,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            });
        }

        // Initial rope generation
        for (let i = 0; i < numRopes; i++) {
            ropes.push(createRope(Math.random() * canvasWidth, 50));
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
            // Track ropes to potentially replace
            const ropesToReplace = [];
        
            ropes.forEach((rope, index) => {
                rope.update(mouse);
                rope.draw(ctx);
        
                // If rope is cut, mark it for replacement
                if (rope.isCut) {
                    ropesToReplace.push({
                        index: index, 
                        x: rope.dots[rope.cutIndex + 1].pos.x, 
                        y: rope.dots[rope.cutIndex + 1].pos.y
                    });
                }
            });
        
            // Replace cut ropes
            ropesToReplace.forEach(ropeInfo => {
                ropes[ropeInfo.index] = createRope(ropeInfo.x, ropeInfo.y);
            });
        
            requestAnimationFrame(animate);
        }

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

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