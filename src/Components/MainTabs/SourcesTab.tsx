import React, {SyntheticEvent, useEffect, useState} from 'react';
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    capitalize,
    Checkbox,
    Chip,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import { ISourceData } from '../../Data/ISourceData';
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import useUser from '../../Hooks/useUser/useUser';
import {CheckBox, CheckBoxOutlineBlank, OpenInNewOutlined} from "@mui/icons-material";
import {IPreparedSource} from "../../Data/ICharacterData";
import SourceByArcanotypeWidget from "../Sources/SourceByArcanotypeWidget";
import {GetArcanotypeColor} from "../../Utils/CardColorUtils";
import {SortSourcesByArcanotype} from "../../Utils/CardSorting";
import {clone} from "../../Utils/ObjectUtils";

interface ISourcesTabInput {

}

const SourcesTab = ({}: ISourcesTabInput) => {

    const {currentSheet} = useCharacter()

    const {userPermissions} = useUser()

    const {SourceData, DowntimeData} = usePreloadedContent();

    const [justUpdated, setJustUpdated] = useState(true);
    const [showStatus, setShowStatus] = useState(false);

    const [characterSources, setCharacterSources] = useState<Array<ISourceData>>([])
    const [characterTemporarySources, setCharacterTemporarySources] = useState<Array<ISourceData>>([]);

    const [overflowSources, setOverflowSources] = useState<Array<ISourceData>>([])
    const [isOverflowCurrent, setIsOverflowCurrent] = useState<boolean>(false)

    const [cancelInnerPing, setCancelInnerPing] = useState<boolean>(false)

    const getOverflowSources = (doCap = false): Array<ISourceData> => {
        if (currentSheet) {
            if (isOverflowCurrent) {
                if (doCap) {
                    return overflowSources.slice(0, currentSheet.getVersatileSourcesCanPrepare())
                }
                return overflowSources
            } else {
                let returnSources: Array<ISourceData> = []
                const sourceList = DowntimeData.GetSourcesPerTypeForPlayer(currentSheet)
                sourceList.map(([sourceType, value]) => {
                    let nsources = characterSources.filter(e => e.sourceArcanotype == sourceType).slice(value)
                    returnSources = [...returnSources, ...nsources]

                })
                setIsOverflowCurrent(true)
                setOverflowSources(returnSources)
                if (doCap) {
                    return returnSources.slice(0, currentSheet?.getVersatileSourcesCanPrepare())
                }
                return returnSources
            }
        }
        return []
    }

    const handleAutocomplete = (event: SyntheticEvent<any>, value: Array<ISourceData>) => {
        setJustUpdated(false);
        setIsOverflowCurrent(false)
        value.forEach(e => {
            if (!e.tempAttunementLevel) {
                e.tempAttunementLevel = 0
            }
        })
        setCharacterSources(value);
    }

    const handleUpdateInner = (source_id: string, newAttunementLevel: number) => {
        const theSource = characterSources.find(e => e._id == source_id)
        if (theSource) {
            theSource.tempAttunementLevel = newAttunementLevel
        }
        setJustUpdated(false)
    }

    const handleTemporaryAutocomplete = (event: SyntheticEvent<any>, value: Array<ISourceData>) => {
        setJustUpdated(false);
        setCharacterTemporarySources(value);
    }

    const saveData = async() => {

        if (currentSheet) {
            const newSources = characterSources.map(cs => {
                return {
                    sourceId: cs._id,
                    attunementLevel: cs.tempAttunementLevel ?? 0
                }
            })
            const tempSources = characterTemporarySources.map(cs => {
                return {
                    sourceId: cs._id,
                    attunementLevel: 0
                }
            })
            await currentSheet.SaveCharacterSources(newSources, tempSources);
            await currentSheet.ManualSetAllCards();
        }

        setJustUpdated(true);
    }

    const cancelSaveData = () => {
        if (currentSheet) {
            const allSourcesWithContext = currentSheet.data.knownSources.map(psd => {
                let newSource = clone(SourceData.GetSourceById(psd.sourceId) ?? {})
                if (newSource) {
                    newSource.tempAttunementLevel = psd.attunementLevel
                }
                return newSource ? newSource : undefined
            }).filter((e): e is ISourceData => e != undefined);
            setCharacterSources(allSourcesWithContext);
            setCancelInnerPing(cancelInnerPing => !cancelInnerPing)
            const allTempSourcesWithContext = currentSheet.data.temporarySources.map(psd => {
                return SourceData.GetSourceById(psd.sourceId);
            }).filter((e): e is ISourceData => e != undefined);
            setCharacterTemporarySources(allTempSourcesWithContext)
        }
        setJustUpdated(true);
    }

    useEffect(() => {
        cancelSaveData()
        setIsOverflowCurrent(false)
    }, [])


    return currentSheet ? (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: "row-reverse",
                }}
            >

                <Button onClick={cancelSaveData} color={"error"} disabled={justUpdated}> Cancel </Button>
                <Button onClick={saveData} color={"success"} disabled={justUpdated}> Save </Button>

                <Alert severity="success" sx={{
                    transition: 'opacity 1s ease-out',
                    opacity: showStatus ? 1 : 0
                }}> Success! </Alert>
            </Box>
                <Box>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "4fr 3fr",
                            gridGap: "20px"
                        }}
                    >
                        <Autocomplete
                            multiple
                            filterSelectedOptions={true}
                            onChange={handleAutocomplete}
                            renderInput={(params) => {
                                return (
                                    <TextField {...params} label={""} placeholder={"Attuned Sources"} />
                                )
                            }}
                            options={SourceData.GetSourceDataForUser(userPermissions, "permanent", [...currentSheet.data.campaignIds, "nature"]).filter(
                                (option) => !characterTemporarySources.some((temp) => temp._id === option._id)
                            ).sort(SortSourcesByArcanotype(DowntimeData.GetSourcesPerTypeForPlayer(currentSheet)))}
                            value={characterSources}
                            getOptionLabel={(option) => option.sourceName}
                            isOptionEqualToValue={(option, value) => option._id == value._id}
                            renderOption={(props: any, option, { selected }) => {
                                    return (
                                        <li {...props} key={option._id}>
                                            <Checkbox
                                                icon={<CheckBoxOutlineBlank fontSize={"small"}/>}
                                                checkedIcon={<CheckBox fontSize={"small"}/>}
                                                style={{marginRight: 8}}
                                                checked={selected}
                                            />
                                            <Typography sx={{
                                                flexGrow: 1
                                            }}>
                                                {option.sourceName}
                                            </Typography>
                                            <Chip label={capitalize(option.sourceArcanotype)} sx={{
                                                backgroundColor: GetArcanotypeColor(option.sourceArcanotype)
                                            }}/>

                                        </li>
                                    );
                            }}
                            renderTags={(tagValue, getTagProps) => {
                                return tagValue.map((option, index) => (
                                    <Chip {...getTagProps({index})} key={option._id} label={option.sourceName}/>
                                ))
                            }}
                        />
                        <Autocomplete
                            multiple
                            filterSelectedOptions={true}
                            onChange={handleTemporaryAutocomplete}
                            renderInput={(params) => {
                                return (
                                    <TextField {...params} label={""} placeholder={"Temporary Sources"}/>
                                )
                            }}
                            options={SourceData.GetSourceDataForUser(userPermissions, "temporary", [...currentSheet.data.campaignIds, "nature"]).filter(
                                (option) => !characterSources.some((perm) => perm._id === option._id)
                            ).sort(SortSourcesByArcanotype(DowntimeData.GetSourcesPerTypeForPlayer(currentSheet)))}
                            value={characterTemporarySources}
                            getOptionLabel={(option) => option.sourceName}
                            isOptionEqualToValue={(option, value) => option._id == value._id}
                            renderOption={(props: any, option, { selected }) => {
                                    return (
                                        <li {...props} key={option._id}>
                                            <Checkbox
                                                icon={<CheckBoxOutlineBlank fontSize={"small"} />}
                                                checkedIcon={<CheckBox fontSize={"small"} />}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            <Typography sx={{
                                                flexGrow: 1
                                            }}>
                                                {option.sourceName}
                                            </Typography>
                                            <Chip label={capitalize(option.sourceArcanotype)} sx={{
                                                backgroundColor: GetArcanotypeColor(option.sourceArcanotype)
                                            }}/>

                                        </li>
                                    );
                                }}
                            renderTags={(tagValue, getTagProps) => {
                                  return tagValue.map((option, index) => (
                                    <Chip {...getTagProps({ index })} key={option._id} label={option.sourceName} />
                                  ))
                                }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: "repeat( auto-fill , max(224px, 18.7vw))",
                            gridGap: "10px",
                            padding: 2
                        }}
                    >
                        <Box key={"temp"}>
                            <SourceByArcanotypeWidget  sourceArcanotype={"temporary"} slots={currentSheet.getTempSourcesCanPrepare()} characterSourcesOfType={characterTemporarySources} />
                        </Box>
                        <Box key={"vers"}>
                            <SourceByArcanotypeWidget  sourceArcanotype={"versatile"} slots={currentSheet.getVersatileSourcesCanPrepare()} characterSourcesOfType={getOverflowSources(true)} />
                        </Box>
                        {
                            DowntimeData.GetSourcesPerTypeForPlayer(currentSheet).sort(([_, valA], [__, valB]) => valB - valA).map(([sourceName, value]) => {
                                return (
                                    <Box key={sourceName} >
                                        <SourceByArcanotypeWidget  sourceArcanotype={sourceName} slots={value} bypassList={getOverflowSources(true).map(e => e._id)} characterSourcesOfType={characterSources.filter(e => e.sourceArcanotype === sourceName)} handleInnerUpdate={handleUpdateInner} isTemporary={false} cancelInnerPing={cancelInnerPing} />
                                    </Box>
                                )
                            })
                        }

                    </Box>
                </Box>
        </Box>
    ) : <></>
}

export default SourcesTab