import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { IconButton, ImageList, ImageListItem, ImageListItemBar, Container, Pagination, Grid, Box, CircularProgress } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

const PER_PAGE= 20;

function Gallery(): JSX.Element {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);

    // Queries
    const { data, isLoading } = useQuery('artObjects', getArtObjects);

    function getArtObjects(): Promise<any> {
        return fetch(`${process.env.REACT_APP_BACK_END_URL}/art_objects`)
            .then((res) => res.json());
    }

    function openDetailsPage(objectNumber: string): void {
        navigate(`/artObjects/${objectNumber}`);
    }

    return (
        <Container>
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
                                color="primary"
                                onChange={(event: any, page: number) => setPage(page)}
                                page={page}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <ImageList variant="masonry" cols={3} gap={8}>
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
                                        title={artObject['title']}
                                        subtitle={artObject['principalOrFirstMaker']}
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${artObject['title']}`}
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        }
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
                                color="primary"
                                onChange={(event: any, page: number) => setPage(page)}
                                page={page}
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
