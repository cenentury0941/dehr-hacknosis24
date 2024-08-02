import logo from './logo.svg';
import './App.css';
import React from 'react';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home';
import LandingPage from './pages/LandingPage';
import { BrowserView, MobileView } from 'react-device-detect';
import MobileOnly from './pages/MobileOnly';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
      <BrowserView><MobileOnly /></BrowserView>
      <MobileView><LandingPage/></MobileView>
      </>,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
