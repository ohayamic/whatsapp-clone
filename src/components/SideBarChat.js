import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
//import { MoreHoriz, DonutLarge, Add, Search } from '@material-ui/icons';
import {Avatar} from '@material-ui/core'
import './SideBarChat.css';
import db from '../firebase';


const SideBarChat = ({addNewChat, id, name}) => {
    const [seed, setSeed] = useState('')
    const [messages, setMessages] = useState('')
    
//use to add/get stuff when components load == componentdidmount
useEffect(() => {
    if (id) {
        db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => (
            setMessages(
                    snapshot.docs.map((doc) => doc.data())
            )
        ))
    }
    setSeed(Math.floor(Math.random() * 5000))
}, [id])

    const CreateRoom = () => {
        const roomName = prompt("please enter name of chat")
        if (roomName) {
            // do something special ..... later
            // add room name to the database in firestore
            db.collection("rooms").add({
                name:roomName
            })
        }
    }
    
// conditionally render component based on the props
    return !addNewChat ? (
        <Link to ={`/rooms/${id}`} style={{textDecoration:"none"}}>
        <article className="sideBar__bottom">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/> 
            <div key={id}>
                <h1>{name}</h1>
                <p>{messages[0]?.message} ... </p>
            </div>
        </article>
        </Link> ):(
        <article className="sideBar__bottom" onClick={CreateRoom}>
            <div>
                <h1>Add new chat</h1>
            </div> 
        </article>)
}

export default SideBarChat
