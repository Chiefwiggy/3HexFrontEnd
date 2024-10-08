import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    capitalize, CircularProgress, Divider,
    FormControl,
    InputLabel, LinearProgress,
    MenuItem, Paper,
    Select,
    SelectChangeEvent,
    TextField, Typography
} from "@mui/material";
import StatView from "../../../Views/StatView";
import StatBox from "../../StatBox/StatBox";
import {IModifiable} from "../../../Data/GenericData";
import * as Yup from 'yup';
import {useFormik} from "formik";
import FormikTextField from "../../FormikHelpers/FormikTextField";
import FormikNumericField from "../../FormikHelpers/FormikNumericField";
import FormikSelect from "../../FormikHelpers/FormikSelect";
import usePreloadedContent from "../../../Hooks/usePreloadedContent/usePreloadedContent";
import VerticalLinearBar from "../../Generic/VerticalLinearBar";
import PoleProgress from './PoleProgress';


interface ICreateMinionTemplateInput {

}

const CreateMinionTemplate = ({}: ICreateMinionTemplateInput) => {

    const {ArmorData, WeaponData} = usePreloadedContent();

    const [currentXP, setCurrentXP] = useState(0);



    const validationSchema = Yup.object({
        minionTemplateName: Yup.string().required("Required"),
        minionRole: Yup.string().required("Please pick a role"),
        minionBaseStats: Yup.object().shape({
            might: Yup.number().min(0, 'Might must be between 0 and 75').max(75, 'Might must be between 0 and 75').required('Might is required'),
            agility: Yup.number().min(0, 'Agility must be between 0 and 75').max(75, 'Agility must be between 0 and 75').required('Agility is required'),
            skill: Yup.number().min(0, 'Skill must be between 0 and 75').max(75, 'Skill must be between 0 and 75').required('Skill is required'),
            awareness: Yup.number().min(0, 'Awareness must be between 0 and 75').max(75, 'Awareness must be between 0 and 75').required('Awareness is required'),
            vitality: Yup.number().min(0, 'Vitality must be between 0 and 75').max(75, 'Vitality must be between 0 and 75').required('Vitality is required'),
            knowledge: Yup.number().min(0, 'Knowledge must be between 0 and 75').max(75, 'Knowledge must be between 0 and 75').required('Knowledge is required'),
            mind: Yup.number().min(0, 'Mind must be between 0 and 75').max(75, 'Mind must be between 0 and 75').required('Mind is required'),
            presence: Yup.number().min(0, 'Presence must be between 0 and 75').max(75, 'Presence must be between 0 and 75').required('Presence is required'),
            command: Yup.number().min(0, 'Command must be between 0 and 75').max(75, 'Command must be between 0 and 75').required('Command is required'),
            endurance: Yup.number().min(0, 'Endurance must be between 0 and 75').max(75, 'Endurance must be between 0 and 75').required('Endurance is required'),
        }),
    });

    const formik = useFormik({
        initialValues: {
            minionTemplateName: "Ardwolff",
            minionRole: "brute",
            minionBaseStats: {
                might: 8,
                agility: 5,
                skill: 3,
                awareness: 7,
                vitality: 7,
                knowledge: 1,
                mind: 1,
                presence: 3,
                command: 5,
                endurance: 6
            },
            baseMovement: {
                stepSpeedBonus: 4,
                dashSpeedBonus: 1,
                canClimb: false,
                canFly: false,
                canSwim: false
            },
            currentSpell: null,
            currentWeaponId: "",
            currentWeaponEnchantment: 0,
            currentArmorId: "",
            currentArmorEnchantment: 0,
            baseBonuses: {}
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        }


    })

    useEffect(() => {
        const xpFromStats = Object.values(formik.values.minionBaseStats).reduce((pv, cv) => {
            return pv + cv;
        }, 0)
        const level = Math.max(0,xpFromStats - 35);
        const maxStat = Object.values(formik.values.minionBaseStats).reduce((pv, cv) => {
            if (cv > pv) return cv;
            return pv;
        }, 0)
        // console.log("LEVEL", level)
        // console.log("MAX", maxStat);
        const maxStatLevel = (maxStat - 10)*5;
        // console.log("BARRIER LEVEL", maxStatLevel);

        const minionActualLevel = Math.max(maxStatLevel, level);
        console.log( "MINION LEVEL", minionActualLevel);

        const x1 = minionActualLevel + 10;
        const roughPlayerLevel = x1 * 1.25;
        console.log(roughPlayerLevel);

        const playerMaxAUT = 10 + roughPlayerLevel / 5

        console.log("RPAUT:", playerMaxAUT);

        setCurrentXP(playerMaxAUT*50);

    }, [formik.values]);

    return (
        <Box>
            <br/>
            <form onSubmit={formik.handleSubmit}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Paper elevation={1} sx={{
                        padding: 2,
                        display: "flex",
                        gap: "10px"
                    }}>
                        <FormikTextField formik={formik} fieldName={"minionTemplateName"} label={"Minion Name"}/>
                        <FormikSelect formik={formik} fieldName={"minionRole"} options={[
                            "brute", "tank", "soldier", "ranged", "magic", "support"
                        ]} label={"Role"}/>
                    </Paper>
                </Box>
                <Divider sx={{margin: 2}}/>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around"
                    }}
                >
                    <Paper elevation={1} sx={{
                        padding: 2
                    }}>
                        <FormikSelect
                            formik={formik}
                            fieldName={"currentArmorId"}
                            label={"Armor Name"}
                            options={ArmorData.GetAllBaseData().map(ad => ad._id)}
                            optionNames={ArmorData.GetAllBaseData().map(ad => ad.armorName)}
                        />
                        <FormikNumericField formik={formik} fieldName={"currentArmorEnchantment"}
                                            label={"Enchantment Level"} min={0} max={10}/>
                    </Paper>
                    <Paper elevation={1} sx={{
                        padding: 2
                    }}>
                        <FormikSelect
                            formik={formik}
                            fieldName={"currentWeaponId"}
                            label={"Weapon Name"}
                            options={WeaponData.GetAllStandardWeapons().map(ad => ad._id)}
                            optionNames={WeaponData.GetAllStandardWeapons().map(ad => ad.cardName)}
                        />
                        <FormikNumericField formik={formik} fieldName={"currentWeaponEnchantment"}
                                            label={"Enchantment Level"} min={0} max={10}/>
                    </Paper>
                </Box>


                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        padding: 4,
                        gap: "10px"
                    }}
                >
                    {
                        Object.entries(formik.values.minionBaseStats).map(([key, stat]) => (
                            <FormikNumericField
                                formik={formik}
                                fieldName={`minionBaseStats.${key}`}
                                label={capitalize(key)}
                                key={key}
                                min={0}
                                max={75}
                            />
                        ))
                    }
                </Box>
                <Button type={"submit"}>test</Button>

                <Divider />
                test
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "5fr 5fr 1fr",
                        gap: "10px"
                    }}
                >
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                        elevation={1}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: "12px",
                                padding: "6px",
                                justifyContent: "space-around"
                            }}
                        >
                            <FormikTextField formik={formik} fieldName={"minionTemplateName"} label={"Minion Name"}/>
                            <FormikSelect formik={formik} fieldName={"minionRole"} options={[
                                "brute", "tank", "soldier", "ranged", "magic", "support"
                            ]} label={"Role"}/>

                        </Box>
                    </Paper>
                    <Paper
                        sx={{

                        }}
                        elevation={1}
                    >
                        test2
                    </Paper>
                    <Box>
                        <PoleProgress currentXP={currentXP}/>
                    </Box>
                </Box>


            </form>

        </Box>
    )
}

export default CreateMinionTemplate