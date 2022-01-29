import React, { useState, useContext, useEffect } from 'react'
import "./TweetBox.css"
import Post from './Post';
import Avatar from '@mui/material/Avatar';
import { GlobalContext } from '../Context/ContextAPI';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GifOutlinedIcon from '@mui/icons-material/GifOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { query, doc,  onSnapshot, getDocs, db, collection, addDoc,orderBy, storage, ref, uploadBytes, getDownloadURL, where } from "../Configs/firebase"
// import { data } from '../Context/Reducer';
// import { orderBy } from '@firebase/firestore';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    color: '#fff',
    bgcolor: '#202020',
    border: '5px solid var(--twitter-color)',
    textTransform: 'capitalize',
    boxShadow: 24,
    p: 6,
};

function TweetBox() {
    let [tweets, setTweets] = useState([])
    let [tweetCounter, setTweetCounter] = useState(1)
    let [tweetBoxInput, setTweetBoxInput] = useState('')
    let [tweetBoxImgName, setTweetBoxImgName] = useState()
    let [selectedImg, setSelectedImg] = useState()
    let [ClearBtn, setClearBtn] = useState()
    let [errorTxt, setErrorTxt] = useState("enter some text for tweet")
    let [open, setOpen] = useState(false);
    let [datas, setData] = useState()
    let [dataGetted, setDataGetted] = useState([]);
    let [dataGetted2, setDataGetted2] = useState([]);
    // let [arrayIndexesUID, setArrayIndexesUID] = useState([]);
    // let [arrayIndexesUserInfo, setArrayIndexesUserInfo] = useState([]);

    let { state, dispatch } = useContext(GlobalContext)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        // db.collection('TWEETS').
            let q = query(collection(db, "TWEETS"), orderBy("counter"));
            onSnapshot(q, snapshot => (
            setTweets(snapshot.docs.map( doc => doc.data()))
        ))
    }, [])

    // useEffect(() => {
    //     console.log(tweets, state.currentUser);
    // }, [tweets])

    // console.log(state?.currentUser?.userDP)

    let clearImgName = () => {
        setTweetBoxImgName('')
        setClearBtn(null)
    }

    let addTweetWithImg = async (days, months, years, time, url, userName, userDP, userID) => {
        let dataRef = collection(db, "TWEETS")
        await addDoc(dataRef, {
            userID: state?.currentUser?.userID,
            tweet: tweetBoxInput,
            tweetImgUrl: url,
            date: `${days}/${months}/${years}`,
            time, 
            userName,
            userDP,
            counter: tweetCounter,
            userID
        })

        setTweetCounter(tweetCounter + 1)

    }

    let addTweetWithTxt = async (days, months, years, time, userName, userDP, userID) => {
        let dataRef = collection(db, "TWEETS")
        await addDoc(dataRef, {
            userID: state?.currentUser?.userID,
            tweet: tweetBoxInput,
            date: `${days}/${months}/${years}`,
            time, 
            userName, 
            userDP,
            counter: tweetCounter,
            userID
        })

        setTweetCounter(tweetCounter + 1)

    }

    let tweetAuthorInfo = async () => {
        // const querySnapshot = await getDocs(collection(db, "TWEETS"));
        // querySnapshot.forEach((doc) => {

        //     let dataGettedClone = dataGetted1.slice(0)
        //     dataGettedClone.push(doc.data())
        //     setDataGetted1(dataGettedClone)
        console.log(state.currentUser.userID)
    }

    let getCurrentTweets = async () => {

        // const querySnapshot = await getDocs(collection(db, "TWEETS"));
        // querySnapshot.forEach( async(doc) => {

        //     let dataGettedClone = dataGetted1.slice(0)
        //     dataGettedClone.push(doc.data())
        //     setDataGetted1(dataGettedClone)
        //     // await tweetAuthorInfo()
        //     // dispatch({type: "ALL_POST", payload: doc.data()})
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data(), dataGetted1, );
        // });

        // const q = query(collection(db, "TWEETS"));
        // onSnapshot(q, (snapshot)=>{
        //     setData(snapshot.docs.map((doc)=>({...doc.data(),id: doc.id})))
        //   console.log(datas)
        // }
        // )


        let realTimeDataClone = dataGetted2.slice(0)
        const q = query(collection(db, "TWEETS"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    console.log("New Tweet: ", change.doc.data());
                    setData(change.doc.data())
                    realTimeDataClone.push(change.doc.data())
                }
            })
            console.log(realTimeDataClone)
            setDataGetted2(realTimeDataClone)
            getUsersInfo(realTimeDataClone)
            
        })

                // console.log(datas)
    }

    let getUsersInfo = (tweetInfo) => {

        let arrayIndexesUID = []
        let arrayIndexesUserInfo = [2,2,2]

        console.log(tweetInfo)

        tweetInfo.map((arrayValues)=>{ 
            if(arrayIndexesUID.includes(arrayValues.userID) == false){
                arrayIndexesUID.push(arrayValues.userID)
                console.log(arrayValues.userID)
            }

        })

        arrayIndexesUID.map((arrayValues) => {

        const q = query(doc(db, "Signed__Up__Users", arrayValues));
        const unsub = onSnapshot(q, (doc) => {
        console.log(doc.data());
        if(arrayIndexesUserInfo.includes(doc.id) == false){
            arrayIndexesUserInfo.push(doc.data())
        }

        });

        })

        bindingUserInfo(arrayIndexesUID, arrayIndexesUserInfo, tweetInfo)

        console.log(arrayIndexesUID)
        console.log(arrayIndexesUserInfo)

        




    }

    // useEffect(() => {

        

    //     console.log(arrayIndexesUserInfo)
        
    // }, [arrayIndexesUID])

    let bindingUserInfo = (arrayIndexesUID, arrayIndexesUserInfo, tweetInfo) => {
        let bindingUserArray = []
        arrayIndexesUserInfo.map((arrayValues1) => {
            
                    console.log(arrayValues1)
        })
    }

    // useEffect(() => {
    //             let dataGettedClone = dataGetted.slice(0)
    //             dataGettedClone.push(datas)
    //             setDataGetted(dataGettedClone)
    //             console.log(dataGetted, dataGetted.length)
    //         }, [datas])



    let uploadTweet = async () => {
                if (tweetBoxInput == '') {
                    handleOpen()
                }
                else {
                    const dater = new Date()
                    let days = dater.getDate()
                    let months = dater.getMonth()
                    months = parseInt(months) + 1
                    let years = dater.getFullYear()
                    let time = dater.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })

                    if (tweetBoxImgName == null) {
                        console.log("IMAGE IS NOT SELECTED")

                        addTweetWithTxt(days, months, years, time, state.currentUser.username, state.currentUser.userDP, state.currentUser.userID)

                    }
                    else {
                        console.log("IMAGE IS SELECTED")

                        let imageRef = ref(storage, `images/postImages/UID_${Math.random().toString(36).substr(2,11)}`)

                        uploadBytes(imageRef, selectedImg).then(async (snapshot) => {
                            console.log('Uploaded a blob or file!');
                            await getDownloadURL(imageRef)
                                .then((url) => {

                                    addTweetWithImg(days, months, years, time, url, state.currentUser.username, state.currentUser.userDP, state.currentUser.userID)

                                })
                        });




                    }

                    getCurrentTweets()

                    // setTimeout(() => {
                    //     getCurrentTweets()
                    // }, 2000);


                }


                setTweetBoxInput('')
                setTweetBoxImgName()
                // setSelectedImg()
                setClearBtn()
                // setTweetBoxObj()
            }




    return (
                <div className="tweetBox">
                    <form>
                        <div className="tweetBoxInputs">
                            <Avatar alt="Logged In User" className='avatarImage' src={state?.currentUser?.userDP} />
                            <input type="text" placeholder="What's Happening???" value={tweetBoxInput} onChange={((e) => { setTweetBoxInput(e.target.value) })} />
                        </div>
                        <div className="tweetBoxImgdiv">
                            <label for="tweetBoxImg" className="tweetBoxImgLabel1">
                                <ImageOutlinedIcon className='tweetBoxIcon cursor' />
                            </label>
                            <label className="tweetBoxImgLabel2">
                                <GifOutlinedIcon className='tweetBoxIcon2' />
                                <PollOutlinedIcon className="tweetBoxIcon" />
                                <EmojiEmotionsOutlinedIcon className="tweetBoxIcon" />
                                <EventOutlinedIcon className="tweetBoxIcon" />
                                <InsertLinkOutlinedIcon className="tweetBoxIcon" />
                            </label>
                        </div>
                        <input style={{ display: 'none', visibility: 'none' }} type="text" required />

                        <input style={{ display: 'none', visibility: 'none' }} type="file" accept='image/*'
                            onChange={(e) => {
                                let file = e.target.files[0];
                                if (file && file.type.substr(0, 5) === "image") {
                                    console.log('image found', file.name)
                                    setTweetBoxImgName(file.name)
                                    setClearBtn(<ClearSharpIcon className="clearBtn" onClick={clearImgName} />)
                                    setSelectedImg(file)
                                }
                                else {
                                    setSelectedImg(null)
                                }
                            }}
                            id="tweetBoxImg" />
                        <p className="tweetBoxImgName">
                            <i>
                                {tweetBoxImgName}
                            </i>
                            {ClearBtn}
                        </p>
                        <div className="tweetbtnDiv">
                            <button className="tweetBtn" onClick={uploadTweet}>
                                T W E E T
                            </button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        {errorTxt}
                                    </Typography>
                                </Box>
                            </Modal>
                        </div>
                    </form>

                    {
                        tweets.map(tweet => (
                            <Post dpLink={tweet.userDP} userID={tweet.userID.substr(0,6)} postDescription={tweet.tweet} postImg={tweet.tweetImgUrl} userName={tweet.userName}/>
                        ))
                    }

                    {/* {
                dataGetted.map((arrayValues, index)=>{
                    return(
                        <div key={index}>
                            {
                                arrayValues.tweetImgUrl ? <Post dpLink={arrayValues} postDescription={arrayValues.tweet} postImg={arrayValues.tweetImgUrl} userName={arrayValues.userName}/> :
                                <Post dpLink={dpLink} postDescription={postDescription} postImg={null} userName={userName}/>
                            }
                        </div>
                    )
                })
            } */}

                </div>
            )
        }
    

export default TweetBox
