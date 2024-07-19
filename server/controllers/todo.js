const Todo = require("../models/todo");

// Create a new todo
const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTodo = new Todo({
            title,
            description,
            user: req.user._id
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get all todos
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user._id });
        res.status(200).json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get a todo by ID
const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOne({ _id: id, user: req.user._id });
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update a todo by ID
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const todo = await Todo.findOneAndUpdate(
            { _id: id, user: req.user._id },
            { title, description, status },
            { new: true }
        );
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a todo by ID
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
};
