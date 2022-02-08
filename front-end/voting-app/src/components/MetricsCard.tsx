import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';


export interface MetricsCardProps {
    src: string;
    imgHeight: any;
    // title: string;
    subheader?: string;
    description: string;
}


function MetricsCard(props: MetricsCardProps): JSX.Element {
    return (
        <Card
        style={{
            width: "fit-content"
        }}
        >
            <CardHeader
                title={props.description}
                subheader={props.subheader}
                style={{
                    textAlign: "center",
                }}
            />
            {/* <CardMedia
                component="img"
                image={props.src}
                height={props.imgHeight}
                style={{
                    margin: "auto",
                    // width: "200px !important"
                }}
            /> */}
            <CardContent
                style={{
                    padding: '0.5rem',
                }}
            >
                <img src={props.src} alt={props.description} height={props.imgHeight} />
            </CardContent>
        </Card>
    );
}

MetricsCard.displayName = 'MetricsCard';
export default MetricsCard;
