import React, {useContext, useEffect
} from "react";
import { auth, onAuthStateChanged, db, doc, getDoc } from "./firebase"
import { GlobalContext } from '../Context/ContextAPI';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

// import AboutUs from "../Screens/AboutUs";
import Home from "../Screens/Home"
import SignUp from "../Screens/SignUp";
import SignIn from "../Screens/SignIn"
import Mytweets from "../Screens/MyTweets";

export default function App() {

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
    //     await dispatch({ type: "CURRENT_USER", payload: userInfo });
    // }

    return (
        <Router>
            <div>

                <Switch>

                    <Route exact path="/">
                        <SignUp />
                    </Route>

                    <Route path="/signin">
                        <SignIn />
                    </Route>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/mytweets">
                        <Mytweets/>
                    </Route>

                </Switch>
            </div>
        </Router>
    );
}
