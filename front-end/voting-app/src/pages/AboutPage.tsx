import React from 'react';
import { Container, Grid, Stack, Box, Divider, Link } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

import { COLORS } from '../constants';
import flow from '../assets/flow-gif.gif';
import nikolay from '../assets/team/nikolay.png';
import rutger from '../assets/team/rutger.png';
import maurice from '../assets/team/maurice.png';
import filipp from '../assets/team/filipp.png';
import matt from '../assets/team/matt.png';
import xiaoqian from '../assets/team/xiaoqian.png';


interface Member {
    imgSrc: string;
    name: string;
    linkedIn?: string;
}

const TEAM_MEMBERS: Member[] = [
    {
        imgSrc: rutger,
        name: "Rutger van Woerkom",
        linkedIn: 'https://www.linkedin.com/in/rutger-van-woerkom-988b30180/',
    },
    {
        imgSrc: nikolay,
        name: "Nikolay Nikolov",
        linkedIn: 'https://www.linkedin.com/in/nikolaygnik/',
    },
    {
        imgSrc: filipp,
        name: "Filipp Peresadilo",
        linkedIn: 'https://www.linkedin.com/in/peresadilo/',
    },
    {
        imgSrc: matt,
        name: "Matt Hudson",
        linkedIn: 'https://www.linkedin.com/in/matt-hudson-06974b200/',
    },
    {
        imgSrc: xiaoqian,
        name: "Xiaoqian Zhou",
        linkedIn: 'https://www.linkedin.com/in/xiaoqian-zhou-6b341b220/',
    },
    {
        imgSrc: maurice,
        name: "Maurice Korf",
        linkedIn: 'https://www.linkedin.com/in/maurice-korf-9943888a/',
    },
]


function AboutPage(): JSX.Element {
    return (
        <Container
            sx={{ paddingLeft: { xs: '0', md: '1rem' }, paddingRight: { xs: '0', md: '1rem' } }}
            maxWidth="xl"
            style={{
                paddingTop: '1rem',
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
                        The Project
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
                        textAlign: "left"
                    }}
                >
                    <p>
                        As part of the {' '}
                        <a
                            href="https://coursecatalogue.uva.nl/xmlpages/page/2021-2022-en/search-course/course/89800"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                color: 'inherit',
                                textDecoration: "none",
                                fontStyle: "italic"
                            }}
                        >
                            Data Systems Master's Project
                        </a> {' '}
                        at the {' '}
                        <span
                            style={{
                                color: COLORS.MEDIUM_GOLD,
                            }}
                        >
                            University of Amsterdam
                        </span>, {' '}
                        our group (Team G4) explores the technological opportunities in the field of Computer Vision with the objective of <span style={{ color: COLORS.MEDIUM_GOLD }}>bringing art to life</span>!
                    </p>

                    <p>
                        More specifically, we focus on Object Localization with the ultimate goal of creating <span style={{ color: COLORS.MEDIUM_GOLD }}>3D representations of 2D art</span>.
                        To create this new way of experiencing art, we decided to to establish a new method of evaluating the performance of segmentation models.
                        Instead of just evaluating models based on metrics, we designed this website to gather public opinion on how well these segmentations models perform on art objects.
                        <span style={{ color: COLORS.MEDIUM_GOLD }}> The aim is to have a better understanding of the human perception and a more practical evaluation in contrast to the usual metrics-based.</span>
                    </p>

                    <p style={{ marginBottom: 0 }}>
                        The graphic below shows the pipeline we envision and where our current research fits in:
                    </p>
                </Box>

                <img src={flow} alt="Our vision for the full pipeline and where are research fits in." width="100%" />

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
                        The Team
                    </span>
                </Box>

                <Grid
                    container
                    spacing={0}
                    rowSpacing={5}
                    style={{
                        marginTop: 0,
                    }}
                >
                    {TEAM_MEMBERS.map((member) =>
                        <Grid
                            item
                            xs={12}
                            md={4}
                            lg={2}
                            key={member.name}
                        >
                            <Box
                                style={{
                                    position: 'relative',
                                    float:'left',
                                    height: "150px",
                                    width: "100%"
                                }}
                            >
                                <Box
                                    style={{
                                        position: "relative",
                                        zIndex: 2,
                                        width: "80%",
                                        margin: "auto",
                                        // marginBottom: "2rem",
                                        marginBottom: '-5px',
                                        height: "100%",
                                        textAlign: "center"
                                    }}
                                >
                                    <img
                                        src={member.imgSrc}
                                        alt={member.name}
                                        height="100%"
                                        // width="100%"
                                        style={{
                                            // border: `2px solid ${COLORS.DARK}`,
                                        }}
                                    />
                                </Box>
                                <Box
                                    style={{
                                        backgroundColor: COLORS.MEDIUM_GOLD,
                                        height: "70%",
                                        width: "100%",
                                        position: "absolute",
                                        bottom: 0,
                                        zIndex: 1,
                                    }}
                                >
                                    &nbsp;
                                </Box>
                            </Box>
                            <Box
                                style={{
                                    backgroundColor: '#F8F8F8',
                                    // backgroundColor: COLORS.LIGHT_GREY,
                                    float: "left",
                                    width: "100%",
                                    paddingTop: '2rem',
                                    paddingBottom: '2rem',
                                    textAlign: 'center',
                                }}
                            >
                                <Box
                                    style={{
                                        fontSize: "1.25rem",
                                        color: COLORS.DARK
                                    }}
                                >
                                    {member.name}
                                </Box>

                                <Divider
                                    style={{
                                        backgroundColor: COLORS.MEDIUM_GOLD,
                                        margin: "auto",
                                        marginTop: "1rem",
                                        marginBottom: "1rem",
                                        width: "100px"
                                    }}
                                />

                                <Box
                                    style={{
                                        minHeight: "50px"
                                    }}
                                >
                                    {member.linkedIn && (
                                        <Box
                                            style={{
                                                margin: 'auto',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                width: "40px",
                                                height: "40px",
                                            }}
                                        >
                                            <Link
                                                href={member.linkedIn}
                                                target="_blank"
                                                style={{
                                                    height: "100%",
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faLinkedinIn}
                                                    style={{
                                                        color: '#1976d2',
                                                        // color: '#0072b1',
                                                        margin: '0 auto',
                                                        display: 'block',
                                                    }}
                                                />
                                            </Link>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Stack>
        </Container>
    );
}

AboutPage.displayName = 'AboutPage';
export default AboutPage;
