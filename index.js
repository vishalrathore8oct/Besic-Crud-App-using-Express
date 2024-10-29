import 'dotenv/config'
import express from "express";


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// add the id automaticly
let nextId = 3 

// predifined a user data
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

// to show home page
app.get("/", (req, res) => {
    res.status(200).send(`<h1>Hello This is our Home Page of Basic Crud App using Express!</h1>`)
})

// to show all users data
app.get("/api/getUsers", (req, res) => {
    res.status(200).send(userData)
})


// to show a user data by id 

app.get("/api/getUser/:id", (req, res) => {
    const paraId = parseInt(req.params.id)

    const userOutput = userData.find(target => target.id === paraId)

    if (!userOutput) {
        return res.status(404).send("User Data Not Found")
    }

    res.status(200).send(userOutput)
})


// to add a new user in all Users data

app.post("/api/addUser", (req, res) => {
    const { name, email, salary } = req.body
    const newData = {
        id: nextId++,
        name,
        email,
        salary
    }
    userData.push(newData)
    res.status(201).send(newData)
})


// to update a existing user by id 

app.put("/api/updateUser/:id", (req, res) => {
    const paraId = parseInt(req.params.id)
    
    const userOutput = userData.find(target => target.id === paraId)

    if (!userOutput) {
        return res.status(404).send("User Data Not Found")
    }

    const {name, email, salary} = req.body

    userOutput.name = name
    userOutput.email = email
    userOutput.salary = salary
    
    res.status(200).send(userOutput)

})

// to delete a existing user by id

app.delete("/api/deleteUser/:id", (req, res) => {
    const paraId = parseInt(req.params.id)

    const indexofOutput = userData.findIndex(target => target.id === paraId)

    if (indexofOutput === -1) {
        return res.status(404).send("User Not Found")
    }

    userData.splice(indexofOutput, 1)
    res.status(200).send("Deleted Succesfully...")

})

app.listen(PORT, () => {
    console.log(`Your Server is Runnig on Port http://localhost:${PORT}`);

})