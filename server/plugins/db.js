module.exports = app => {
    const mongoose = require('mongoose');

    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
        useNewUrlParser: true
    });
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'mongodb connection error:'));
    db.once('open', function () {
        console.log('mongodb connection success！');
    });
};