import {Server} from "socket.io"


const io = new Server({
    cors: {
        origin: "http://localhost:3000",
    }
})

let users = []

const addUsers = (username,socketId) => {
    !users.some((user) => user.username === username) && users.push({username,socketId})
}

const getUser = (username) => {
    return users.find((user) => user.username === username)
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

io.on("connection", (socket) => {
    socket.on("addUser", (username) => {
        addUsers(username,socket.id)
    })

    socket.on("sendNotifi", ({sender,receiver}) => {
        if(sender !== receiver) {
            const user = getUser(receiver)
            io.to(user.socketId).emit("getNotifi", {
                sender
            })
        }
    })

    socket.on("disconnect", () => {
        removeUser(socket.id)
    })
})


io.listen(5000)