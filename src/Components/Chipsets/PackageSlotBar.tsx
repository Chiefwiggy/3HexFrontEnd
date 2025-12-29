import React from 'react';
import {Box, Paper, Typography} from "@mui/material";
import VerticalLinearBar from "../Generic/VerticalLinearBar";

interface IPackageSlotBarInput {
    packageSlotTotal: number,
    packageSlotsUsed: number
}

const PackageSlotBar = ({packageSlotTotal, packageSlotsUsed}: IPackageSlotBarInput) => {
    return (
        <Paper elevation={0}
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography variant="body2" color={"textSecondary"} textAlign={"center"}>PKG Slots</Typography>
            <Box position="relative" width="10px" height="100%" paddingLeft={"8px"}>
                <VerticalLinearBar variant={"determinate"} value={(packageSlotsUsed / packageSlotTotal) * 100} color={packageSlotsUsed > packageSlotTotal ?  "error" : "secondary"} sxProps={{
                    width: "30px"
                }}/>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '30px',
                        height: '100%',
                        display: 'flex', flexDirection: "column",
                        justifyContent: 'space-between',
                        pointerEvents: 'none',
                        paddingLeft: "8px",
                    }}
                >
                    {[...Array(packageSlotTotal+1)].map((_, i) => (
                        <Box
                            key={i}
                            sx={{
                                height: '2px',

                                width: '30px',
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Paper>
    )
}

export default PackageSlotBar