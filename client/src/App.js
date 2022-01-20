import './App.css';
import {useState,useEffect} from "react"
import Topbar from './components/Topbar';
import Share from './components/Share';
import {io} from "socket.io-client"

function App() {

  const [user,setUser] = useState()
  const [username,setUsername] = useState()
  const [socket,setSocket] = useState(null)

  useEffect(() => {
    setSocket(io("http://localhost:5000"))
  },[])

  useEffect(() => {
    socket?.emit("addUser",user)
  },[socket,user])

  return (
    <div className="App">
      {user ? 
        (
          <>
            <Topbar 
              user={user} 
              socket={socket}
              />
            <div className="container">
              <Share 
                user={user}
                socket={socket}  
                />
            </div>
          </>
        ) 
        : 
        (
          <div className="loginContainer">
            <div className="loginPage">
              <input 
                placeholder='Enter User Name' 
                max='10' 
                className="enterUser" 
                onChange={(e) => setUsername(e.target.value)}  
                />
                <button className="loginButton" onClick={()=> setUser(username)}>Enter</button>
            </div>
          </div>
        )}
    </div>
  );
}

export default App;
