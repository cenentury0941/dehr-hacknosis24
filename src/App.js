import './App.css';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import { BrowserView, MobileView } from 'react-device-detect';
import DoctorPortal from './pages/DoctorPortal';
import PatientPortal from './pages/PatientPortal';
import Ocr from './utils/opentext/ocr';
import PatientReceiver from './pages/PatientReceiver';
import { getCookieData, initCookies } from './utils/cookies';

function App() {
  
  if(getCookieData() == null)
  {
    initCookies()
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage/>,
    },
    {
      path: "/doctor",
      element: <DoctorPortal />,
    },
    {
      path: "/patient",
      element: <>
      <MobileView><PatientPortal/></MobileView>
      <BrowserView><PatientPortal/></BrowserView>
      </>,
    },
    {
      path: "/ocr",
      element: <Ocr />
    },
    {
      path: "/patientReceiver",
      element: <PatientReceiver />
    },
  ]);

  return (
      <RouterProvider router={router} />
  );
}

export default App;
