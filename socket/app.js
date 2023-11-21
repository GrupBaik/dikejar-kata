
const express= require('express')
const socketIo = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 3001;
const app = express()
const server = http.createServer(app);
const axios = require('axios')

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
}); //in case server and client run on different urls

// module.exports = io


const dataPlayer = []


io.on("connection", (socket) => {
  console.log("client connected: ", socket.id);

  socket.on('CLIENT_JOIN', async(params) => {
    const {gameId, access_token} = params
    console.log(gameId, access_token);

    // check ke db apakah sudah pernah join sebelumnya
    try {
        const {data}= await axios.get("http://localhost:3000/games/" + gameId, {
            headers: {
                authorization: "Bearer " + access_token
            }
        })

        socket.join(gameId);
        io.to(gameId).emit('SERVER_JOINED',data);


        } catch (error) {
            // room penuh
            console.log(error);
        }

    })
    socket.on('CLIENT_START', async(params) =>{
        const {gameId, access_token} = params
        console.log(gameId, access_token, "<<<<<client start");
        try {
            const {data}= await axios.get(`http://localhost:3000/games/${gameId}/start`, {
                headers: {
                    Authorization: "Bearer " + access_token
                }
            })
            console.log(data);
            socket.join(gameId);
            io.to(gameId).emit('SERVER_STARTED',data);
        } catch (error) {
            console.log(error);
        }
    })

    socket.join(gameId);


  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
});

app.io = io

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
