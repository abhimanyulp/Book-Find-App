const express = require("express");
const bookRouter = express.Router();
const { BookModel } = require("../models/book.model")


//Get Books Data
bookRouter.get("/getall", async (req,res) => {
    try {
        const books = await BookModel.find()
        res.status(200).send({msg:"Data Retrived!", data: books})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

//Post Book
bookRouter.post("/post", async (req,res) => {
    try {
        const book = new BookModel(req.body)
        await book.save()
        res.status(200).send({msg:"Book has been added!"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

//Delete Book
bookRouter.delete("/delete/:id", async (req,res) => {
    const { id } = req.params
    console.log(id)
    try {
        await BookModel.findByIdAndDelete({_id:id})
        res.status(200).send({msg:"Book has been Deleted!"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


//Filter by genre
bookRouter.get("/genre/:genre", async (req,res) => {
    const { genre } = req.params
    console.log("test")
    try {
        const books = await BookModel.find({genre})
        res.status(200).send({msg:"Data Retrived!", data: books})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports = { bookRouter }