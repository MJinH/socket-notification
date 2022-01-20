import React from 'react'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import {useState,useEffect} from "react"
import axios from "axios"
import Post from './Post';

export default function Share({user,socket}) {

    const [file, setFile] = useState(null)
    const [images,setImages] = useState(null)
    const [isUpdated,setIsUpdated] = useState(false)

    useEffect(() => {
        const getImges = async () => {
            try{
                const img = await axios.get("/post")
                setImages(img.data)
            } catch(err) {
                console.log(err)
            }
        }
        getImges()
    },[isUpdated])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(file) {
            const imgData = {
                username:user,
                postImg:file.name
            }
            const fileData = new FormData()
            const fileName = file.name
            fileData.append("name", fileName)
            fileData.append("file", file)
            try {
                await axios.post("/upload", fileData)
            } catch (err) {
                console.log(err)
            }
            try {
                await axios.post("/post",imgData)
                setIsUpdated(!isUpdated)
            } catch (err) {
                console.log(err)
            } 
            setFile(null)
        }
    }


    return (
        <>
            <div className="share">
                <form action="" className="sharePost" onSubmit={handleSubmit}>
                    <span className="shareText">Share photo with others</span>
                    <label htmlFor="file" className="shareOption">
                    <PermMediaIcon className="mediaIcon"/>
                    <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    </label>
                    <button className="shareButotn">Upload</button>
                </form>
            </div>
            {
                file ?  ( 
                    <div className="showImg">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                    </div>
                ) : (
                        <div className="postContainer">
                            <Post
                                images={images}
                                user={user}
                                socket={socket}
                            />
                        </div>
                )
            }
        </>
    )
}
