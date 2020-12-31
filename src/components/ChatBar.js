import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import db from '../firebase'
import firebase from 'firebase'
import { Search, MoreVert, TagFaces, AttachFile, Send, Mic} from '@material-ui/icons';
import { IconButton, Avatar } from '@material-ui/core';
import './ChatBar.css';
import { useStateValue } from '../StateProvider';

function ChatBar () {
    const [inp, setInp] = useState('')
    const [seed, setSeed] = useState('')
    const [roomName, setRoomName] = useState(" ")
    const [messages, setMessages] = useState([])

// Get user id from the URL
    const {roomId} = useParams();
// Get user from StateProvider
    const [{ user }] = useStateValue()
    
//use to add/get stuff when components load == componentdidmount
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
        if (roomId) {
            // get the rooms from the DB
            db.collection("rooms")
                .doc(roomId)
                .onSnapshot((snapshot) =>
                    setRoomName(snapshot.data().name));
            // get the messages from the db => check DB achitecture for details
            db.collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => (
                    setMessages(snapshot.docs.map((doc) => doc.data()))
            ))
        }
    }, [roomId]);
    
    
    const getInput = (e) => {
        e.preventDefault()
        setInp(e.target.value)
    }
    
    const sendMsg = (e) => {
        e.preventDefault()
        db.collection("rooms").doc(roomId).collection("messages").add({
            name: user.displayName,
            message: inp,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInp('');
        console.log(messages)
    };

    return (
        <section className="chat__header">
        <section className="top">
            <article  className="chat__top">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/> 
                    <div >
                        <h1>{roomName}</h1>
                        <p>last seen {new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString().slice(0, 25)} ... </p>
                    </div>
            </article>
            <article className="chat__topRight">
                <IconButton>
                    < Search style={{ transform: "rotate(90deg)"}} />
                </IconButton>
                <IconButton>
                    < MoreVert />
                </IconButton>
            </article>
        </section>
            <article className="chat__body">
                {messages.map((message, index) => (
                <div className={`chat__body__relative  ${message.name === user.displayName && "chat__receiver"}`} key={index}>
                    <span className="chat__body__absolute">
                        {message.name}
                    </span>
                    <p>{message.message} <span>{new Date(message.timestamp?.toDate()).toUTCString()}</span></p>
                </div>
                ))}
                
                
        </article>

            <article className="chat__bottom">
                <div className="chat__bottomAddons">
                    <TagFaces />
                    <AttachFile />
                </div>
                <form className="chat__bottomInput">
                    <input type="text" placeholder="Type a message" onChange={getInput} value={inp}/>
                    {!inp.length? <Mic /> : < Send type='submit' onClick={sendMsg}/>}
                </form>
                

        </article>
        </section>
    )
}

export default ChatBar
