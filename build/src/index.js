import React from 'react';
import ReactDOM from 'react-dom';
import personService from './services/persons'
import './index.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //Data haetaan nyt db.json - tiedostosta
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            msg: null
        }
    }

    handleNameInputFieldChange = (event) => {
        // console.log(event.target.value)
        this.setState({ newName: event.target.value })
    }

    handleNumberInputFieldChange = (event) => {
        // console.log(event.target.value)
        this.setState({ newNumber: event.target.value })
    }

    handleFilterInputFieldChange = (event) => {
        console.log(event.target.value)
        this.setState({ filter: event.target.value })
    }

    //Tapahtumakuuntelija nimen- ja puhnronlisäysnapille

    //axios.post()
    addNewEntry = (event) => {
        //Estetään sivun reload
        event.preventDefault()

        //lisätään uusi alkio joka lisätään persons - taulukkoon (uusi taulu)
        const newObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }

        personService.create(newObject)
            .then(res => {
                this.setState({
                    persons: this.state.persons.concat(res.data),
                    newName: '',
                    newNumber: '',
                    filter: '',
                    msg: 'lisättiin ' + newObject.name
                })
            })
        setTimeout(() => {
            this.setState({ msg: null })
        }, 5000)

    }

    noAction = (event) => {
        event.preventDefault()
        console.log("Duplikaatti huomattu")
    }

    componentWillMount() {
        personService
            .getAll()
            .then(res => {
                this.setState({ persons: res.data })
            })
    }

    deletePerson = (id) => (e) => {
        e.preventDefault
        // Ternary ei halua käydä tähän tarkoitukseen
        const poistettavaHenkilo = this.state.persons.find(person => person.id === id)
        if (window.confirm('Poistetaanko ' + poistettavaHenkilo.name + '?')) {
            this.setState({
                persons: this.state.persons.filter(person => person.id !== id),
                msg: 'käyttäjä ' + poistettavaHenkilo.name + ' poistettu'
            })
            setTimeout(() => {
                this.setState({ msg: null })
            }, 5000)
            personService
                .remove(id)
        }
    }

    updatePerson = (id) => {
        return (event) => {
            event.preventDefault()
            const person = this.state.persons.find(p => p.id === id)
            const changedPerson = { ...person, number: this.state.newNumber }

            personService.update(id, changedPerson)
                .then(res => {
                    const remainingPersons = this.state.persons.filter(p => p.id !== id)
                    this.setState({
                        persons: remainingPersons.concat(res.data),
                        msg: 'käyttäjän ' + changedPerson.name + ' numero on vaihdettu'
                    })
                    setTimeout(() => {
                        this.setState({ msg: null })
                    }, 5000)

                    //Seuraa sulkeita, niin tiedät missä .thenin vaikutusalue loppuu
                }).catch(err => {
                    personService.create(changedPerson)
                        .then(res => {
                            this.setState({
                                persons: this.state.persons.concat(res.data),
                                msg: 'käyttäjä uudelleenlisätty, joku poisti käyttäjän ' + changedPerson.name + ' ennen muokkaustasi... Duplikaatti katoaa uudelleenlatauksella...'
                            })
                            setTimeout(() => {
                                this.setState({ msg: null })
                            }, 5000)
                        })
                })
        }
    }

    render() {
        const hasDuplicate = this.state.persons.some(person => person.name === this.state.newName)
        const duplikaatti = this.state.persons.find(person => person.name === this.state.newName) // Varmaan toisteista tietoa...
        const byID = (person1, person2) => person1.id - person2.id
        hasDuplicate ?
            console.log(duplikaatti.name) :
            console.log('ei duplikaatteja')
        const addOrEdit = hasDuplicate ?
            this.updatePerson(duplikaatti.id) :
            this.addNewEntry
        //Case - insensitivity ---> tehdään vertailu pienillä kirjaimilla
        const filterPersons = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))
        const showFilteredPersonsInOrder = filterPersons.sort(byID)
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <hr />
                <Notification message={this.state.msg} />
                <InputField prefix="rajaa näytettäviä" value={this.state.filter} onChangeFunction={this.handleFilterInputFieldChange} />
                <h3>Lisää uusi / muuta olemassaolevan numeroa</h3>
                <form onSubmit={addOrEdit}>
                    <InputField prefix="nimi" value={this.state.newName} onChangeFunction={this.handleNameInputFieldChange} />
                    <InputField prefix="numero" value={this.state.newNumber} onChangeFunction={this.handleNumberInputFieldChange} />
                    <SubmitButton type="submit" sisalto="lisaa" />
                </form>
                <hr />
                <h2>Numerot</h2>
                {/* Jos valittaa jostain, niin vaihda InOrder nimi pois..? */}
                <Persons persons={showFilteredPersonsInOrder} deletePerson={this.deletePerson.bind(this)} />
            </div >
        )
    }
}

const SubmitButton = (props) => {
    const { type, sisalto } = props
    return (
        <div>
            <button type={type}>{sisalto}</button>
        </div>
    )
}

const InputField = (props) => {
    const { prefix, value, onChangeFunction } = props
    return (
        <div>
            {prefix}:<br />
            <input value={value} onChange={onChangeFunction} />
        </div>
    )
}

const Persons = (props) => {
    const { persons, deletePerson } = props
    return (
        <div>
            <table>
                <tbody>
                    {persons.map(person =>
                        <tr key={person.id}>
                            <td>{person.name}</td>
                            <td>{person.number}</td>
                            <td><button onClick={deletePerson(person.id)}>poista</button></td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}

const Notification = (props) => {
    const { message } = props
    if (message === null) {
        return null
    }
    return (
        <div className="info">
            {message}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
