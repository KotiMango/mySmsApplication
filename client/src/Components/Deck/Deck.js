import React, { useState, useEffect } from "react";
import ComposeCard from "../ComposeCard/ComposeCard";
import HistoryCard from "../HistoryCard/HistoryCard";
import axios from "axios"
import moment from "moment";
import "./style.css";
export default function Deck() {
    const [sentMessages, setSentMessages] = useState(undefined);

    const historyFetcher = async () => {
        const messagesArray = await axios.get(window.location.origin + '/api/mysms');
        setSentMessages(messagesArray.data);
    };
    const addNewMessage = (body,to) => { 
        const newMessage = {
            body,
            to,
            date_sent:moment().format("llll")
     }
        setSentMessages([...sentMessages,newMessage])
    }
    useEffect(() => {
        historyFetcher();
    }, [])

    return (
        <div className="deck_container">
            <div className="deck">
                <ComposeCard addNewMessage={addNewMessage} />
                {sentMessages && <HistoryCard sentMessages={sentMessages} />}
            </div>
        </div>
    );
}
