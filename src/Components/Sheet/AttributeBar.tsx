import React, {useEffect, useState} from 'react'
import {
    Box,
    Button,
    CircularProgress,
    CircularProgressPropsColorOverrides, Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton,
    LinearProgress, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Typography
} from "@mui/material";
import {IAttributeBar} from "../../Data/ICharacterData";
import {StatChain} from "../../Utils/GetFinalSpellData";
import {
    AddCircleOutlined,
    BloodtypeOutlined,
    HealingOutlined,
    PersonRemoveOutlined,
    RemoveCircleOutlined
} from "@mui/icons-material";
import ChangeBarDataDialog from "./ChangeBarDataDialog";
import useEventHistory from "../../Hooks/useEventHistory/useEventHistory";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {AttributeBarType, DamageType} from "../../Data/CharacterSheet";


export type BarDialogActionTypes = "heal" | "damage" | "recover" | "use" | null;
export type AttributeActionTypes = BarDialogActionTypes | "raw" | "physical" | "magical" | "cancel";

interface IAttributeBarInput {
    barName: string,
    barColor: AttributeBarType | any,
    healFunction: (barColor: AttributeBarType, value: number) => void,
    damageFunction: (barColor: AttributeBarType, type: DamageType, value: number) => void,
    takeFunction: (barColor: AttributeBarType, value: number) => void,
    currentAttr: number,
    currentMaxAttr: number,
    progress: number,
    isSmall?: boolean
}

interface IBarDropdownOptions {
    damage: boolean,
    use: boolean,
    heal: boolean,
    recover: boolean
}

const AttributeBar = ({
      barName,
      barColor,
      healFunction,
      damageFunction,
      takeFunction,
      currentMaxAttr,
      currentAttr,
      progress,
      isSmall=false
}: IAttributeBarInput) => {



    const [isEditMenuOpen, setEditMenuOpen] = useState(false);

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const [dropdownAnchor, setAnchorDropdown] = useState<null | HTMLElement>(null);

    const [dropdownOptions, setDropdownOptions] = useState<IBarDropdownOptions>({
        damage: true,
        use: true,
        heal: true,
        recover: true
    })

    const [actionType, setActionType] = useState<BarDialogActionTypes>(null)

    useEffect(() => {
        switch (barName) {
            case "Health":
            case "Stamina":
                setDropdownOptions({
                    damage: true,
                    use: true,
                    heal: true,
                    recover: false
                })
                break;
            case "Tether":
                setDropdownOptions({
                    damage: false,
                    use: true,
                    heal: false,
                    recover: true
                })
                break;
        }
    }, [barName]);

    const handleDropdownOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorDropdown(event.currentTarget);
        setDropdownOpen(true);
    }

    const handleDropdownClose = () => {
        setDropdownOpen(false);
    }
    const handleEditOpen = (actionType: BarDialogActionTypes) => () => {
        setDropdownOpen(false);
        setActionType(actionType);
        setEditMenuOpen(true);
    }

    const {LogEvent} = useEventHistory();
    // const {currentSheet, healthPing, statPing} = useCharacter();

    const handleEditClose = (value: number, type: AttributeActionTypes) => () => {
        setEditMenuOpen(false);
        switch (type) {
            case "heal":
                LogEvent(`Healed for ${value} ${barName} `)
                healFunction(barColor, value);
                break;
            case "recover":
                LogEvent(`Recovered ${value} ${barName}`)
                healFunction(barColor, value);
                break;
            case "use":
                LogEvent(`Used ${value} ${barName}`)
                takeFunction(barColor, value);
                break;
            case "raw":
            case "magical":
            case "physical":
                LogEvent(`Character took ${value} ${barName} damage (${type}).`)
                damageFunction(barColor, type, value);
                break;
        }
    }




    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center",
                padding: '12px'
            }}
        >
            <Box>
                <Box
                    sx={{
                        position: 'relative',
                        display: 'inline-flex'
                    }}
                >

                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CircularProgress
                            value={100}
                            variant="determinate"
                            size={isSmall ? 50 : 80}
                            thickness={isSmall ? 5 : 6}
                            color={barColor}
                            sx={{
                                opacity: 0.25
                            }}
                        />
                    </Box>
                    <CircularProgress
                        value={progress}
                        variant="determinate"
                        size={isSmall ? 50 : 80}
                        thickness={isSmall ? 5 : 6}
                        color={barColor}
                    />
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box>
                            <IconButton
                                color={barColor}
                                onClick={handleDropdownOpen}
                                size={isSmall ? "small" : "medium"}
                            >
                                <BloodtypeOutlined sx={{fontSize: isSmall ? "18px" : "30px"}}/>
                            </IconButton>
                            <Menu
                                open={isDropdownOpen}
                                onClose={handleDropdownClose}
                                anchorEl={dropdownAnchor}
                            >
                                <Paper
                                    sx={{width: 240, maxWith: '100%'}}
                                >
                                    {
                                        dropdownOptions.damage ?
                                            <MenuItem
                                                onClick={handleEditOpen("damage")}
                                            >
                                                <ListItemIcon>
                                                    <PersonRemoveOutlined/>
                                                </ListItemIcon>
                                                <ListItemText>Damage</ListItemText>
                                                <Typography variant="body2" color="text.secondary">
                                                    ⌘D
                                                </Typography>
                                            </MenuItem>
                                            : <></>
                                    }
                                    {
                                        dropdownOptions.use ?
                                            <MenuItem
                                                onClick={handleEditOpen("use")}
                                            >
                                                <ListItemIcon>
                                                    <RemoveCircleOutlined/>
                                                </ListItemIcon>
                                                <ListItemText>Use</ListItemText>
                                                <Typography variant="body2" color="text.secondary">
                                                    ⌘E
                                                </Typography>
                                            </MenuItem>
                                            : <></>
                                    }
                                    {
                                        dropdownOptions.heal ?
                                            <MenuItem
                                                onClick={handleEditOpen("heal")}
                                            >
                                                <ListItemIcon>
                                                    <HealingOutlined/>
                                                </ListItemIcon>
                                                <ListItemText>Heal</ListItemText>
                                                <Typography variant="body2" color="text.secondary">
                                                    ⌘R
                                                </Typography>
                                            </MenuItem>
                                            : <></>
                                    }
                                    {
                                        dropdownOptions.recover ?
                                            <MenuItem
                                                onClick={handleEditOpen("recover")}
                                            >
                                                <ListItemIcon>
                                                    <AddCircleOutlined/>
                                                </ListItemIcon>
                                                <ListItemText>Recover</ListItemText>
                                                <Typography variant="body2" color="text.secondary">
                                                    ⌘R
                                                </Typography>
                                            </MenuItem>
                                            : <></>
                                    }
                                </Paper>
                            </Menu>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "column"
                }}
            >
                <Typography variant={isSmall ? "body1" : "h6"} component="div">{barName}</Typography>

                <Typography>{currentAttr} / {currentMaxAttr} </Typography>
            </Box>

            <ChangeBarDataDialog
                handleClose={handleEditClose}
                isOpen={isEditMenuOpen}
                barName={barName}
                actionType={actionType}
            />

        </Box>
    )
}

export default AttributeBar