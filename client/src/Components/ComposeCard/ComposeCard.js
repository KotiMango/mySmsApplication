import React, { useState } from 'react'
import axios from 'axios';
import './style.css';
const accountSid = 'ACc6a2b540bb0a1af990fadd7c76e2892d'

export default function ComposeCard({ addNewMessage }) {
    const [phoneNumberValue, setPhoneNumberValue] = useState('+')
    const [messageTextValue, setMessageTextValue] = useState('')

    const clearMessageInputs = (ev) => {
        if(ev) ev.preventDefault();
        setPhoneNumberValue('+');
        setMessageTextValue('');
    }

    const submitter = async () => {
        const twilioPayload = { body: messageTextValue, to: phoneNumberValue }
        try {
            const messageInsertionRes = await axios.post(window.location.origin + '/api/mysms', twilioPayload)
            console.log(messageInsertionRes)
            addNewMessage(messageTextValue, phoneNumberValue);
            clearMessageInputs();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="card_container">
            <div className="compose_card">
                <div className="card_body">
                    <h2 className="card_title">New Message</h2>
                    <label >Phone Number</label>
                    <input className='phone_inputbox' type="text" value={phoneNumberValue} onChange={((event) => setPhoneNumberValue(event.target.value))} />
                    <label >Message</label>
                    <textarea className='message_inputbox' type="text" value={messageTextValue} onChange={((event) => setMessageTextValue(event.target.value))} />
                    <div className="compose_buttons">
                        <a href='' onClick={clearMessageInputs} className='clear'>Clear</a>
                        <button onClick={submitter} className="submit_button">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
