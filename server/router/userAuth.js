const express = require("express")
const router = express.Router()
const { controlSignin, controlSignup, controlGetUser } = require("../controllers/userAuth")
const authMiddleware = require("../middleware/authMiddleware")
const { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } = require("../controllers/todo")

router.post("/signin", controlSignin)
router.post("/signup", controlSignup)

router.get('/get-user', authMiddleware, controlGetUser)

router.post("/create-todo", authMiddleware, createTodo);

// Get all todos
router.get("/get-todo", authMiddleware, getTodos);

// Get a todo by ID
router.get("/get-todo/:id", authMiddleware, getTodoById);

// Update a todo by ID
router.put("/update-todo/:id", authMiddleware, updateTodo);

// Delete a todo by ID
router.delete("/delete-todo/:id", authMiddleware, deleteTodo);

module.exports = router