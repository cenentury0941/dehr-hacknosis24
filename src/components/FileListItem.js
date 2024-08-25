import React from "react";
import "./styles/FileListItem.css";


export default function FileListItem({file,setImageViewerData,setSelectedFile}){
    return <div className="FileListItemContainer" onClick={()=>{setSelectedFile(file);setImageViewerData(file["data"])}}>
        <p className="Content">File #{file["index"]}</p>
        <p className="SubTitle">File Name : {file["name"]}</p>
    </div>
}