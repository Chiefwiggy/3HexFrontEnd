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
    doShow?: boolean,
    [x:string]: any
}

const CharacterSheetSidebar = ({
    title,
    icon,
    panelComponent,
    doShow = true,
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
                anchor={"right"}
                open={openSidebarPanel}
                onClose={handleOpenSidebarPanel(false)}
            >
                <PanelComponent closeSelf={handleOpenSidebarPanel(false)} {...rest} />
            </Drawer>
        </Box>
    ) : <></>
}

export default CharacterSheetSidebar