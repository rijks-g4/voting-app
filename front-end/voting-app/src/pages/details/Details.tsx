import React, { useState } from 'react';
import { Alert, Box, Breadcrumbs, Button, Card, CardContent, Container, Grid, Link, Snackbar, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

import Canvas from '../../components/canvas/Canvas';
import ModelList from '../../components/model-list/ModelList';
import { COLORS } from '../../constants';


interface DetailsProps {
    objectNumber?: string;
    voteCallback?: () => void;
    showSuccessSnackbar?: boolean;
}


function Details(props: DetailsProps): JSX.Element {
    const { objectNumber = props.objectNumber } = useParams();

    const [selectedModels, setSelectedModels] = useState<string[]>([]);

    const { data: artObject } = useQuery(['rawImage', objectNumber], getImage);
    const { data: masks, isLoading: masksAreLoading } = useQuery(['masks', objectNumber], getMasks);

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
        .then(res => {
            if (props.voteCallback) props.voteCallback();
            return res.json();
        });
    });

    function getMasks(): Promise<any> {
        return fetch(`${process.env.REACT_APP_BACK_END_URL}/masks?object_number=${objectNumber}`)
            .then(res => res.json());
    }

    return (
        <Container
            maxWidth="xl"
            style={{
                paddingTop: '1rem',
            }}
        >
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
                open={props.showSuccessSnackbar && voteMutation.isSuccess}
                autoHideDuration={3000}
                onClose={() => voteMutation.reset()}
            >
                <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
                    Vote posted successfully!
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
                open={masksAreLoading}
                // autoHideDuration={3000}
                // onClose={() => voteMutation.reset()}
            >
                <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
                    Art object is loading...
                </Alert>
            </Snackbar>
            <Breadcrumbs aria-label="breadcrumb" style={{ color: COLORS.LIGHT_GREY }}>
                <Link underline="hover" color={COLORS.MEDIUM_GOLD} href="/gallery">
                    Gallery
                </Link>
                <Typography color={COLORS.MEDIUM_GOLD}>{objectNumber}</Typography>
            </Breadcrumbs>
            {artObject && (
                <Card
                    style={{
                        backgroundColor: 'transparent'
                    }}
                >
                    <CardContent
                        style={{
                            padding: 0,
                        }}
                    >
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justifyContent="space-around"
                            // alignItems="center"
                        >
                            <Grid item xs={10} md={8}>
                                {masks && (
                                    <Box width="100%" style={{ position: "relative" }}>
                                        <Canvas
                                            artObject={artObject}
                                            // rawImageHref={artObject['webImage']['url']}
                                            // rawImageHeight={artObject['webImage']['height']}
                                            // rawImageWidth={artObject['webImage']['width']}
                                            masks={masks}
                                            selectedModels={selectedModels}
                                        />
                                    </Box>
                                )}
                            </Grid>
                            <Grid item xs={2} md={0} sx={{ display: { xs: 'block', md: 'none' } }} style={{ marginLeft: "auto", marginRight: "auto", paddingLeft: "0", paddingRight: "0" }}>
                                <Box
                                    // sx={{ display: { xs: 'block', md: 'none' } }}
                                    style={{
                                        backgroundColor: COLORS.MEDIUM_GOLD,
                                        textAlign: "center",
                                        margin: 'auto',
                                        // width: '100%',
                                        display: 'block',
                                        paddingBottom: "0.5rem",
                                        paddingTop: "0.5rem",
                                    }}
                                >
                                    Vote below

                                    <br />

                                    <FontAwesomeIcon
                                        icon={faArrowDown}
                                        style={{
                                            // color: '#1976d2',
                                            // color: '#0072b1',
                                            margin: '0 auto',
                                            marginTop: "0.25rem",
                                            display: 'block',
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                {masks && (
                                    <ModelList
                                        models={Object.keys(masks)}
                                        voteModel={(model: string) => voteMutation.mutate(model)}
                                        setSelectedModels={setSelectedModels}
                                    />
                                )}
                            </Grid>
                        </Grid>
                        <Box
                            style={{
                                backgroundColor: COLORS.MEDIUM_GOLD,
                                color: COLORS.YELLOW,
                                padding: '2rem',
                                marginTop: '2rem',
                            }}
                        >
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                {artObject['objectNumber']}
                            </Typography>
                            <Typography variant="h5" color={COLORS.DARK}>
                                {artObject['title']}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {artObject['principalOrFirstMaker']}
                            </Typography>
                            <Typography variant="body2" marginBottom="1rem" color='white'>
                                {artObject['description']}
                            </Typography>
                            <Button
                                target="_blank"
                                size="small"
                                variant="contained"
                                href={`http://www.rijksmuseum.nl/en/collection/${artObject['objectNumber']}`}
                                style={{
                                    backgroundColor: COLORS.DARK
                                }}
                            >
                                Learn More
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
}

Details.displayName = 'Details';
export default Details;
