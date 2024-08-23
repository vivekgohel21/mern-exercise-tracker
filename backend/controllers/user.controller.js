const User = require('../models/user.model');

const fetchAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            users: users
        });
    } catch (err) {
        res.status(500).json({
            error: 'Something went wrong while fetching users',
            details: err.message
        });
    }
}

const addUser = async (req, res, next) => {
    try {
        const { username } = req.body;
        const newUser = new User({ username });

        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User added successfully',
            newUser: newUser
        });
    } catch (err) {
        res.status(400).json({
            error: 'Something went wrong while adding the user',
            details: err.message
        });
    }
}

module.exports = { fetchAllUsers, addUser };
