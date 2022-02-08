import React, { useState } from 'react';
import { Card, CardHeader, Divider, List, ListItem, ListItemIcon, Checkbox, ListItemText, Button } from '@mui/material';
import { COLORS, COLOR_MAPPING, MODELS_NAME_MAPPING } from '../../constants';

function intersection(a: any, b: any) {
    return a.filter((value: any) => b.indexOf(value) !== -1);
}

interface ModelListProps {
    models: string[];
    voteModel: (model: string) => void;
    setSelectedModels: (models: string[]) => void;
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
        props.setSelectedModels(newChecked);
    };

    function handleVote(model: string): void {
        setVotedModel(model);
        props.voteModel(model);
        // alert(`Congrats, you voted for model: ${model}`);
    }

    const numberOfChecked = (items: any[]) => intersection(checked, items).length;

    return (
        <Card
            style={{
                backgroundColor: 'transparent'
            }}
        >
            <CardHeader
                sx={{ px: 2, py: 1 }}
                title="Which model highlights people most accurately?"
                subheader={
                    <span>
                        1. Click the checkboxes below to show/hide each model (the model will be shown as an overlay on top of the original image).
                        <br />
                        2. Click "Vote" for the model you find best!
                        <br />
                        3. Continue contributing! We will publish the results online!
                        <br />
                        ({numberOfChecked(props.models)}/{props.models.length} selected)
                    </span>
                }
                style={{
                    backgroundColor: COLORS.MEDIUM_GOLD,
                }}
            />
            <Divider style={{ backgroundColor: COLORS.LIGHT_GREY }} />
            <List
                sx={{
                    // width: 200,
                    // height: 500,
                    bgcolor: COLORS.MEDIUM_GOLD,
                    overflow: 'auto',
                    padding: '1rem'
                }}
                dense
                component="div"
                role="list"
            >
                {props.models.map((model_name, index) => {
                    const labelId = `transfer-list-all-item-${model_name}-label`;

                    return (
                        <ListItem
                            key={model_name}
                            role="listitem"
                            // secondaryAction={
                            //     <Button
                            //         variant={votedModel === model_name ? "contained" : "outlined"}
                            //         onClick={() => handleVote(model_name)}
                            //     >
                            //         Vote
                            //     </Button>
                            // }
                            style={{
                                backgroundColor: checked.indexOf(model_name) !== -1 ? `rgba(${COLOR_MAPPING[model_name]})` : COLORS.LIGHT_GREY,
                                // borderColor: (checked.indexOf(model_name) !== -1) ? 'none' : `rgba(${COLOR_MAPPING[model_name]})`,
                                // borderWidth: '2px',
                                // borderStyle: "dashed",
                                marginBottom: props.models.length === index + 1 ? "0" : "10px",
                                width: "100%",
                                borderRadius: "5px",
                            }}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(model_name) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                    onClick={() => handleToggle(model_name)}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={MODELS_NAME_MAPPING[model_name]} />
                            <Button
                                variant={votedModel === model_name ? "contained" : "outlined"}
                                onClick={() => handleVote(model_name)}
                                style={{
                                    color: votedModel === model_name ? COLORS.LIGHT_GREY : COLORS.DARK,
                                    borderColor: COLORS.DARK,
                                    backgroundColor: votedModel === model_name ? COLORS.DARK : 'white',
                                }}
                            >
                                Vote
                            </Button>
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
