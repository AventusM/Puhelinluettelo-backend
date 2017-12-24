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