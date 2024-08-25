import React from "react";
import ResultText from "./ResultText";
import { CircularProgress, LinearProgress } from "@mui/material";
import "./styles/CarbonImpactAnalysis.css"

export default function CarbonImpactAnalysis({text}) {
    return <div className="impactAnalysisContainer">
        { text == "" && <LinearProgress /> }
        { text != null && text != "" && <ResultText text={text} blur={false} /> }
    </div>
}