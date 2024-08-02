import React from "react";
import QRCode from "react-qr-code";

export default function MobileOnly(){
    var url = window.location.href.replace("localhost","172.19.190.31")
    return (
        <div>
        This is a mobile only page {url}
        <QRCode value={url}/>
        </div>
    );
}