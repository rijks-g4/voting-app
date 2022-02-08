import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ImageList, ImageListItem, ImageListItemBar, Container, Pagination, Grid, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../constants';

const PER_PAGE= 20;

function Gallery(): JSX.Element {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);

    const { data, isLoading } = useQuery('artObjects - gallery', getArtObjects);

    function getArtObjects(): Promise<any> {
        return fetch(`${process.env.REACT_APP_BACK_END_URL}/art_objects`)
            .then((res) => res.json());
    }

    function openDetailsPage(objectNumber: string): void {
        navigate(`/artObjects/${objectNumber}`);
    }

    return (
        <Container
            maxWidth="xl"
        >
            {isLoading && (
                <Box
                    display="flex"
                    justifyContent="center"
                >
                    <CircularProgress />
                </Box>
            )}
            {data && (
                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={12} marginTop="2em">
                        <Box
                            display="flex"
                            justifyContent="center"
                        >
                            <Pagination
                                count={Math.ceil(data['art_objects'].length / PER_PAGE)}
                                onChange={(event: any, page: number) => setPage(page)}
                                page={page}
                                style={{
                                    backgroundColor: COLORS.MEDIUM_GOLD,
                                    borderRadius: "5px"
                                }}
                                // color={COLORS.BLACK}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <ImageList variant="masonry" cols={4} gap={8}>
                            {data['art_objects'].slice((page - 1) * PER_PAGE, page * PER_PAGE).map((artObject: any) => (
                                <ImageListItem key={artObject['objectNumber']}>
                                    <img
                                        src={`${artObject['webImage']['url']}?w=248&fit=crop&auto=format`}
                                        srcSet={`${artObject['webImage']['url']}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={artObject['title']}
                                        loading="lazy"
                                        onClick={() => openDetailsPage(artObject['objectNumber'])}
                                        style={{
                                            cursor: "pointer"
                                        }}
                                    />
                                    <ImageListItemBar
                                        sx={{ display: { xs: 'none', md: 'flex' } }}
                                        title={artObject['title']}
                                        subtitle={artObject['principalOrFirstMaker']}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            display="flex"
                            justifyContent="center"
                        >
                            <Pagination
                                count={Math.ceil(data['art_objects'].length / PER_PAGE)}
                                onChange={(event: any, page: number) => setPage(page)}
                                page={page}
                                style={{
                                    backgroundColor: COLORS.MEDIUM_GOLD,
                                    borderRadius: "5px"
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
}

Gallery.displayName = 'Gallery';
export default Gallery;
