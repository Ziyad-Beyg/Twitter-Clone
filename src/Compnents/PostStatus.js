import React,{useState, useEffect} from 'react'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import LoopTwoToneIcon from '@mui/icons-material/LoopTwoTone';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';

import "./PostStatus.css"

function PostStatus() {

    const [randomComments, setRandomComments] = useState('')
    const [randomRetweets, setRandomRetweets] = useState('')
    const [randomLikes, setRandomLikes] = useState('')

    useEffect(() => {

        setRandomComments(Math.ceil(Math.random()*1000))
        setRandomRetweets(Math.ceil(Math.random()*1000))
        setRandomLikes(Math.ceil(Math.random()*1000))

    }, [])

    


    return (
        <div className="poststatus">
            <div className="comment">
                <ModeCommentOutlinedIcon className="statusIcon"/>
                <p className="statusText">
                    {randomComments}
                </p>
            </div>
            <div className="retweet">
                <LoopTwoToneIcon className="statusIcon"/>
                <p className="statusText">
                    {randomRetweets}
                </p>
            </div>
            <div className="like">
                <FavoriteBorderOutlinedIcon className="statusIcon"/>
                <p className="statusText">
                    {randomLikes}
                </p>
            </div>
            <div className="share">
                <IosShareRoundedIcon className="statusIcon"/>
            </div>
        </div>
    )
}

export default PostStatus
