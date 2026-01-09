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
import FatelinesPage from "../Pages/FatelinesPage";
import CharacterSelectPage from "../Pages/CharacterSelectPage";
import CreatorPage from "../Pages/CreatorPage";
import CreateSourcePage from "../Pages/CreateSourcePage";
import CardCreatorPage from "../Pages/CardCreatorPage";
import AdminRoute from "./RouteProtection/AdminRoute";
import RegisteredRoute from "./RouteProtection/RegisteredRoute";
import CardRequestReviewPage from "../Pages/CardRequestReviewPage";
import DatachipCompendium from "../Pages/DatachipCompendium";
import GadgetCompendium from "../Pages/GadgetCompendium";
import ConditionCompendium from "../Pages/ConditionCompendium";
import RulesPage from "../Pages/RulesPage";



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
                path: "/character_select",
                element: <CharacterSelectPage />
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
                path: "/rules",
                children: [
                    {
                        path: "",
                        element: <RulesPage />
                    }
                ]
            },
            {
                path: "creator",
                children: [
                    {
                        path: "",
                        element: <CreatorPage />
                    },
                    {
                        path: "sources",
                        element: <AdminRoute element={<CreateSourcePage />}/>
                    },
                    {
                        path: "cards",
                        element: <CardCreatorPage />
                    },
                    {
                        path: "requests",
                        element: <AdminRoute element={<CardRequestReviewPage />}/>
                    }
                ]
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
                        path: "fatelines",
                        element: <FatelinesPage />
                    },
                    {
                        path: "datachips",
                        element: <DatachipCompendium />
                    },
                    {
                        path: "gadgets",
                        element: <GadgetCompendium />
                    },
                    {
                        path: "conditions",
                        element: <ConditionCompendium />
                    },
                    {
                        path: "",
                        element: <BarracksPage />
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
                ],
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