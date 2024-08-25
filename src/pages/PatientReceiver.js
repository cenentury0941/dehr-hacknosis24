import React, { useEffect, useRef, useState } from "react";
import { useFilePicker } from 'use-file-picker';
import Peer from "peerjs";
import { formatBytes, reverse } from "../utils/common";

import "../components/styles/PatientPortal.css";
import { CircularProgress } from "@mui/material";

export default function PatientReceiver(){
    const [log , setLog] = useState("bsudbfsud")
    const [st , setSt] = useState("Connecting...")
    const [peer, setPeer] = useState(null)
    const [conn, setConn] = useState(null)
    const queryString = window.location.search;
    const inputFile = useRef(null) 
    const [receivedFiles, setReceivedFiles] = React.useState([])

    const urlParams = new URLSearchParams(queryString);

    function readImageAsString(file, callback) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const base64String = event.target.result;
            callback(base64String);
        };
        reader.readAsDataURL(file);
    }
    
    const { openFilePicker, filesContent, loading } = useFilePicker({
        accept: '.pdf',
      });

    const peerId = urlParams.get('peerId')

    const sendMessage = (content) => {
        conn.send(content);
        console.log(content)
        setTimeout( () => {
            sendMessage(content)
        } , 5000 )
    }

    const onChangeFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        if (file) {
            readImageAsString(file, function(base64String) {
                console.log(base64String);
                sendMessage(file.name+"|||"+base64String+"|||"+file.type);
            });
        }
    }

    useEffect( () => {
        setPeer(new Peer("PATIENT"))
    } , [] )

    useEffect( () => {

        if(conn==null)
        {
            return
        }

        conn.on("open", () => {
            setSt(`Connection opened`)
        })
        conn.on("close", () => {
            setSt(`Connection closed`)
            console.log("Connection closed")
        })
        conn.on("error", (err) => {
            setSt(`Connection error`)
            console.log("Connection Error",err)
        })
        conn.on("data",(data)=>{
            console.log(data)
          var name = data.split("|||")[0]
          var dat = data.split("|||")[1]
          setReceivedFiles( oldReceivedFiles => [...oldReceivedFiles,   
            {
                "index":oldReceivedFiles.length,
                "data":dat,
                "name":name,
                "ts":Date(),
                "size":formatBytes(data.length)
            }] )
            setSt(`Received File ${name}`)
            })

    }, [conn] )

    useEffect( () => {
        
        if(peer==null)
        {
            return;
        }

        peer.on( "open" , (id) => {
            setConn(peer.connect(peerId))
        } )

    }, [peer] )
    
    useEffect( () => {
        filesContent.map( (file, index) => {
            sendMessage(file.content)
            console.log(`sent ${index}`)
        })
    }, [filesContent] )

    return <div className="PatientContainerOverflow">
        
        <div className="PatientCardShort">
            <p className="PatientCardTitle">Receive Files</p>
            <p className="patientCardContent">{st}</p>
        </div>

        {
            st == "Connecting..." && <CircularProgress />
        }

        { reverse(receivedFiles).map( (data) => {
            return <div className="Image"><p className="PatientCardContent">{data["name"]}</p><img src={data["data"]} style={{width:"100%", display:"flex",flexShrink:0}}/></div>
        } ) }

    </div>
}