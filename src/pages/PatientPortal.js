import React, { useEffect, useRef, useState } from "react";
import { useFilePicker } from 'use-file-picker';
import Peer from "peerjs";

import "../components/styles/PatientPortal.css";
import { Button, CircularProgress } from "@mui/material";

export default function PatientPortal(){
    const [log , setLog] = useState("bsudbfsud")
    const [st , setSt] = useState("Start")
    const [peer, setPeer] = useState(null)
    const [conn, setConn] = useState(null)
    const queryString = window.location.search;
    const inputFile = useRef(null) 

    const urlParams = new URLSearchParams(queryString);

    const onClick = () => {
        if( conn == null )
        {
          return
        }
        document.getElementById("fileInput").click()
      }
      
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
        console.log(content);
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
            setSt("Loaded")
            document.getElementById("fileInput").click();
        })
        conn.on("close", () => {
            setSt(`Connection closed`)
            console.log("Connection closed")
        })
        conn.on("error", (err) => {
            setSt(`Connection error`)
            console.log("Connection Error",err)
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

    return <div className="PatientContainer">
        <div className="PatientCard">
        <h3 className="PatientCardTitle">Send Documents</h3>

        { st != "Loaded" && <CircularProgress /> }
        { st == "Loaded" && <p className="PatientCardContent">Connected to {peerId}</p> }
        { st == "Start" && <p className="PatientCardContent">Connecting to Peer...</p> }
        { st != "Start" && st != "Loaded" && <p className="PatientCardContent">{st}</p> }
        { st == "Loaded" && <Button variant={`contained`} color="primary" style={{paddingLeft:"2vw",paddingRight:"2vw",marginLeft:"auto",marginRight:"auto",width:"50%"}} onClick={onClick}>Send file</Button> }
        <input style={{display:"none"}} type='file' id='fileInput' ref={inputFile}  onChange={onChangeFile}/>
        </div>
    </div>
}