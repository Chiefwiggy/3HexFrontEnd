import React, {useState} from 'react';
import {Box, Drawer} from "@mui/material";
import IconButtonWithTooltip from "../Generic/IconButtonWithTooltip";



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
    darkenBackground?: boolean,
    [x:string]: any
}

const CharacterSheetSidebar = ({
    title,
    icon,
    panelComponent,
    panelProps = {},
    doShow = true,
    placement = "right",
    darkenBackground = true,
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
            <IconButtonWithTooltip title={title} placement={"left"} onClick={handleOpenSidebarPanel(true)}>
                <IconComponent />
            </IconButtonWithTooltip>
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