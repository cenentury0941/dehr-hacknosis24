import React from "react";

import { Peer } from "peerjs";
import QRCode from "react-qr-code";

import "./styles/PeerConnectionHandler.css";
import { formatBytes } from "../utils/common";
import { Button } from "@mui/material";
import { addDocumentReceived, addDocumentSent } from "../utils/cookies";

const local_ip = "172.20.10.2" 
const local_base_url = `http://${local_ip}:3000`
const deployed_base_url = "https://dehr-hacknosis24.vercel.app"
const deployed = true

function PeerReceiverHandler({receivedFiles,setReceivedFiles}){

const [url, setUrl] = React.useState("Loading")
const [peer, setPeer] = React.useState(null)

React.useEffect( () => {

      setPeer(new Peer());

} , [] )

  React.useEffect ( () => {
    console.log(peer)
    if( peer == null )
    {
        return
    }
    peer.on("open", (id) => {
        setUrl(((deployed?deployed_base_url:local_base_url)+`/patient?peerId=`).concat(peer.id))
        console.log(id)
      })
  
    peer.on('connection', function(conn) { 
        console.log("CONNECTION" , conn)
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
            addDocumentReceived(data.length)
        })
       });
  
    peer.on("close", () => {
        console.log("CLOSED")
      })
      
    peer.on('error', (err) => {
        console.log(err);
    });
  } , [peer] )


    return <div className="PeerConnectionContainer">
        <div className="TextContainer">
            <p className="Title">Receive Documents</p>
            <p className="SubTitle">Scan the QR code on the patient's device to receive documents from the patient.</p>
            { peer && peer.id && <p className="Content">Peer ID : {peer.id}</p> }
            { peer && !(peer.id) && <p className="Content">Setting up P2P connection... </p> }
            <p className="Content">Documents Received : {receivedFiles.length}</p>
        </div>
        <QRCode style={{"height":"100%", opacity:(peer&&peer.id==null?0.25:1)}} value={url}/>
    </div>
}

function PeerSenderHandler({fileToSend, setFileToSend, setSentFiles, sentFiles}){

  const [url, setUrl] = React.useState("Loading")
  const [peer, setPeer] = React.useState(null)
  const [st , setSt] = React.useState("Start")
  const [conn, setConn] = React.useState(null)
  const [sendLock, setSendLock] = React.useState(false)
  
  function readImageAsString(file, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const base64String = event.target.result;
        callback(base64String);
    };
    reader.readAsDataURL(file);
  }

  const onClick = () => {
    if( conn == null )
    {
      return
    }
    document.getElementById("fileInput").click()
  }
  
  const sendMessage = (content) => {
    if(conn == null)
    {
      console.log("Connection Null")
      return
    }
    if(sendLock)
    {
      return
    }
    setSendLock(true)
    setTimeout( () => {
      setSendLock(false)
    } , 3900 )
    conn.send(content);
    addDocumentSent(content.length)
    var name = content.split("|||")[0]
    var dat = content.split("|||")[1]
    setSentFiles( oldSentFiles => [...oldSentFiles,   
      {
        "index":oldSentFiles.length+1,
        "data":dat,
        "name":name,
        "ts":Date(),
        "size":formatBytes(content.length)
      }] )
    console.log(content)
  }


  const onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    setSt(`sending file ${file}`)
    if (file) {
        readImageAsString(file, function(base64String) {
            console.log(base64String);
            sendMessage(file.name+"|||"+base64String+"|||"+file.type);
        });
    }
  }

    React.useEffect( () => {

          setPeer(new Peer());

    } , [] )
  
    React.useEffect ( () => {
      console.log(peer)
      if( peer == null )
      {
          return
      }
      peer.on("open", (id) => {
          setUrl(((deployed?deployed_base_url:local_base_url)+`/patientReceiver?peerId=`).concat(peer.id))
          console.log(id)
        })
    
      peer.on('connection', function(conn) { 
          console.log("CONNECTION" , conn)
          conn.on("data",(data)=>{

          })
          setConn(conn)
         });
    
      peer.on("close", () => {
          console.log("CLOSED")
        })
        
      peer.on('error', (err) => {
          console.log(err.type, err);
      });
    } , [peer] )
  
  
      return <div className="PeerConnectionContainer">
          <div className="TextContainer">
              <p className="Title">Send Documents</p>
              <p className="SubTitle">Scan the QR code on the patient's device to send documents to the patient.</p>
              { peer && peer.id && <p className="Content">Peer ID : {peer.id}</p> }
              { peer && !(peer.id) && <p className="Content">Setting up P2P connection... </p> }
              <p className="Content">Documents Sent : {sentFiles && sentFiles.length}</p>
              <Button variant={`${conn ? "contained" : "outlined"}`} color="primary" style={{paddingLeft:"2vw",paddingRight:"2vw",marginLeft:"auto"}} onClick={onClick}>Send file</Button>        
              <input type='file' id='fileInput' onChange={onChangeFile} style={{display:"none"}}/>
          </div>
          <QRCode style={{"height":"100%", opacity:(peer&&peer.id==null?0.25:1)}} value={url}/>
      </div>
  }

export {PeerReceiverHandler, PeerSenderHandler}