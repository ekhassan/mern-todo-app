const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Please login" });
    }

    const token = authHeader.split(" ")[1];


    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id }).select("-password");
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = authMiddleware;
