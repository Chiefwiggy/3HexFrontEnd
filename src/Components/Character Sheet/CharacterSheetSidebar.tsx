import React, {useState} from 'react';
import {Badge, Box, Drawer} from "@mui/material";
import IconButtonWithTooltip from "../Generic/IconButtonWithTooltip";
import {ModeEditOutlined} from "@mui/icons-material";



interface WithCloseSelf {
    closeSelf: (event: React.MouseEvent) => void
    [x: string]: any
}
interface ICharacterSheetSidebarInput {
    title: string,
    icon: React.ElementType,
    panelComponent: React.ComponentType<WithCloseSelf>
    panelProps?: Record<string, any>;
    doShow?: boolean,
    placement?: "left" | "right" | "top" | "bottom",
    tooltipPlacement?: "left" | "right" | "top" | "bottom",
    darkenBackground?: boolean,
    badgeCondition?: boolean,
    [x:string]: any
}

const CharacterSheetSidebar = ({
    title,
    icon,
    panelComponent,
    panelProps = {},
    doShow = true,
    placement = "right",
    tooltipPlacement = "right",
    darkenBackground = true,
    badgeCondition = false,
    ...rest
}: ICharacterSheetSidebarInput) => {

    const IconComponent = icon;
    const PanelComponent = panelComponent

    const [openSidebarPanel, setOpenSidebarPanel] = useState(false);
    const handleOpenSidebarPanel = (open: boolean) => (event: React.MouseEvent) => {
        setOpenSidebarPanel(open);
    }


    return doShow ? (
        <Box>
            <Badge invisible={!badgeCondition} color={"secondary"} variant={"dot"} sx={{
                marginTop: "5px"
            }}>
                <IconButtonWithTooltip title={title} placement={tooltipPlacement} onClick={handleOpenSidebarPanel(true)}>
                    <IconComponent />
                </IconButtonWithTooltip>
            </Badge>

            <Drawer
                anchor={placement}
                open={openSidebarPanel}
                onClose={handleOpenSidebarPanel(false)}
                slotProps={darkenBackground ? {} : {
                    backdrop: {
                        invisible: true
                    }
                }}
            >
                <PanelComponent closeSelf={handleOpenSidebarPanel(false)} {...rest} {...panelProps} />
            </Drawer>
        </Box>
    ) : <></>
}

export default CharacterSheetSidebar