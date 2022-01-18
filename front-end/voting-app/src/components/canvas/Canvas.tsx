import React, { useEffect, useRef } from 'react';
import './Canvas.css';

interface CanvasProps {
    rawImageHref: string;
    rawImageWidth: number;
    rawImageHeight: number;
}

const CANVAS_HEIGHT = 500;

function Canvas(props: CanvasProps): JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ctx: CanvasRenderingContext2D | null = canvasRef.current ? canvasRef.current.getContext('2d') : null;

        if (ctx && canvasRef.current) {
            const rawImage = new Image();
            rawImage.onload = () => {
                if (canvasRef.current) {
                    // Make it visually fill the positioned parent
                    canvasRef.current.style.width ='100%';
                    canvasRef.current.style.height='100%';
                    // ...then set the internal size to match
                    canvasRef.current.width  = canvasRef.current.offsetWidth;
                    canvasRef.current.height = canvasRef.current.offsetHeight;
                    ctx.imageSmoothingEnabled = false;
                    const ratio = props.rawImageWidth / props.rawImageHeight;
                    const height = CANVAS_HEIGHT;
                    const width = height * ratio;
                    console.log(ratio, height, width);

                    const left = canvasRef.current.width / 2 - width / 2;
                    const top = canvasRef.current.height / 2 - height / 2;

                    ctx.drawImage(rawImage, left, top, width, height);
                }
            }
            rawImage.src = props.rawImageHref;
        }
    }, [props, canvasRef])
  
  return (
        <>
            <div style={{ width: "100%", height: `${CANVAS_HEIGHT}px` }}>
                <canvas ref={canvasRef} />
            </div>
        </>
  );
}

export default Canvas;
