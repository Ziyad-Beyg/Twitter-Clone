import React from 'react'
import "./Post.css"
import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';
import PostStatus from './PostStatus';
function Post({userName,userID, postDescription, postImg, dpLink}) {
    return (
        <div className="post">
            <div className="postCol1">
                <div className="postAvatar">
                    <Avatar className="widthandHeight" src={dpLink}/>
                </div>
            </div>
            <div className="postCol2">
                <div className="postHeaderText">
                            <h3>
                                @__{userName}{' '}
                                <span>
                                    <VerifiedIcon className="postBadge"/>
                                </span>
                            </h3>
                            <h5 className="userUIDPost">
                                UID__{userID}
                            </h5>
                </div>
            <div className="postBody">
                    <div className="postBodyDescription">
                        <p>
                            {postDescription}
                        </p>
                    </div>
                    {
                        postImg ? <div className="postImageDiv">
                        <img className="postImage" src={postImg} />
                        </div> : null

                    }
                    
            </div>
            <div>
                <PostStatus/>
            </div>
            </div>
        </div>
    )
}

export default Post
