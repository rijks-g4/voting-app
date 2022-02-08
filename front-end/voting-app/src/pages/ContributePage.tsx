import React, { useState } from 'react';
import { Alert, Container, Snackbar } from '@mui/material';
import { useQuery } from 'react-query';

import Details from './details/Details';


function ContributePage(): JSX.Element {
    const [index, setIndex] = useState<number>(0);
    const [isChanging, setIsChanging] = useState<boolean>(false);
    const { data } = useQuery('artObjects - contribute', getArtObjects);

    function shuffleArray(array: Array<any>) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function getArtObjects(): Promise<any> {
        return fetch(`${process.env.REACT_APP_BACK_END_URL}/art_objects`)
            .then(async (res) => {
                const jsonRes: any = await res.json();
                const result = shuffleArray(jsonRes['art_objects'] as Array<any>);
                return result;
            });
    }

    return (
        <Container
            sx={{ paddingLeft: { xs: '0', md: '1rem' }, paddingRight: { xs: '0', md: '1rem' } }}
            maxWidth="xl"
            style={{
                paddingTop: "1rem",
            }}
        >
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
                open={isChanging}
                autoHideDuration={3000}
                onClose={() => setIsChanging(false)}
            >
                <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
                    Voted succesfully, loading the next image...
                </Alert>
            </Snackbar>
            {data && (
                <Details
                    objectNumber={data[index]["objectNumber"]}
                    voteCallback={() => {
                        setIsChanging(true);
                        setIndex((currentIndex) => currentIndex + 1);
                    }}
                />
            )}
        </Container>
    );
}

ContributePage.displayName = 'ContributePage';
export default ContributePage;
