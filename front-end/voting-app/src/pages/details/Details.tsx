import React from 'react';
import { Alert, Box, Breadcrumbs, Container, Grid, Link, Snackbar, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import Canvas from '../../components/canvas/Canvas';
import Description from '../../components/description/Description';
import ModelList from '../../components/model-list/ModelList';

function Details(): JSX.Element {
    let { objectNumber } = useParams();

    // Queries
    const { data: artObject, isLoading: rawImageIsLoading, isError: rawImageIsError } = useQuery('rawImage', getImage);

    // console.log(data);

    function getImage(): Promise<any> {
        // objectNumber
        return fetch(`https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}?key=9HWI0Lk3`)
            .then(res => res.json())
    }

    const models = [
        ['1', '#ECDCB0'],
        ['2', '#8CC084'],
        ['3', '#968E85'],
    ];

    const voteMutation = useMutation((model: string) => {
        return fetch(`https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}?key=9HWI0Lk3`)
            .then(res => res.json());
        // return fetch('asdadaadada', {
        //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //     mode: 'cors', // no-cors, *cors, same-origin
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         model: model,
        //         objectNumber: objectNumber,
        //     }) // body data type must match "Content-Type" header
        // });
    });

    // function getMasks(): Promise<any[]> {

    // }

    return (
        <Container>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
                open={voteMutation.isSuccess}
                autoHideDuration={6000}
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
                    {!rawImageIsLoading && !rawImageIsError && (
                        <Box width="100%" style={{ position: "relative" }}>
                            <Canvas
                                rawImageHref={artObject['artObject']['webImage']['url']}
                                rawImageHeight={artObject['artObject']['webImage']['height']}
                                rawImageWidth={artObject['artObject']['webImage']['width']}
                            />
                        </Box>
                    )}
                </Grid>
                <Grid item xs={4}>
                    <ModelList models={models} voteModel={(model: string) => voteMutation.mutate(model)} />
                </Grid>
                <Grid item xs={8}>
                    {!rawImageIsLoading && !rawImageIsError && (
                        <Description artObject={artObject['artObject']} />
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}

Details.displayName = 'Details';
export default Details;
