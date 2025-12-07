require('dotenv').config()
const app = require('./src/app.js')
const { createServer } = require("http");
const { Server } = require('socket.io');
const generateResponse = require("./src/service/ai.service.js")
// imported function of geminiAPI



const httpServer = createServer(app)
// http+socket.io server 
const io = new Server(httpServer)
io.on('connection', (socket) => {
    console.log("A User Connected")

    socket.on('disconnect', (socket) => {
        console.log("A User Has been disconnected ")
    })

     // custum Event to handle Prompt and GEminiAPI Respoce
    socket.on("aiMessage",async (data)=>{
        console.log("Recived AI Prompt:",data.prompt)
        const response = await generateResponse(data.prompt);
        console.log("AI Responce:",response)
        // event to send Response to fronEnd
        socket.emit("ai-message-response",{response})
    })
})


httpServer.listen(3000, () => {
    console.log("server is running on the port number 3000")
})