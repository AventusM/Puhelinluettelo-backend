const mongoose = require('mongoose')
//Urli pitäisi piilottaa, tapahtuu varmaan lopuksi
//Jokatapauksessa allaoleva user / pw combo vaihdetaan...
const url = 'mongodb://ati:test@ds163796.mlab.com:63796/heroku_kk5s25mk'

mongoose.connect(url, { useMongoClient: true });
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

//Noden moduulien exporttausmäärittelytapa
//vrt ES6 osassa 2
module.exports = Person