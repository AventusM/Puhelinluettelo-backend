//ASETUKSET
const express = require('express')
const app = express()
const bodyParser = require('body-parser') // req body ---> json (varmistetaan POSTin oikeellisuutta)
const morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3001

app.listen(PORT)
app.use(bodyParser.json())
app.use(morgan(':method :url :jsonbody :status :res[content-length] - :response-time ms'))
//Laitetaan toinen npm start localhostiin 3000 (puhelinluettelon frontend)
//-> POST toimii OPTIONSin sijasta
app.use(cors())
console.log(`Server running on port ${PORT}`)

//Middleware - logger. Haetaan data HTTP-pyynnön jälkeen
morgan.token('jsonbody', function getJSONBody(req, res) {
    return JSON.stringify(req.body)
})

//GET
//GET
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

//Ulkonäkö sovitettu täysin html:lle
//Pituus haetaan tehtävänannon mukaisesti
//muistissa olevasta taulukosta
app.get('/info', (req, res) => {
    res.send(`
    <p>puhelinluettelossa ${persons.length} henkilöä</p>
    <p>${new Date()}</p>
    `)
})

app.get('/api/persons/:id', (req, res) => {
    const personId = Number(req.params.id)
    const person = persons.find(person => person.id === personId)
    //laitetaan 404 jos ei löytynyt
    if (person) {
        res.json(person)
    } else {
        res.status(404).send('<h1>404 not found</h1>').end()
    }

})

//DELETE
//DELETE
app.delete('/api/persons/:id', (req, res) => {
    const personId = Number(req.params.id)
    persons = persons.filter(person => person.id !== personId)
    res.status(404).end()
})

//POST
//POST
app.post('/api/persons', (req, res) => {
    const body = req.body
    // let errors = ["", undefined]
    //Kaikennäköisiä ratkaisuja yritetty tämän iffihässäkän eliminoimiseksi
    //1. indexOf
    //2. bodyContent.filter((content) => errors.includes(content)) tms jokin vastaava stackoverflowsta
    if (body.name === "" || body.name === undefined || body.number === "" || body.number === undefined) {
        res.status(400).json({ error: 'nimi tai numero puuttuu' })
    } else if (persons.some(person => person.name === body.name)) {
        //409 conflict
        res.status(409).json({ error: 'nimen tulee olla yksikäsitteinen' })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 100000)
    }

    persons = persons.concat(person)
    res.json(person)
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