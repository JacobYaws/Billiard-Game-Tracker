const db = require('../config/connection');
const { User, Ball } = require("../models");
const userSeeds = require("./userSeeds.json");
const ballSeeds = require("./ballSeeds.json")

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await User.create(userSeeds);
        await Ball.deleteMany({});
        await Ball.create(ballSeeds)

        console.log('Completed');
        process.exit(0);
    } catch (err) {
        throw err;
    }
})