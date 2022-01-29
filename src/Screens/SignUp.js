import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import "./SignUp.css"
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useHistory } from 'react-router';
import {Link} from "react-router-dom";
import { auth, createUserWithEmailAndPassword, db, doc, setDoc, storage, ref, uploadBytes, getDownloadURL } from "../Configs/firebase"


function SignUp() {
    let [username, setUserName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [selectedImg, setSelectedImg] = useState()
    let [downloadedURL, setDownloadedURL] = useState('')
    let [userAvatarTxt, setUserAvatarTxt] = useState("SELECT A DP")
    let [userAvatarStyles, setUserAvatarStyles] = useState()
    let [emailError, setEmailError] = useState('')
    let [dpError1, setDpError1] = useState({ color: 'red', fontSize: '18px', transition: '1s', wordSpacing: "5px" })
    let [dpError2, setDpError2] = useState({ color: 'red', fontSize: '15px', transition: '1s', wordSpacing: "3px" })
    let [defaultState, setDefaultState] = useState({ color: 'steelblue', fontSize: '15px', transition: '1s', wordSpacing: "1px" })
    // let [avatarImg, setAvatarImg] = useState('/broken-image.jpg')
    let [avatarImgPreview, setAvatarImgPreview] = useState('/broken-image.jpg')


    const History = useHistory()

    // console.log(selectedImg)

    useEffect(async () => {
        if (selectedImg) {
            console.log("hello IMAGE")
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setAvatarImgPreview(fileReader.result)
            };
            fileReader.readAsDataURL(selectedImg)

            // setAvatarImg(avatarImgPreview)
        }
        else {
            setAvatarImgPreview(null)
        }
        // localVar = selectedImg
        // console.log(localVar)
        // if(selectedImg.length > 0 ){
        //     console.log("IMAGE FOUND")
        // }
        // console.log(selectedImg.name)
        // let fileReader = new FileReader();

        // fileReader.onloadend = function (event) {
        //     console.log(fileReader.result)
        //     // document.getElementById("preview").setAttribute("src", event.target.result);
        // };

        // fileReader.readAsDataURL(selectedImg.name);
    }, [selectedImg])

    // let previewImg = () => {
    //     // if(selectedImg.length > 0 ){
    //     //     console.log("IMAGE FOUND")
    //     // }
    //     console.log("hello")
    // }

    useEffect(() => {
        console.log(downloadedURL)
    }, [downloadedURL])

    let dpNotFound = () => {

        let condition = true
        let errorBlinker = setInterval(() => {
            if (condition) {
                setUserAvatarStyles(dpError1)
                condition = false

            }
            else if (condition == false) {
                setUserAvatarStyles(dpError2)
                condition = true
            }
        }, 1000)

        setTimeout(() => {
            clearInterval(errorBlinker)
            setUserAvatarStyles(defaultState)
        }, 8000)
    }

    let signUpBtnClicked = async () => {

        if (selectedImg == undefined) {
            console.log("hello")
            dpNotFound()
        }
        else {
            console.log(selectedImg)

            try{
                let {user} = await createUserWithEmailAndPassword(auth, email, password)

                
            let imageRef = ref(storage, `images/dpImages/UID_${Math.random().toString(36).substr(2,11)}`)

            uploadBytes(imageRef, selectedImg).then(async (snapshot) => {
                console.log('Uploaded a blob or file!');
                await getDownloadURL(imageRef)
                    .then(async (url) => {
                        // console.log(url)
                         setDownloadedURL(url)

                        // setTimeout(async() => {
                            let dataRef =  doc(db, "Signed__Up__Users", user.uid)
                        await setDoc(dataRef, {
                            username, email, userID: user.uid, userDP:url
                        })
                        // console.log(downloadedURL)
                        History.push("/home")
                        // }, 3000);

                    })
            });
            }
            catch(err) {
                err.message = "This Email Is Already Under Use"
                setEmailError(err.message)
            }
            





        }

    }

    // console.log("UID_"+Math.random().toString(36).substr(2,11))

    return (
        <div className="signup">
            <Paper className="paper" elevation={3}>
                <h1>
                    SIGN UP
                </h1>
                <br />
                <div className="imageUploadDiv">
                    <label for="signedUpUserDp">
                        <Avatar src={avatarImgPreview} className="uploadDp" />
                    </label>
                    <input style={{ display: 'none', visibility: 'none' }} type="file" accept='image/*'
                        onChange={(e) => {
                            let file = e.target.files[0];
                            if (file && file.type.substr(0, 5) === "image") {
                                console.log('image found')
                                setSelectedImg(file)
                            }
                            else {
                                setSelectedImg(null)
                            }
                        }} required
                        id="signedUpUserDp" />
                    <br />
                    <div className='dpTxtWrapp'>
                        <p style={userAvatarStyles} className='avatarText'>
                            {userAvatarTxt}
                        </p>
                    </div>
                </div>
                <br />
                <label className="paper__label">
                    <p className="paper__labelText">USERNAME: </p>
                    <input className="paper__input" type="text" value={username} onChange={(e) => { setUserName(e.target.value) }} />
                </label>
                <label className="paper__label">
                    <p className="paper__labelText">EMAIL: </p>
                    <input className="paper__input" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </label>
                <label className="paper__label">
                    <p className="paper__labelText">PASSWORD: </p>
                    <input className="paper__input" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </label>
                <br /><br />
                    <p>
                        Already Have An Account? <Link to="./signin"> Sign In</Link>
                    </p>
                    <br/>
                    <p style={dpError1}>
                        {emailError}
                    </p>
                    <br/>
                <Button onClick={signUpBtnClicked} className="signup__btn" variant="outlined">SIGN UP</Button>
            </Paper>
        </div>
    )
}

export default SignUp
