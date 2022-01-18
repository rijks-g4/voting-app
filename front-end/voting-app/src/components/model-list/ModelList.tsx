import React, { useState } from 'react';
import { Card, CardHeader, Divider, List, ListItem, ListItemIcon, Checkbox, ListItemText, Button } from '@mui/material';

function intersection(a: any, b: any) {
    return a.filter((value: any) => b.indexOf(value) !== -1);
}

interface ModelListProps {
    models: any[];
    voteModel: (model: string) => void;
}

function ModelList(props: ModelListProps): JSX.Element {
    const [checked, setChecked] = useState<string[]>([]);
    const [votedModel, setVotedModel] = useState<string>('');

    function handleToggle(model: string) {
        const currentIndex = checked.indexOf(model);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(model);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    function handleVote(model: string): void {
        setVotedModel(model);
        props.voteModel(model);
        // alert(`Congrats, you voted for model: ${model}`);
    }

    const numberOfChecked = (items: any[]) => intersection(checked, items).length;

    return (
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                title="Segmentation Models"
                subheader={`${numberOfChecked(props.models)}/${props.models.length} selected`}
            />
            <Divider />
            <List
                sx={{
                    // width: 200,
                    // height: 500,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {props.models.map((model) => {
                    const labelId = `transfer-list-all-item-${model[0]}-label`;

                    return (
                        <ListItem
                            key={model[0]}
                            role="listitem"
                            button
                            secondaryAction={
                                <Button variant={votedModel === model[0] ? "contained" : "outlined"} onClick={() => handleVote(model[0])}>
                                    Vote
                                </Button>
                            }
                            style={{
                                backgroundColor: checked.indexOf(model) !== -1 ? model[1] : 'white',
                                borderColor: (checked.indexOf(model) !== -1) ? 'none' : model[1],
                                borderWidth: '2px',
                                borderStyle: "dashed",
                                marginBottom: "10px",
                                width: "100%"
                            }}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(model) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                    onClick={() => handleToggle(model)}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={model[0]} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );
}

ModelList.displayName = 'ModelList';
export default ModelList;
