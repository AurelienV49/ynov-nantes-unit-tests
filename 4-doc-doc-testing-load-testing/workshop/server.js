const PORT = process.env.PORT || 5000;
const router = require('./router')

const mongoose = require('mongoose');
const ToDo = require('./toDoModel.js').ToDo;
const DB_URI = 'mongodb://mongo:27017/toDoApp';

mongoose.connect(DB_URI).then(() => {
  console.log('Listening on port: ' + PORT);
  router.listen(PORT);
});
