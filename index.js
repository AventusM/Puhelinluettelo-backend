//ASETUKSET
const express = require('express')
const app = express()

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
//GET / POST / DELETE
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

//Ulkonäkö sovitettu täysin html:lle
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
        res.status(404).end()
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