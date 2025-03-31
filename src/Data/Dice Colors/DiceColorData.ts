import {IDiceColor} from "./IDiceColor";


const DieColorData: Array<IDiceColor> = [
    {
        id: "DD_STANDARD",
        name: "Dark Mode Standard",
        colorData: {
            dotColor: "white",
            faceColor: "#343434",
            outline: false,
        },
        lockedByDefault: false,
    },
    {
        id: "DD_LIGHTMODE",
        name: "Light Mode Standard",
        colorData: {
            dotColor: "black",
            faceColor: "white",
            outline: false,
        },
        lockedByDefault: false,
    },
    {
        id: "DD_BLUE_RED",
        name: "Blue & Red",
        colorData: {
            dotColor: "red",
            faceColor: "blue",
            outline: false,
        },
        lockedByDefault: false,
    },
    {
        id: "DD_GOLD",
        name: "Gold & Black",
        colorData: {
            dotColor: "gold",
            faceColor: "#131313",
            outline: true,
            outlineColor: "gold",
        },
        lockedByDefault: false,
    },
    {
        id: "DD_ASTRAL",
        name: "Astral Sea",
        colorData: {
            dotColor: "black",
            faceColor: "#340f8c",
            outline: true,
            outlineColor: "#3731da",
        },
        lockedByDefault: false,
    },
    {
        id: "DD_FROST",
        name: "Frostbourne",
        colorData: {
            dotColor: "#b4d3ec",
            faceColor: "#636363",
            outline: false,
            outlineColor: "white",
        },
        lockedByDefault: false,
    },
    {
        id: "DD_EYES",
        name: "The Eyes",
        colorData: {
            dotColor: "#caca66",
            faceColor: "#0a3015",
            outline: false,
            outlineColor: "black",
        },
        lockedByDefault: false,
    }
]

export default DieColorData

