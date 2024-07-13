import React, {useEffect, useState} from 'react';
import {Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import SkillCell from './SkillCell'
import useCharacter from "../../Hooks/useCharacter/useCharacter";

interface ISkillsTableInput {

}

const SkillsTable = ({}: ISkillsTableInput) => {

    const {currentSheet} = useCharacter();

    const [currentPoints, setCurrentPoints] = useState<number>(0);

    useEffect(() => {
        invokeUpdate();
    }, []);

    const invokeUpdate = () => {
        if (currentSheet) {
            setCurrentPoints(currentSheet.getSkillPointsUsed())
        }
    }


    return currentSheet ? (
        <Box>
            <TableContainer component={Paper}>
                <Table size={"small"}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Skill Points</TableCell>
                            <TableCell>{currentSheet.getSkillPointsUsed()} / {currentSheet.getMaxSkillPoints()}</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <SkillCell skillName={"Athletics"} invokeUpdate={invokeUpdate} />
                            <SkillCell skillName={"Survival"} invokeUpdate={invokeUpdate} />
                        </TableRow>
                        <TableRow>
                            <SkillCell skillName={"Handling"}  invokeUpdate={invokeUpdate}/>
                            <SkillCell skillName={"Perception"} invokeUpdate={invokeUpdate} />
                        </TableRow>
                        <TableRow>
                            <SkillCell skillName={"Stealth"} invokeUpdate={invokeUpdate} />
                            <SkillCell skillName={"Streetwise"} invokeUpdate={invokeUpdate} />
                        </TableRow>
                        <TableRow>
                            <SkillCell skillName={"Deduction"}  invokeUpdate={invokeUpdate}/>
                            <SkillCell skillName={"Discovery"} invokeUpdate={invokeUpdate} />
                        </TableRow>
                        <TableRow>
                            <SkillCell skillName={"Identify"}  invokeUpdate={invokeUpdate}/>
                            <SkillCell skillName={"Diplomacy"} invokeUpdate={invokeUpdate} />
                        </TableRow>
                        <TableRow>
                            <SkillCell skillName={"Science"}  invokeUpdate={invokeUpdate}/>
                            <SkillCell skillName={"Hostility"} invokeUpdate={invokeUpdate} />
                        </TableRow>
                        <TableRow>
                            <SkillCell skillName={"Technology"} invokeUpdate={invokeUpdate} />
                            <SkillCell skillName={"Guile"} invokeUpdate={invokeUpdate} />
                        </TableRow>
                        <TableRow>
                            <SkillCell skillName={"Biology"} invokeUpdate={invokeUpdate} />
                            <SkillCell skillName={"Lore"} invokeUpdate={invokeUpdate} />
                        </TableRow>
                        <TableRow>
                            <SkillCell skillName={"Metaphysics"} invokeUpdate={invokeUpdate} />
                            <SkillCell skillName={"Occult"} invokeUpdate={invokeUpdate} />
                        </TableRow>
                        <TableRow>
                            <SkillCell skillName={"Spellcraft"}  invokeUpdate={invokeUpdate}/>
                            <SkillCell skillName={"Society"} invokeUpdate={invokeUpdate} />
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    ) : <></>
}

export default SkillsTable