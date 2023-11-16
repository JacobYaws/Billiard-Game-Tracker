const db = require('../config/connection');
const { User, Ball, Game } = require("../models");
const userSeeds = require("./userSeeds.json");
const ballSeeds = require("./ballSeeds.json");
const gameSeeds = require("./gameSeeds.json");

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await User.create(userSeeds);
        await Ball.deleteMany({});
        await Ball.create(ballSeeds);
        await Game.deleteMany({});
        await Game.create(gameSeeds);
        console.log('Completed');
        process.exit(0);
    } catch (err) {
        throw err;
    }
})