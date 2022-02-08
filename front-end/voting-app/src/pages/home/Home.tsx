import React from 'react';
import { Box, Grid } from '@mui/material';
import image from '../../assets/home-background.jpeg';
import { COLORS } from '../../constants';


function Home(): JSX.Element {
    return (
        <Box
            style={{
                width: "100%",
                height: "100vh",
                // height: '110vh',
                backgroundImage: `url(${image})`,
                backgroundRepeat: 'no-repeat, repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                // marginTop: '-7rem',
                marginTop: '-5.7rem',
                // marginBottom: '-3rem',
            }}
        >
            <Box style={{
                height: "100%",
            }}>
                <Grid
                    container
                    spacing={2}
                    direction="row-reverse"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    style={{
                        height: '100%',
                        backgroundImage: `linear-gradient(112deg, rgb(0 0 0 / 77%), rgba(255, 255, 255, 0))`,
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        md={7}
                    >
                        <Box
                            style={{
                                // marginLeft: '15rem',
                                marginLeft: '20%',
                            }}
                        >
                            <Box
                                style={{
                                    color: COLORS.YELLOW,
                                    fontSize: '2.25em',
                                    fontFamily: 'Abril Fatface',
                                }}
                            >
                                A night at the museum
                            </Box>
                            <Box
                                style={{
                                    color: 'white',
                                    fontSize: '1.25em',
                                    fontFamily: 'Abril Fatface',
                                }}
                            >
                                Bringing classical art to life through object segmentation
                            </Box>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={7}
                    >
                        <Box
                            style={{
                                // marginLeft: '15rem',
                                marginLeft: '20%',
                            }}
                        >
                            <Box
                                style={{
                                    color: 'white',
                                    fontSize: '1.25em',
                                    paddingBottom: '2rem',
                                }}
                            >
                                University of Amsterdam
                                <br />
                                Data Systems Project
                                <br />
                                Team G4
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

Home.displayName = 'Home';
export default Home;
