import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from "react-router-dom";
import UrsuraRouter from "./Utils/UrsuraRouter";
import CharacterProvider from "./Hooks/useCharacter/CharacterProvider";
import EventHistoryProvider from "./Hooks/useEventHistory/EventHistoryProvider";
import UserProvider from "./Hooks/useUser/UserProvider";
import APIProvider from "./Hooks/useAPI/APIProvider";
import PreloadedCharacterProvider from './Hooks/usePreloadedContent/PreloadedContentProvider'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
      <UserProvider>
          <APIProvider>
              <PreloadedCharacterProvider>
                  <CharacterProvider>
                      <EventHistoryProvider>
                          <RouterProvider router={UrsuraRouter} />
                      </EventHistoryProvider>
                  </CharacterProvider>
              </PreloadedCharacterProvider>
          </APIProvider>
      </UserProvider>
  // </React.StrictMode>
);


