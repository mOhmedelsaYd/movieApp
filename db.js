const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/local', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('mongoose connect successfully'))
    .catch((err) => {
        console.error(err);
        process.exit(1);
})