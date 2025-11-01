import React, {SyntheticEvent, useEffect, useState} from 'react';
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    capitalize,
    Checkbox,
    Chip, LinearProgress,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import {clone} from "../../Utils/ObjectUtils";
import {ISourceData} from "../../Data/ISourceData";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {IDatachipData, IPackageData} from "../../Data/ChipsetData";
import {CheckBox, CheckBoxOutlineBlank} from "@mui/icons-material";
import {GetArcanotypeColor} from "../../Utils/CardColorUtils";
import useUser from "../../Hooks/useUser/useUser";
import DatachipInfo from "../Chipsets/DatachipInfo";
import PackageWidget from "../Chipsets/PackageWidget";
import VerticalLinearBar from "../Generic/VerticalLinearBar";
import MemorySlotBar from "../Chipsets/MemorySlotBar";

interface IFunctionsTabInput {

}

const ChipsetTab = ({}: IFunctionsTabInput) => {

    const {currentSheet} = useCharacter();

    const {userPermissions} = useUser();

    const {DatachipData, PackageData} = usePreloadedContent();

    const saveData = async() => {
        if (currentSheet) {
            setJustUpdated(true);
            const newDatachips = characterDatachips.map(datachip => {
                return datachip._id;
            })
            const newPackages = characterPackages.map(pkg => {
                return pkg._id;
            })
            await currentSheet.SaveCharacterChipset(newDatachips, newPackages);
            await currentSheet.ManualSetAllCards();

        }
    }

    const cancelSaveData = () => {
        if (currentSheet && PackageData && DatachipData) {
            setJustUpdated(true);
            setCharacterDatachips(DatachipData.GetDatachipsFromIdList(currentSheet.data.knownDatachips))
            setCharacterPackages(PackageData.GetPackagesFromIdList(currentSheet.data.knownPackages));

        }
    }

    useEffect(() => {
        cancelSaveData();
    }, [])

    const [justUpdated, setJustUpdated] = useState(true);
    const [showStatus, setShowStatus] = useState(false);

    const [characterDatachips, setCharacterDatachips] = useState<Array<IDatachipData>>([]);
    const [characterPackages, setCharacterPackages] = useState<Array<IPackageData>>([]);

    const handleAutocompleteDatachip = (event: SyntheticEvent, value: Array<IDatachipData>) => {
        setJustUpdated(false);
        setCharacterDatachips(value);
    }

    const handleAutocompletePackages = (event: SyntheticEvent, value: Array<IPackageData>) => {
        setJustUpdated(false);
        setCharacterPackages(value);
    }

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
                        gridTemplateColumns: "3fr 4fr",
                        gridGap: "20px"
                    }}
                >
                    <Autocomplete
                        multiple
                        filterSelectedOptions={true}
                        onChange={handleAutocompleteDatachip}
                        renderInput={(params) => {
                            return (
                                <TextField {...params} label={""} placeholder={"Datachips"} />
                            )
                        }}
                        options={DatachipData.GetDatachipDataForUser(userPermissions)}
                        value={characterDatachips}
                        getOptionLabel={(option) => option.datachipName}
                        isOptionEqualToValue={(option, value) => option._id == value._id}
                        renderOption={(props: any, option, {selected}) => {
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
                                        {option.datachipName}
                                    </Typography>
                                </li>
                            );
                        }}
                        renderTags={(tagValue, getTagProps) => {
                            return tagValue.map((option, index) => (
                                <Chip {...getTagProps({index})} key={option._id} label={option.datachipName}/>
                            ))
                        }}
                    />
                    <Autocomplete
                        multiple
                        filterSelectedOptions={true}
                        onChange={handleAutocompletePackages}
                        renderInput={(params) => {
                            return (
                                <TextField {...params} label={""} placeholder={"Packages"} />
                            )
                        }}
                        options={PackageData.GetPackageDataForUser(userPermissions)}
                        value={characterPackages}
                        getOptionLabel={(option) => option.packageName}
                        isOptionEqualToValue={(option, value) => option._id == value._id}
                        renderOption={(props: any, option, {selected}) => {
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
                                        {option.packageName}
                                    </Typography>
                                </li>
                            );
                        }}
                        renderTags={(tagValue, getTagProps) => {
                            return tagValue.map((option, index) => (
                                <Chip {...getTagProps({index})} key={option._id} label={option.packageName}/>
                            ))
                        }}
                    />

                </Box>
                <Box
                    sx={{
                        marginTop: "12px",
                        display: "grid",
                        gridTemplateColumns: "10fr 1fr 14fr",
                        gridGap: "20px"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        {
                            characterDatachips.map((option, index) => {
                                return (
                                    <DatachipInfo datachip={option} index={index} key={index} />
                                )
                            })
                        }
                    </Box>
                    <MemorySlotBar memorySlotTotal={currentSheet.getMemorySlots()} memorySlotsUsed={characterPackages.reduce((pv, cv) => {
                        return pv + cv.memorySlots
                    }, 0)}/>
                    <Box>
                        {
                            characterPackages.map((option, index) => {
                                return (
                                    <PackageWidget packageData={option} key={index} />
                                )
                            })
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    ) : <></>
}

export default ChipsetTab