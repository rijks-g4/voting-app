import React from 'react';
import { useQuery } from 'react-query';
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

function Gallery(): JSX.Element {
    let navigate = useNavigate();
    // Queries
    const { data, isLoading, isError } = useQuery('artObjects', getArtObjects);

    // console.log(data);

    function getArtObjects(): Promise<any> {
        return fetch('https://www.rijksmuseum.nl/api/en/collection?key=9HWI0Lk3&type=painting&imgonly=True&ps=100&p=1')
            .then(res => res.json())
    }

    function openDetailsPage(objectNumber: string): void {
        navigate(`/artObjects/${objectNumber}`);
    }

    return (
        <>
            <p>Gallery:</p>
            {!isLoading && !isError && (
                <ImageList variant="masonry" cols={3} gap={8}>
                    {data['artObjects'].map((artObject: any) => (
                        <ImageListItem key={artObject['objectNumber']}>
                            <img
                                src={`${artObject['webImage']['url']}?w=248&fit=crop&auto=format`}
                                srcSet={`${artObject['webImage']['url']}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={artObject['title']}
                                loading="lazy"
                                onClick={() => openDetailsPage(artObject['objectNumber'])}
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
            )}
        </>
    );
}

Gallery.displayName = 'Gallery';
export default Gallery;