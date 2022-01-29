import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SideBar from '../Compnents/SideBar';
import Button from '@mui/material/Button';
import "./LeftSideBar.css";
import {Link} from "react-router-dom";

function LeftSideBar() {
        
    return (
        <div className="leftSideBar">
            <TwitterIcon className="leftSideBarTwitterIcon"/>

            <SideBar active text="HOME" Icon={HomeIcon}/>
            {/* <Link className="myTweetsLink" to ="/myTweets"> */}
                <SideBar text="MY TWEETS" Icon={SendRoundedIcon}/>
            {/* </Link> */}
            <SideBar text="EXPLORE" Icon={SearchOutlinedIcon}/>
            <SideBar text="NOTIFICATIONS" Icon={NotificationsNoneRoundedIcon}/>
            <SideBar text="MESSAGES" Icon={MailOutlineRoundedIcon}/>
            <SideBar text="BOOKMARK" Icon={BookmarkBorderRoundedIcon}/>
            <SideBar text="LISTS" Icon={ListAltRoundedIcon}/>
            <SideBar text="PROFILE" Icon={PersonOutlineRoundedIcon}/>
            <SideBar text="MORE" Icon={MoreHorizIcon}/>
            <Button variant="outline" className="leftSideBarBtn" fullWidth>TWEET</Button>
        </div>
    )
}

export default LeftSideBar
