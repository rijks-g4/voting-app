import React, { useState } from 'react';
import { Alert, Box, Breadcrumbs, Container, Grid, Link, Snackbar, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import Canvas from '../../components/canvas/Canvas';
import Description from '../../components/description/Description';
import ModelList from '../../components/model-list/ModelList';


function Details(): JSX.Element {
    let { objectNumber } = useParams();
    const [selectedModels, setSelectedModels] = useState<string[]>([]);

    // Queries
    const { data: artObject } = useQuery('rawImage', getImage);
    const { data: masks } = useQuery('masks', getMasks);

    function getImage(): Promise<any> {
        return fetch(`${process.env.REACT_APP_BACK_END_URL}/art_object?object_number=${objectNumber}`)
            .then(res => res.json());
    }

    const voteMutation = useMutation((model: string) => {
        return fetch(`${process.env.REACT_APP_BACK_END_URL}/vote?object_number=${objectNumber}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model_name: model,
            }),
        })
        .then(res => res.json());;
    });

    function getMasks(): Promise<any> {
        return fetch(`${process.env.REACT_APP_BACK_END_URL}/masks?object_number=${objectNumber}`)
            .then(res => res.json());
    }

    return (
        <Container>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
                open={voteMutation.isSuccess}
                autoHideDuration={3000}
                onClose={() => voteMutation.reset()}
            >
                <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
                    Vote posted successfully!
                </Alert>
            </Snackbar>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/gallery">
                    Gallery
                </Link>
                <Typography color="text.primary">{objectNumber}</Typography>
            </Breadcrumbs>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    {artObject && masks && (
                        <Box width="100%" style={{ position: "relative" }}>
                            <Canvas
                                rawImageHref={artObject['webImage']['url']}
                                rawImageHeight={artObject['webImage']['height']}
                                rawImageWidth={artObject['webImage']['width']}
                                masks={masks}
                                selectedModels={selectedModels}
                            />
                        </Box>
                    )}
                </Grid>
                <Grid item xs={4}>
                    {masks && (
                        <ModelList
                            models={Object.keys(masks)}
                            voteModel={(model: string) => voteMutation.mutate(model)}
                            setSelectedModels={setSelectedModels}
                        />
                    )}
                </Grid>
                <Grid item xs={8}>
                    {artObject && (
                        <Description artObject={artObject} />
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}

Details.displayName = 'Details';
export default Details;
