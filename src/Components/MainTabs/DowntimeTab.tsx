import React, {HTMLInputAutoCompleteAttribute, SyntheticEvent, useEffect, useState} from 'react';
import {
    Autocomplete, Badge,
    Box,
    Button,
    Checkbox, Chip,
    MenuItem,
    Paper,
    Select,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {IDowntimeActivity, IDowntimeFullScaledData} from "../../Data/IDowntime";
import DowntimeCard from "../Downtime/DowntimeCard";
import SimpleClosableDialog from "../Generic/SimpleClosableDialog";
import {CheckBox, CheckBoxOutlineBlank} from "@mui/icons-material";
import useAPI from "../../Hooks/useAPI/useAPI";
import DowntimeRankCard from "../Downtime/DowntimeRankCard";

interface IDowntimeTabInput {

}

const DowntimeTab = ({}: IDowntimeTabInput) => {

    const {currentSheet, charPing} = useCharacter()
    const {DowntimeData} = usePreloadedContent()
    const {CharacterAPI} = useAPI();

    const [downtimeData, setDowntimeData] = useState<Array<IDowntimeFullScaledData>>([]);

    const [allDowntimeData, setAllDowntimeData] = useState<Array<IDowntimeActivity>>([]);



    const [addDialogOpen, setAddDialogOpen] = useState(false);

    const [rankDialogOpen, setRankDialogOpen] = useState(false);

    const [currentAutocompleteValues, setCurrentAutocompleteValues] = useState<Array<IDowntimeActivity>>([]);

    const [currentRankTotal, setCurrentRankTotal] = useState(currentSheet?.getCurrentDowntimeRanks() ?? 0)

    const handleDialog = (open: boolean) => () => {
        setAddDialogOpen(open);
    }

    const handleRankDialog = (open: boolean) => () => {
        setRankDialogOpen(open);
    }



    const getRankTotal = (startBias = 0) => {
        return downtimeData.reduce((pv, cv) => {
            return pv + cv.proficiency;
        }, startBias)
    }

    const handleAutocomplete = (event: SyntheticEvent<any>, value: Array<IDowntimeActivity>) => {
        setCurrentAutocompleteValues(value)
    }

    const sendDowntimeRank = (delta: number, key: string) => {
        setCurrentRankTotal(getRankTotal(delta))

        setDowntimeData(data => {
            const index = data.findIndex(e => e.activityId === key)
            const ndata = JSON.parse(JSON.stringify(data));
            if (ndata[index]) {
                ndata[index].proficiency = (ndata[index].proficiency + delta ?? 0)
            }
            console.log(delta, key, index, ndata);
            return ndata;
        })

    }

    const handleSubmission = async() => {

        if (currentSheet) {
            const newData = currentAutocompleteValues.map(cav => {
                const dt =  downtimeData.find(e => e._id == cav._id)
                console.log(dt);
                if (dt) {
                    return {
                        activityId: cav.activityId,
                        currentProgress: dt.currentProgress,
                        proficiency: dt.proficiency,
                    }
                } else {
                    return {
                        activityId: cav.activityId,
                        currentProgress: 0,
                        proficiency: 0,
                    }
                }
            })

            currentSheet.setDowntimeData(newData)
            await CharacterAPI.SetDowntimeActivities(currentSheet.data._id, newData);
            handleDialog(false)();
        }


    }

    const handleSubmitRankUp = async() => {

        if (currentSheet) {
            currentSheet.setDowntimeData(downtimeData);
            await CharacterAPI.SetDowntimeActivities(currentSheet.data._id, downtimeData);
            setRankDialogOpen(false);
        }

    }


    useEffect(() => {
        if (currentSheet) {
            const dtd = DowntimeData.GetDowntimeDataForPlayer(currentSheet)
            const adtd = DowntimeData.GetDowntimeData();
            setDowntimeData(dtd)
            setAllDowntimeData(adtd);
            const id_list = dtd.map(e => e._id);
            const final_list = adtd.filter(e => id_list.includes(e._id));
            setCurrentAutocompleteValues(final_list);
            setCurrentRankTotal(currentSheet.getCurrentDowntimeRanks())
        }
    }, [currentSheet, charPing, addDialogOpen, rankDialogOpen]);

    return currentSheet ? (
        <Box>
            <Paper elevation={0}
                sx={{
                    marginBottom: "12px",
                    padding: "6px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Button onClick={handleDialog(true)}>Add Activities</Button>
                <Button onClick={handleRankDialog(true)}>

                    <Badge invisible={currentRankTotal == currentSheet.getDowntimeRanks()} color={"secondary"} variant={"dot"} sx={{
                        paddingRight: "5px"
                    }}>
                        <Typography variant={"body2"}>Rank Up</Typography>
                    </Badge>
                </Button>
            </Paper>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: "repeat( auto-fill , max(264px, 16vw))",
                    gridGap: "10px"
                }}
            >
                {
                    downtimeData.map(e => {
                        return (
                            <DowntimeCard downtimeData={e} key={e._id} />
                        )
                    })
                }
            </Box>
            <SimpleClosableDialog
                fullWidth={true}
                title={"Edit Activities"}
                buttons={
                    [
                        {
                            label: "Cancel",
                            variant: "contained",
                            color: "error",
                            action: handleDialog(false),
                        },
                        {
                            label: "Save",
                            variant: "contained",
                            action: handleSubmission
                        }
                    ]
                }
                isOpen={addDialogOpen}
                setIsOpen={setAddDialogOpen}
                content={
                    <Box>
                        <Autocomplete
                            multiple
                            filterSelectedOptions={true}
                            onChange={handleAutocomplete}
                            renderInput={(params) => {
                                return (
                                    <TextField {...params} label={""} placeholder={"Downtime Activities"}/>
                                )
                            }}
                            options={allDowntimeData}
                            getOptionLabel={(option) => option.activityName}
                            value={currentAutocompleteValues}
                            renderOption={(props: any, option, { selected }) => {
                                return (
                                    <li {...props} key={option._id}>
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlank fontSize={"small"} />}
                                            checkedIcon={<CheckBox fontSize={"small"} />}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.activityName}
                                    </li>
                                );
                            }}
                            renderTags={(tagValue, getTagProps) => {
                              return tagValue.map((option, index) => (
                                <Chip {...getTagProps({ index })} key={option._id} label={option.activityName} />
                              ))
                            }}
                        />
                    </Box>
                }
            />
            <SimpleClosableDialog
                fullWidth
                title={"Rank Up Activities"}
                buttons={
                    [
                        {
                            label: "Cancel",
                            variant: "contained",
                            color: "error",
                            action: handleRankDialog(false),
                        },
                        {
                            label: "Save",
                            variant: "contained",
                            action: handleSubmitRankUp
                        }
                    ]
                }
                isOpen={rankDialogOpen}
                setIsOpen={setRankDialogOpen}
                content={
                    <Box>
                        <Typography>Downtime Training: {currentRankTotal} / {currentSheet.getDowntimeRanks()}</Typography>
                        <br />
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr",
                                gap: "10px"
                            }}
                        >
                            {
                                downtimeData.map(dd => {
                                    return (
                                        <DowntimeRankCard key={dd._id} downtimeDatum={dd} sendBack={sendDowntimeRank} total={currentRankTotal}/>
                                    )
                                })
                            }
                        </Box>

                    </Box>
                }
            />
        </Box>
    ) : <></>
}

export default DowntimeTab