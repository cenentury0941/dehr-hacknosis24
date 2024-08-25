import React, { useEffect, useState } from "react";
import "./styles/ImageViewer.css";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import Ocr from "../utils/opentext/ocr";
import { formatBytes } from "../utils/common";
import ResultText from "./ResultText";
import {aiAnalyseText} from "../utils/openai/openai";
import AnalyseTextPopup from "./AnalyseTextPopup";

export default function ImageViewer({setImageViewerData,imageViewerData,file}) {
    const [fileData, setFileData] = useState(null)
    const [ocrText, setOcrText] = useState("")
    const [aiText, setAIText] = useState("")

    useEffect( () => {
        if(ocrText == "")
        {
            return
        }
        aiAnalyseText(ocrText,setAIText)
    } , [ocrText] )

    return <div className="ImageViewerContainer">
        <div className="ImageViewer">
            <div className="ImageContainer">
                <div style={{width: "100%"}}>
                    <img src={imageViewerData} className="ImageStyle"/>
                </div>
            </div>
            <div className="DataContainer">
                <p className="DataFileIndex">File #{file["index"]}</p>
                <p className="DataFileName">{file["name"]}</p>
                <p>Size : {formatBytes(imageViewerData.length)}</p>
                <p>Received on : {file["ts"]}</p>
                {/* <div className="HorizontalDivider" /> */}
                { (ocrText == "") && (aiText == "") && <ResultText text={""} blur={true}/> }
                { (ocrText != "") && (aiText == "") && <ResultText text={ocrText} blur={true}/> }
                { (ocrText != "") && (aiText != "") && <ResultText text={aiText} blur={ocrText == "" || aiText == ""}/> }
                <AnalyseTextPopup ocrText={ocrText} aiText={aiText} setFileData={setFileData} imageData={imageViewerData} fileData={fileData}/>
            </div>
            <IconButton style={{position:"fixed", top:"20px", right:"20px"}} onClick={()=>{setImageViewerData(null)}}>
                <CloseIcon />
            </IconButton>
        </div>
        <Ocr fileData={fileData} setText={setOcrText}/>
    </div>
}