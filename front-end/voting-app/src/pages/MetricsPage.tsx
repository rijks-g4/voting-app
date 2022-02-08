import React from 'react';
import { Container, Grid, Stack, Box, Divider } from '@mui/material';

import MetricsCard, { MetricsCardProps } from '../components/MetricsCard';
import modelsDice from '../assets/stats/models_dice.png';
import modelsIou from '../assets/stats/models_iou.png';
import modelsPa from '../assets/stats/models_pa.png';
import ensembleDice from '../assets/stats/ensemble_dice.png';
import ensembleIou from '../assets/stats/ensemble_iou.png';
import ensemblePa from '../assets/stats/ensemble_pa.png';
import { COLORS } from '../constants';


function MetricsPage(): JSX.Element {
    const modelMetrics: MetricsCardProps[] = [
        {
            src: modelsDice,
            imgHeight: '500',
            description: 'Dice Coefficient',
        },
        {
            src: modelsIou,
            imgHeight: '500',
            description: 'Intersection Over Union',
        },
        {
            src: modelsPa,
            imgHeight: '500',
            description: 'Pixel Accuracy',
        }
    ];

    const ensembleMetrics: MetricsCardProps[] = [
        {
            src: ensembleDice,
            imgHeight: '500',
            description: 'Dice Coefficient',
        },
        {
            src: ensembleIou,
            imgHeight: '500',
            description: 'Intersection Over Union',
        },
        {
            src: ensemblePa,
            imgHeight: '500',
            description: 'Pixel Accuracy',
        }
    ]; 

    return (
        <Container
            maxWidth="xl"
            style={{
                paddingTop: "1rem",
            }}
        >
            <Stack spacing={2}>
                <Box
                    width="100%"
                    style={{
                        textAlign: "center",
                    }}
                >
                    <span
                        style={{
                            fontSize: "2em",
                            color: COLORS.MEDIUM_GOLD,
                            borderBottom: `2px solid ${COLORS.MEDIUM_GOLD}`
                        }}
                    >
                        Model Metrics
                    </span>
                </Box>

                <Box
                    width="100%"
                    style={{
                        fontSize: "1.2em",
                        color: COLORS.LIGHT_GREY,
                        fontFamily: "Ariel",
                        width: "70%",
                        margin: "auto",
                        textAlign: "left",
                        marginTop: "1rem"
                    }}
                >
                    These metrics were calculated based on a subset of art objects for which we drew manual masks.
                </Box>

                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    style={{
                        marginTop: "2rem"
                    }}
                >
                    {modelMetrics.map((stat) => 
                        <Grid item key={stat.description}>
                            <MetricsCard
                                {...stat}
                            />
                        </Grid>
                    )}
                </Grid>

                <Divider
                    style={{
                        backgroundColor: COLORS.LIGHT_GREY,
                        marginTop: "3rem",
                        marginBottom: "1rem",
                    }}
                />

                <Box
                    width="100%"
                    style={{
                        textAlign: "center",
                    }}
                >
                    <span
                        style={{
                            fontSize: "2em",
                            color: COLORS.MEDIUM_GOLD,
                            borderBottom: `2px solid ${COLORS.MEDIUM_GOLD}`
                        }}
                    >
                        Ensemble Metrics
                    </span>
                </Box>

                <Box
                    style={{
                        fontSize: "1.2em",
                        color: COLORS.LIGHT_GREY,
                        fontFamily: "Ariel",
                        width: "70%",
                        margin: "auto",
                        textAlign: "left",
                        marginTop: "1rem"
                    }}
                >
                    These metrics were calculated based on a subset of art objects for which we drew manual masks. The ensemble was done by simple voting and the different ensembles below use different minimum vote for a pixel to be selected in the resulting mask.
                </Box>

                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                >
                    {ensembleMetrics.map((stat) => 
                        <Grid item key={stat.description}>
                            <MetricsCard
                                {...stat}
                            />
                        </Grid>
                    )}
                </Grid>
            </Stack>
        </Container>
    );
}

MetricsPage.displayName = 'MetricsPage';
export default MetricsPage;
