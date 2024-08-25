import React from "react";
import "./styles/AnalyseTextPopup.css";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import Button from '@mui/material/Button';

export default function AnalyseTextPopup({ocrText, aiText, setFileData, imageData, fileData}){
    var hidden = ocrText != "" && aiText != ""
    return <div className={`AnalyseTextPopup ${hidden?"Hidden":""}`}>
        <div className={`DocumentImage ${fileData != null ? "Blink" : ""}`}>
            { fileData && <div className="ScanLine"/> }
        </div>
        <Button variant="contained" color="primary" onClick={()=>{setFileData(imageData)}}>
            { fileData == null ? "Analyse Document" : (ocrText == "" ? "OpenText OCR Scanning" : ( aiText == "" ? "OpenAI Analysis..." : "Done Scanning Document" )) }
        </Button>
    </div>
}