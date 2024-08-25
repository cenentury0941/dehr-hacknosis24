import React from "react";
import "./styles/ResultText.css";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';

export default function ResultText({text,blur}){
    const markdown = text //text.replaceAll("  ","")
    return <div className={`ResultTextContainer ${blur?"":"UnBlur"}`}>
        <Markdown>{markdown}</Markdown>
    </div>
}