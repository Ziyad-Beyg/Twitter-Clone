import React, { useContext, useEffect } from 'react'
import LeftSideBar from './LeftSideBar';
import Feed from '../Compnents/Feed';
import "./mytweets.css"
import Widgets from '../Compnents/Widgets';
import { GlobalContext } from '../Context/ContextAPI';
import { auth, onAuthStateChanged, db, doc, getDoc } from "../Configs/firebase"

function Mytweets() { 

    // const {state, dispatch} = useContext(GlobalContext)

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user)=>{
    //         if(user){
    //             console.log(user.uid, "USER")
    
    //             fetchCurrrentUserInfo(user.uid)
    //         }
    //         else{
    //             console.log("NO USER")
    //         }
    //     })
    // },[])

    // const fetchCurrrentUserInfo = async (uid) => {
    //     let userRef = doc(db, 'Signed__Up__Users', uid);
    //     let userInfo = await getDoc(userRef);
    //     userInfo = userInfo.data();
    //     console.log(userInfo);
    //     dispatch({ type: "CURRENT_USER", payload: userInfo });
    // }


    return (
        <div className="home">
            {/* SIDEBAR */}

            <LeftSideBar/>

            {/* MY TWEETS */}

            <Feed/>

            {/* WIDGETS */}

            <Widgets/>

        </div>
    )
}

export default Mytweets

