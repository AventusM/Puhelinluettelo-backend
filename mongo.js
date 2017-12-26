const mongoose = require('mongoose')

//URL PIILOTETTU PALAUTUKSESSA
//URL PIILOTETTU PALAUTUKSESSA
//URL PIILOTETTU PALAUTUKSESSA
const url = ''
//URL PIILOTETTU PALAUTUKSESSA
//URL PIILOTETTU PALAUTUKSESSA
//URL PIILOTETTU PALAUTUKSESSA

mongoose.connect(url, { useMongoClient: true });
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {
    name: String,
    number: String //Toistaiseksi
})

const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
})

// process.argv.forEach((val, index) => {
//     console.log(`${index}: ${val}`);
// });

const noParams = process.argv[2] === undefined || process.argv[2] === undefined
noParams ?
    Person
        .find({}) // name, number parametreillä 'truthy' - tyyliin ei onnistunut...
        .then(result => {
            result.forEach(person => {
                console.log('puhelinluettelo:')
                console.log(person.name + " " + person.number)
            })
            mongoose.connection.close()
        })
    :
    person
        .save()
        .then(res => {
            console.log('lisätään henkilö ' + process.argv[2] + ' numero ' + process.argv[3] + " luetteloon")
            mongoose.connection.close()
        })