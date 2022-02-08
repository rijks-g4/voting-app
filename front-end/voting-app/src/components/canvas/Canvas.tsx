import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { MASK_OPACITY } from '../../constants';
import './Canvas.css';

interface CanvasProps {
    artObject: any;
    // rawImageHref: string;
    // rawImageWidth: number;
    // rawImageHeight: number;
    masks: any;
    selectedModels: string[];
}

const CANVAS_HEIGHT = 700;

function Canvas(props: CanvasProps): JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const rawImageHref = props.artObject['webImage']['url'];
    const rawImageHeight = props.artObject['webImage']['height'];
    const rawImageWidth = props.artObject['webImage']['width'];

    useEffect(() => {
        const ctx: CanvasRenderingContext2D | null = canvasRef.current ? canvasRef.current.getContext('2d') : null;

        if (ctx && canvasRef.current) {
            const rawImage = new Image();
            rawImage.onload = () => {
                if (canvasRef.current) {
                    // Make it visually fill the positioned parent
                    canvasRef.current.style.width = '100%';
                    canvasRef.current.style.height = '100%';
                    // ...then set the internal size to match
                    canvasRef.current.width = canvasRef.current.offsetWidth;
                    canvasRef.current.height = canvasRef.current.offsetHeight;
                    ctx.imageSmoothingEnabled = false;
                    const ratio = rawImageWidth / rawImageHeight;
                    const height = CANVAS_HEIGHT;
                    const width = height * ratio;

                    const left = canvasRef.current.width / 2 - width / 2;
                    const top = canvasRef.current.height / 2 - height / 2;

                    ctx.drawImage(rawImage, left, top, width, height);
                    setIsLoading(false);

                    ctx.globalAlpha = MASK_OPACITY;
                    Object.keys(props.masks).forEach((model: any) => {
                        if (props.selectedModels.indexOf(model) !== -1) {
                            const image = new Image();
                            image.onload = function () {
                                ctx.drawImage(image, left, top, width, height);
                            };
                            image.src = `data:image/png;base64,${props.masks[model]}`;
                        }
                    });
                }
            }
            rawImage.src = rawImageHref;
        }
    }, [
        props.artObject,
        props.masks,
        props.selectedModels,
        canvasRef,
        rawImageHeight,
        rawImageHref,
        rawImageWidth
    ])

    return (
        <div style={{ width: "100%", height: `${700}px` }}>
            {isLoading && (
                <Box
                    display="flex"
                    justifyContent="center"
                >
                    <CircularProgress />
                </Box>
            )}
            <canvas ref={canvasRef} />
        </div>
    );
}

export default Canvas;
