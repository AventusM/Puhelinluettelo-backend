const mongoose = require('mongoose')

//ASETUS osan3 viimeisen tehtävän tapaan
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url, { useMongoClient: true });
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

//Noden moduulien exporttausmäärittelytapa
//vrt ES6 osassa 2
module.exports = Person