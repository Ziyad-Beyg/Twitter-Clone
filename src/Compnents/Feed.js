import React,{useContext} from 'react'
import { GlobalContext } from '../Context/ContextAPI'
import "./Feed.css"
import Post from './Post'
import TweetBox from './TweetBox'

function Feed() {
    let {state, dispatch} = useContext(GlobalContext)
    return (
        <div className="feed">
            <div className="feedHeader">
                <h3>
                    HOME
                </h3>
            </div>
            <TweetBox/>
        </div>
    )
}

export default Feed
