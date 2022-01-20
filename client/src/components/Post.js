import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useState,useEffect} from "react"

export default function Post({images,user,socket}) {
    const PF = process.env.REACT_APP_ASSETS_FOLDER
    const [isLiked, setIsLiked] = useState(null)

    const handleClick = (i,username) => {
        if(isLiked === i) {
            setIsLiked(null)
        } else {
            setIsLiked(i)
            socket.emit("sendNotifi", {sender:user,receiver:username})
        }
    }

    return (
        <>
            {
                images?.map(image => image.postImg?.map(i => (
                    <div className="post">
                        <div className="postTop">
                            <span className="userName">{image.username}</span>
                        </div>
                        <div className="postCenter">
                            <img className="postImg" src={PF + i} alt="" crossOrigin='anonymous'/>
                        </div>
                        <div className="postBottom">
                            <FavoriteIcon className={isLiked === i? "likeIcon active" : "likeIcon"} onClick={()=>handleClick(i,image.username)}/>
                        </div>
                    </div>
                )))
            }
        </>
    )
}
