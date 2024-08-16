const express = require("express")
const path = require("path")
const {createServer} = require("http")
const {Server} = require("socket.io")

const app = express()
const server = createServer(app)
const io = new Server(server)

io.on('connection',(socket) => {
    socket.on('teste',(obj) => {
        console.log(obj)
    })
    console.log("Usuario Conectado!")
})

app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,`../pages/index.html`))
})

app.get("/:rota",(req,res) => {
    const {rota} = req.params
    const itemParts = rota.split(".")
    const archiveType = ['js','css']
    let isArchive = false
    archiveType.forEach(type => {
        if(type == itemParts[1]){
            isArchive = true
        }
    })

    if(isArchive){
        try {
            res.sendFile(path.join(__dirname, `../pages/${itemParts[0]}.${itemParts[1]}`))
        } catch (error) {
            res.sendFile({archive : 'not found'})
        }
    }else{
        res.sendFile(path.join(__dirname, `../pages/${itemParts[0]}/index.html`))
    }
})

server.listen(3000,() => {
    console.log('Server Aberto!')
})
