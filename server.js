const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const userRouter = require('./appRouter/user');
const User = require('./models/user');
require('./db');
const port = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// log txt middleware
app.use((req, res, next) => {

    const loginfo = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    
    const Path = path.join(__dirname, 'log.txt');
    
    fs.appendFile(Path, loginfo, (err) => {
    if (err) {
    console.error('Error writing to log file:', err);
    }
});
next();
});

app.use(['/user', '/users'], userRouter);

app.use((err, req, res, next) => {
    console.error(err);
    err.statusCode = err.statusCode || 500;
    const handler = err.statusCode < 500;
    res.status(err.statusCode).send({ message: handler ? err.message : 'something wrong' });
});

app.listen(port, () => {
    console.log(`server start at http://localhost:${port}`);
});

