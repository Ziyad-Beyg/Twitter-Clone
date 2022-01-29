import React from 'react'
import {auth, signOut } from '../Configs/firebase'
import "./Widgets.css"
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';


function Widgets() {
    const History = useHistory()
    return (
        <div className="widgets">
            {/* HELLO WIDGETS */}

            <Button sx={{backgroundColor:'var(--twitter-color)'}} onClick={()=>{
                signOut(auth).then(() => {
                    console.log("SIGN OUT SUCCESS")
                    History.push('/')
                }).catch((error) => {
                    console.log(error.message)
                  });
            }} variant="contained">SIGN OUT</Button>
        </div>
    )
}

export default Widgets
