import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// create book into database
router.post('/', async (request, response) => {
    try{
        if(!request.body.title || !request.body.author  || !request.body.publishedYear){
            return response.status(400).send({message: 'Required fields are missing'});
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishedYear: request.body.publishedYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);

    }catch(error){
        return response.status(500).send({message: error.message});
    }

});

//get all books from database
router.get('/', async (request, response) => {
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    }catch(error){
        return response.status(500).send({message: error.message});
    }
});

//get book by id
router.get('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    }catch(error){
        return response.status(500).send({message: error.message});
    }
});

//update book 
router.put('/:id', async (request, response) => {
    try{
        if(!request.body.title || !request.body.author  || !request.body.publishedYear){
            return response.status(400).send({message: 'Required fields are missing'});
        }

        const { id } = request.params;
        const  result = await Book.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).send({message: 'Book Not Found'});
        }
        return response.status(200).send({message: 'Book Updated Successfully'});
    }catch(error){
        return response.status(500).send({message: error.message});
    }
});

//delete book
router.delete('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const  result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).send({message: 'Book Not Found'});
        }
        return response.status(200).send({message: 'Book Deleted Successfully'});
    }catch(error){
        return response.status(500).send({message: error.message});
    }
});

export default router;