import 'dotenv/config'
import express from "express";


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

const userData = [
    {
        id: 1,
        name: "Vishal Rathore",
        email: "vishal.rathore@example.com",
        salary: 50000
    }, 
    {
        id: 2,
        name: "Deepak Rajput",
        email: "deepak.rajput@example.com",
        salary: 75000
    }
]


app.get("/", (req, res) => {
    res.send(`<h1>Hello This is our Home Page of Basic Crud App using Express!</h1>`)
})

app.get("/api/getUsers", (req, res) => {
    res.send(userData)
})

app.get("/api/getUser/:id", (req, res) => {
    const paraId = parseInt(req.params.id)

    const paraOutput = userData.find(target => target.id === paraId)

    res.send(paraOutput)
})

app.post("/api/addUser", (req, res) => {
    const bodyData = req.body
    userData.push(bodyData)
    res.send(bodyData)

})


app.put("/api/updateUser/:id", (req, res) => {
    const paraId = parseInt(req.params.id)
    const bodyData = req.body

    const paraOutput = userData.find(target => target.id === paraId)
    const indexofParaoutput = userData.indexOf(paraOutput)
    userData[indexofParaoutput] = bodyData
    res.send(bodyData)

})

app.delete("/api/deleteUser/:id", (req, res) => {
    const paraId = parseInt(req.params.id)
    const bodyData = req.body

    const paraOutput = userData.find(target => target.id === paraId)
    const indexofParaoutput = userData.indexOf(paraOutput)
    userData.splice(indexofParaoutput, 1)
    res.send("Deleted Succesfully...")

})

app.listen(PORT, () => {
    console.log(`Your Server is Runnig on Port http://localhost:${PORT}`);
    
})