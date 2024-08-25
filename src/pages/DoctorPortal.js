import React from "react";
import Features from "../components/Features";
import { ThemeProvider } from "@emotion/react";
import getLPTheme from "./getLPTheme";
import { createTheme } from "@mui/material";
import AppAppBar from "../components/AppAppBar";

export default function DoctorPortal(){
    const LPtheme = createTheme(getLPTheme('light'));

    return <ThemeProvider theme={LPtheme}>
        <AppAppBar mode={'light'} toggleColorMode={()=>{}} />
        <Features />
    </ThemeProvider>
}