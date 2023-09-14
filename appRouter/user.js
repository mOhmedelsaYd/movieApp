const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const newUser = new User({
            moviename: req.body.moviename,
            time: req.body.time,
            year: req.body.year,
            rate: req.body.rate
        })
        let users = await newUser.save();
        res.status(200).send(users);
    }
    catch (err) {

            err.statusCode = 422;
            next(err);
    }
})

router.get('/', async (req, res, next) => {
    try {
        let users = await User.find();
        res.status(200).send(users);
    }
    catch (err) {
        err.statusCode = 422;
        next(err);
    }

})

router.patch('/:id', async(req, res, next) => {
    try {
        await User.updateOne({_id : req.params.id}, {moviename : req.body.moviename, time : req.body.time, year: req.body.year, rate: req.body.rate});
        res.status(200).send("updated");
    }
    catch (err) {
        err.statusCode = 422;
        next(err);
    }
})

router.delete('/:id',async (req, res, next) => {
    try {
        await User.deleteOne({_id : req.params.id});
        res.status(200).send("deleted");
    }
    catch (err) {
        err.statusCode = 422;
        next(err);
    }
})

module.exports = router;