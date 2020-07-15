const Todos = require('../models/Todos');
const { post } = require('.');
const todos = require('express').Router()
    .get('/', async (req, res) => {
        try {
           let td = await Todos.find();
           res.json(td) 
        } catch (err) {
            console.log({ message: err})
        }
    })
    .post('/', (req, res) => {
        console.log("BODY: ", req.body)
        Todos({
            title: req.body.title
        }).save()
        .then(data => {
            data.id = data._id
            res.json(data);
        })
        .catch(err => {
            console.log(err)
        })

    })
    .delete('/:todoId', async (req, res) => {
        console.log(req.params.todoId)
        try {
            const removePost = await Todos.remove({ _id: req.params.todoId })
            res.json(removePost)
        } catch (error) {
            res.status(400).json({ message: error})
        }
    })
    .put('/:postId/complete', async (req, res) => {
        try {
           const updateTodo = await Todos.updateOne({ _id: req.params.postId }, {
               $set: {
                   completed: !req.body.completed
               }
           }) 
           console.log(`POST ${req.params.postId}:`, !req.body.completed)
           res.json({ completed: !req.body.completed })
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: error })
        }
    })
module.exports = todos;