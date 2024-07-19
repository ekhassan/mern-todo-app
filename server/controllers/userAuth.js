const User = require("../models/user")
const { hash, genSalt, compare } = require("bcryptjs")
const { sign } = require("jsonwebtoken")


const controlSignin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "User not found" })
        }
        const isMatch = await compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ error: "Password is incorrect" })
        }
        const token = sign({ id: user.id }, process.env.JWT_SECRET)
        res.status(200).json({ token, success: "Signin successfully!" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error", err })
    }

}
const controlSignup = async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" })
    }
    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ error: "User already exists" })
        }
        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)
        const newUser = await User.create({ username, email, password: hashedPassword })

        res.status(201).json({ success: "Signup successfully!", user: newUser })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error", err })
    }
}
const controlGetUser = async (req, res) => {
    return res.status(200).json({ user: req.user })
}
module.exports = {
    controlSignin,
    controlSignup,
    controlGetUser
}