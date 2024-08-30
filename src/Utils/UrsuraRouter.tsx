import React from 'react'
import {createBrowserRouter} from "react-router-dom";
import PageLayout from "../Components/Routing/PageLayout";
import Page404 from "../Components/Routing/Page404";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import ProtectedRoute from "./RouteProtection/ProtectedRoute";
import LoggedInRoute from "./RouteProtection/LoggedInRoute";
import CharacterPage from "../Pages/CharacterPage";
import CreateCharacterPage from "../Pages/CreateCharacterPage";
import CreateUserPage from "../Pages/CreateUserPage";
import ClassCompendiumPage from "../Pages/ClassCompendiumPage";
import AffinityCompendiumPage from "../Pages/AffinityCompendiumPage";
import SignupPage from "../Pages/SignupPage";
import BarracksPage from "../Pages/BarracksPage";
import WeaponCompendium from "../Pages/WeaponCompendium";
import ArmorCompendium from "../Pages/ArmorCompendium";
import SourceCompendium from "../Pages/SourceCompendium";
import MinionCreationPage from '../Pages/MinionCreationPage';
import MinionCompendiumPage from "../Pages/MinionCompendiumPage";
import MinionLandingPage from "../Pages/MinionLandingPage";
import ConsumableCompendium from "../Pages/ConsumableCompendium";



const UrsuraRouter = createBrowserRouter([
    {
        element: <PageLayout />,
        errorElement: <Page404 />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/new",
                children: [
                    {
                        path: "character",
                        element: <CreateCharacterPage />,
                    },
                    {
                        path: "user",
                        element: <CreateUserPage />
                    }
                ]
            },
            {
              path: "/compendium",
              children: [
                  {
                      path: "classes",
                      element: <ClassCompendiumPage />
                  },
                  {
                      path: "affinities",
                      element: <AffinityCompendiumPage />
                  }
              ]
            },
            {
                path: "/characters",
                element: <CharacterPage />
            },
            {
                path: "/barracks",
                children: [
                    {
                        path: "weapons",
                        element: <WeaponCompendium />
                    },
                    {
                        path: "armor",
                        element: <ArmorCompendium />
                    },
                    {
                        path: "sources",
                        element: <SourceCompendium />
                    },
                    {
                        path: "consumables",
                        element: <ConsumableCompendium />
                    },
                    {
                        path: "",
                        element: <BarracksPage />
                    }
                ],

            },
            {
              path: "minions",
                children: [
                    {
                        path: "create",
                        element: <MinionCreationPage />
                    },
                    {
                        path: "templates",
                        element: <MinionCompendiumPage />
                    },
                    {
                        path: "",
                        element: <MinionLandingPage />
                    }
                ]

            },
            {
                path: "/login",
                element: <LoggedInRoute element={<LoginPage />} reverse={true}/>
            },
            {
                path: "/signup",
                element: <LoggedInRoute element={<SignupPage />} reverse={true}/>
            }
        ]
    }
]);

export default UrsuraRouter;