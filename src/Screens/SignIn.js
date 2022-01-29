import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import "./SignIn.css"
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';
import { Link } from "react-router-dom"
import { db, doc, collection, query, where, getDocs, auth, signInWithEmailAndPassword } from "../Configs/firebase"

function SignIn() {

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [error, setError] = useState('')
    const History = useHistory()

    // let dbData 

    let signInBtnClicked = () => {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user, "user")
                History.push("/home")   
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                setError(errorMessage)
            });



    }

    return (
        <div className="signin">
            <Paper className="paper" elevation={3}>
                <h1>
                    SIGN IN
                </h1>
                <br /><br />
                <label className="paper__label">
                    <p className="paper__labelText">EMAIL: </p>
                    <input className="paper__input" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </label>
                <label className="paper__label">
                    <p className="paper__labelText">PASSWORD: </p>
                    <input className="paper__input" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </label>
                <br />
                <p className="error">
                    {error}
                </p>
                <br />
                <p>
                    Don't Have An Account? <Link to="/"> Sign Up</Link>
                </p>
                <br />
                <br />
                <Button onClick={signInBtnClicked} className="signin__btn" variant="outlined">SIGN IN</Button>
            </Paper>
        </div>
    )
}

export default SignIn
