require('dotenv').config()
const app = require('./src/app.js')
const { createServer } = require("http");
const { Server } = require('socket.io');
const generateResponse = require("./src/service/ai.service.js");
const { aiResponceOpenRouter } = require('./src/service/openRuter.service.js');
// imported function of geminiAPI



const httpServer = createServer(app)
// http+socket.io server 
const io = new Server(httpServer,{
    cors:{
        origin:"http://localhost:5173",
    }
})
const chatHistory = [
   
]
io.on('connection', (socket) => {
    console.log("A User Connected")

    socket.on('disconnect', (socket) => {
        console.log("A User Has been disconnected ")
    })

    // custum Event to handle Prompt and GEminiAPI Respoce
    socket.on('ai-message', async (data) => {
        console.log("Ai Message Recived:", data)
        chatHistory.push({
            role: "user",
            content:  data 
        })
        const myReponse = await aiResponceOpenRouter(chatHistory)
        
         chatHistory.push({
            role: "assistant",
            content:  myReponse 
        })
        console.log('response fromm server', myReponse)
        console.log("Chat History",chatHistory)
        socket.emit('ai-message-response', {AiResponce :myReponse})
    })
})


httpServer.listen(3000, () => {
    console.log("server is running on the port number 3000")
})