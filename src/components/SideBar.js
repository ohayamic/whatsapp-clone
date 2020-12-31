import React, {useState, useEffect} from 'react'
import { MoreHoriz, DonutLarge, Add, Search } from '@material-ui/icons';
import { IconButton, Avatar} from '@material-ui/core';
import db from "../firebase";
import SideBarChat from './SideBarChat'
import './SideBar.css'
import { useStateValue } from '../StateProvider';

const SideBar = () => {
 //   const [inp, setInp] = useState('')
    const [rooms, setRooms] = useState([])
    const [{user}] = useStateValue()


useEffect(() => {
    db.collection("rooms").onSnapshot(snapshot =>
        setRooms(
            snapshot.docs.map((doc) => {
                return ({
                    id: doc.id,
                    data: doc.data()
                })
            })
        ));
    
}, [])
    return (
        <section className="sideBar__header">
            <article className="sideBar__top" style={{display:"flex"}}>
                <Avatar src={ user?.photoURL}/>          
                <div className="sideBar__more">
                    <IconButton>
                         <DonutLarge />
                    </IconButton>
                    <IconButton>
                         <Add />
                    </IconButton>
                    <IconButton>
                        <MoreHoriz />
                    </IconButton>

                </div>
            </article>
                
            <article className="sideBar__search">
                <Search />
                <input type="text" placeholder="Search or start new chat"   />
            </article>
            <section className="scroll__area">
                <SideBarChat addNewChat />
                {rooms.map((room) => (
                    <SideBarChat key={room.id} id={room.id} name={ room.data.name}/>

                ))}
                
            </section>
           
            
        </section>
    )
}

export default SideBar