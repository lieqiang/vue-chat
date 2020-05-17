const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://127.0.0.1:27017/wechat', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, res) {
  // console.log('dberr', err)
  // console.log(res)
})
mongoose.Promise = global.Promise
module.exports = mongoose
