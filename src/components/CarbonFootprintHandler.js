import React from "react";

import { Peer } from "peerjs";
import QRCode from "react-qr-code";

import "./styles/PeerConnectionHandler.css";
import { formatBytes } from "../utils/common";
import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import { addDocumentReceived, addDocumentSent, getCookieData } from "../utils/cookies";
import { getUserDeviceImpact } from "../utils/datavizta/api";
import Co2Icon from '@mui/icons-material/Co2';
import { aiAnalyseCarbon } from "../utils/openai/openai";


export default function CarbonFootprintHandler({setCarbonData}){

    const [device,setDevice] = React.useState("laptop")
    var carbonData = getCookieData()
    
    const handleChange = (event) => {
        setDevice(event.target.value);
      };

    const onClick = async () => {
        var impact = await getUserDeviceImpact(device)

        var filtered_Usage = {}
        for (const [key, value] of Object.entries(impact["impacts"])) {
            var usage = value["use"]["value"]
            usage = usage * 0.001 * (carbonData["sentCount"] + carbonData["receivedCount"] + carbonData["aiCount"])
            filtered_Usage[key] = { unit : value["unit"] , description : value["description"] , use : usage }
          }

        var combined_Data = {}

        combined_Data["documentsHandled"] = {
            sent : `${carbonData["sentCount"]} (${formatBytes(parseInt(carbonData["sentData"]))})`,
            received : `${carbonData["receivedCount"]} (${formatBytes(parseInt(carbonData["receivedData"]))})`,
            aiAnalysed : `${carbonData["aiCount"]}`
        }

        combined_Data["AnualEnvironmentalImpactPrediction"] = filtered_Usage

        var impact_data = JSON.stringify(combined_Data)
        console.log(impact_data)

        aiAnalyseCarbon(impact_data, setCarbonData)
    }

    return <div className="PeerConnectionContainer" style={{height:"39vh"}}>
        <div className="TextContainer">
            <p className="Title">Carbon Footprint
            </p>
            <p className="SubTitle">Measure and track your carbon footprint based on network usage statistics.</p>
            <p className="SubTitle">Documents sent : {carbonData["sentCount"]} ({formatBytes(parseInt(carbonData["sentData"]))})</p>
            <p className="SubTitle">Documents received : {carbonData["receivedCount"]} ({formatBytes(parseInt(carbonData["receivedData"]))})</p>
            <p className="SubTitle">Documents analysed : {carbonData["aiCount"]}</p>

            <p className="Content" style={{paddingTop:"10px"}}>Select your terminal device type:</p>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={device}
            label="Age"
            onChange={handleChange}
            fullWidth
            >
            <MenuItem value={"laptop"}>Laptop</MenuItem>
            <MenuItem value={"desktop"}>Desktop</MenuItem>
            <MenuItem value={"tablet"}>Tablet</MenuItem>
            </Select>
            <Button variant={`contained`} color="primary" fullWidth style={{paddingLeft:"2vw",paddingRight:"2vw",marginLeft:"auto",marginRight:"auto"}} onClick={onClick}>Calculate Carbon Footprint</Button>        
        </div>
        <Co2Icon style={{fontSize:"15vh"}}/>
    </div>
}