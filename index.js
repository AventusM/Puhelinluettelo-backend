//ASETUKSET
const express = require('express')
const app = express()
const bodyParser = require('body-parser') // req body ---> json (varmistetaan POSTin oikeellisuutta)
const morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3001

//Tietokannan hallinta siirretty omaan moduuliin
const Person = require('./models/person')


//Backend tarjoaa staattiset tiedostot
app.use(express.static('build'))
app.listen(PORT)
app.use(bodyParser.json())
app.use(morgan(':method :url :jsonbody :status :res[content-length] - :response-time ms'))
app.use(cors()) //samanaikaiset npm startit toimii nyt
console.log(`Server running on port ${PORT}`)

//Middleware - logger. Haetaan data HTTP-pyynnön jälkeen
morgan.token('jsonbody', function getJSONBody(req, res) {
    return JSON.stringify(req.body)
})


//Muokataan JSON-data sopivaan muotoon mapattavaksi
const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

//GET
//GET
app.get('/api/persons', (req, res) => {
    Person
        .find({}) //Select * (ei rajoituksia koska vähän kenttiä)
        .then(allPersons => {
            // console.log(allPersons)
            //Mapataan saatu taulukko alkio alkiolta Person - olioksi
            res.json(allPersons.map(formatPerson))
        }).catch((err => {
            console.log(err)
            res.status(404).end()
        }))
})

// MUISTA PÄIVITTÄÄ TÄMÄKIN
// MUISTA PÄIVITTÄÄ TÄMÄKIN
// MUISTA PÄIVITTÄÄ TÄMÄKIN
// MUISTA PÄIVITTÄÄ TÄMÄKIN
// MUISTA PÄIVITTÄÄ TÄMÄKIN
// MUISTA PÄIVITTÄÄ TÄMÄKIN
// MUISTA PÄIVITTÄÄ TÄMÄKIN
// MUISTA PÄIVITTÄÄ TÄMÄKIN
app.get('/info', (req, res) => {
    res.send(`
    <p>puhelinluettelossa ${persons.length} henkilöä</p>
    <p>${new Date()}</p>
    `)
})

app.get('/api/persons/:id', (req, res) => {
    Person
        .findById(req.params.id)
        .then(foundPerson => {
            res.json(formatPerson(foundPerson))
        }).catch(err => {
            console.log(err)
            res.status(404).send('<h2>404 not found</h2>').end()
        })
    // const personId = Number(req.params.id)
    // const person = persons.find(person => person.id === personId)
    // //laitetaan 404 jos ei löytynyt
    // if (person) {
    //     res.json(person)
    // } else {
    //     res.status(404).send('<h1>404 not found</h1>').end()
    // }

})

//DELETE
//DELETE
app.delete('/api/persons/:id', (req, res) => {
    Person
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        }).catch(err => {
            console.log(err)
        })
    // const personId = Number(req.params.id)
    // persons = persons.filter(person => person.id !== personId)
    // res.status(404).end()
})

//POST
//POST
app.post('/api/persons', (req, res) => {
    const body = req.body
    if (body.name === "" || body.name === undefined || body.number === "" || body.number === undefined) {
        res.status(400).json({ error: 'nimi tai numero puuttuu' })
    } else if (persons.some(person => person.name === body.name)) {
        //409 conflict
        res.status(409).json({ error: 'nimen tulee olla yksikäsitteinen' })
    } else {

        //Tietokanta luo nyt ID:n
        const person = new Person({
            name: body.name,
            number: body.number
        })

        person //HUOM pienellä, koska const person = new Person ...
            .save()
            .then(newPerson => {
                res.json(formatPerson(newPerson))
            })
    }
})

//MUUTTUJAT
let persons = [
    {
        name: "Anton Moroz",
        number: "050-999999",
        id: 1
    },
    {
        name: "Geir Siirde",
        number: "050-000000",
        id: 2
    },
    {
        name: "Niko Haapis",
        number: "050-111111",
        id: 3
    },
    {
        name: "Ravel Siirde",
        number: "050-555555",
        id: 4
    }
]

//Testit persons - muuttujan alle, muuten tulee x is not defined
//console.log("pituus...")
//console.log(persons.length)