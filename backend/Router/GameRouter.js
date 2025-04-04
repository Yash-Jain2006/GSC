const express = require('express');
const GameModel = require('../Models/GameDB');
const Router = express.Router();

Router.post('/', async (req, res) => {
    const { username, email, gamepoints } = req.body;

    if (!username || !email || gamepoints === undefined) {
        console.log("username, email or gamepoints not found");
        return res.status(400).json({
            message: "Please provide username, email, and gamepoints"
        });
    }

    try {
        const newPoints = new GameModel({ 
            username, 
            email, 
            points: gamepoints,
            lastUpdated: new Date()
        });
        await newPoints.save();
        res.status(201).json(newPoints);
    } catch (err) {
        console.log("Error saving points", err);
        res.status(500).json({
            message: "Error saving points"
        });
    }
});

Router.get('/get', async (req, res) => {
    try {
        const points = await GameModel.find().sort({ lastUpdated: -1 }); // Sort by lastUpdated
        res.status(200).json(points);
    } catch (error) {
        console.error('Error fetching points:', error);
        res.status(500).json({ error: 'Failed to fetch points' });
    }
});

module.exports = Router;