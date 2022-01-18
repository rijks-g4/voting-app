import React, { useState } from 'react';
import { Card, CardHeader, Divider, List, ListItem, ListItemIcon, Checkbox, ListItemText, Button } from '@mui/material';

function intersection(a: any, b: any) {
    return a.filter((value: any) => b.indexOf(value) !== -1);
}

interface ModelListProps {
    models: string[];
    voteModel: (model: string) => void;
    setSelectedModels: (models: string[]) => void;
}

const COLOR_MAPPING: any = {
    "SegFormer": [244, 96, 54, 0.5],
    "model": [91, 133, 170, 0.5],
    "Purple Navy": [65, 71, 112, 0.5],
    "Russian Violet": [55, 34, 72, 0.5],
    "Xiketic": [23, 17, 35, 0.5],
    "Misty Rose": [244, 219, 216, 0.5],
    "Dark Pastel Green": [76, 185, 68, 0.5],
    "Baby Powder": [253, 255, 252, 0.5],
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
                {props.models.map((model_name) => {
                    const labelId = `transfer-list-all-item-${model_name}-label`;

                    return (
                        <ListItem
                            key={model_name}
                            role="listitem"
                            secondaryAction={
                                <Button
                                    variant={votedModel === model_name ? "contained" : "outlined"}
                                    onClick={() => handleVote(model_name)}
                                >
                                    Vote
                                </Button>
                            }
                            style={{
                                backgroundColor: checked.indexOf(model_name) !== -1 ? `rgba(${COLOR_MAPPING[model_name]})` : 'white',
                                borderColor: (checked.indexOf(model_name) !== -1) ? 'none' : `rgba(${COLOR_MAPPING[model_name]})`,
                                borderWidth: '2px',
                                borderStyle: "dashed",
                                marginBottom: "10px",
                                width: "100%"
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
                            <ListItemText id={labelId} primary={model_name} />
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
