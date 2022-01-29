import React from 'react'
import "./SideBar.css"
function SideBar({active, text, Icon}) {
    return (
        <div className={`sideBar  ${active && "sideBar--active"}`}>
            <Icon/>
            <h4>{text}</h4>
        </div>
    )
}

export default SideBar
