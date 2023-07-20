const express = require("express")
const cors = require("cors")
require("dotenv").config()
const { connection } = require("./db")
const { bookRouter } = require("./routes/books.route")

const app = express()
app.use(express.json())
app.use(cors())


app.use("/books", bookRouter)

let PORT = process.env.PORT || 8080 

app.listen(PORT, async () => {
    try {
        await connection
        console.log(`Connected to MongoDB, Server Running at Port ${PORT}`)
    } catch (error) {
        console.log("Not able to connect to MongoDB")
        console.log(error)
    }
})