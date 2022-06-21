import React, { useState } from 'react'
import axios from 'axios';
import './style.css';


function HistoryItem({sentMessage}) {
    const {to, date_sent, body} = sentMessage;
    return (
        <div className="message_container">
            <div className="message_meta">
                <div >{to}</div>
                <div >{date_sent}</div>
            </div>
            <div className="message_body">{body}</div>
        </div>
    )
}


export default function HistoryCard({ sentMessages }) {
    return (
        <div className="card_container">
            <div className="history_card">
                <div className="card_body">
                <h2 className="card_title">Message History ({sentMessages.length})</h2>
                <div className="history_card_scrollbox">
                    {sentMessages.reverse().map((sentMessage, index) => <HistoryItem key={index} sentMessage={sentMessage}/>)}
                </div>
                </div>
            </div>
        </div>
    )
}
