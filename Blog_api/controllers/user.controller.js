const Usermodel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secret = process.env.SECRET_KEY;
exports.register = async (req, res) => {
const { username, password } = req.body;
if (!username || !password) {
    return;
    res.status(400).json({ message: "Username and password are required" });
    
}
const existingUser = await Usermodel.findOne( {username} );
if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
    
}

try {
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = bcrypt.hashSync(password, salt);
 const user = await Usermodel.create({ username, password: hashedPassword });
 res.send({ message: "User registered successfully" });
} catch (error) {
 res.status(500).send({ message:  error.message });
}

exports.login = async (req, res) => {

}