import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

interface DescriptionProps {
    artObject: any;
}

function Description(props: DescriptionProps): JSX.Element {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {props.artObject['objectNumber']}
                </Typography>
                <Typography variant="h5" component="div">
                    {props.artObject['title']}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {props.artObject['principalOrFirstMaker']}
                </Typography>
                <Typography variant="body2">
                    {props.artObject['description']}
                </Typography>
            </CardContent>
            <CardActions>
                <Button target="_blank" size="small" variant="contained" href={`http://www.rijksmuseum.nl/en/collection/${props.artObject['objectNumber']}`}>Learn More</Button>
            </CardActions>
        </Card>
    );
}

Description.displayName = 'Description';
export default Description;
