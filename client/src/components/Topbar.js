import React from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {useState,useEffect} from "react"

export default function Topbar({user,socket}) {

    const [notifi,setNotifi] = useState([])
    const [checkNotifi,setCheckNotifi] = useState(false)


    const handleClick = () => {
        if(notifi.length > 0 && !checkNotifi ) {
            setCheckNotifi(!checkNotifi)
        } else {
            setNotifi([])
            setCheckNotifi(false)
        }
    }

    const showSender = ({sender}) => {
        return (
            <span className="senderName">{`${sender} liked your Image`}</span>
        )
    }

    useEffect(() => {
        socket.on("getNotifi",(data) => {
            setNotifi((prev) => [...prev,data])
        })
    },[socket])

    return (
        <div className="topbar">
            <div className="topbarLeft">
                <span className="username">{`Welcome ${user}`}</span>
            </div>
            <div className="topbarRight">
                <div className="topbarIcons">
                    <div className="topbarIcon">
                        <NotificationsNoneIcon className="icon" onClick={handleClick}/>
                        {
                            notifi.length > 0 && <div className="notificationLength">{notifi.length}</div>
                        }
                        {
                            checkNotifi && (
                                <div className="notification">
                                    {notifi.map((n)=>showSender(n))}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
