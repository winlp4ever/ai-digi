import React, { Component, useState } from 'react';

// 3rd party imports
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

const SEXES = ['homme', 'femme'];
const PROFESSIONS = ['Etudiant', 'Employe', 'Autre'];
const LEVELS = ['1ere annee de Mastere', '2eme annee de Mastere'];
const HOURS = ['11h', '12h', '15h', '17h'];

import './_forms.scss';

const Fill = ({name, label, options, hdler, required}) => {
    const handleChange = (val) => {
        let dct = {};
        dct[name] = val;
        hdler(dct);
    }

    if (options) return <Autocomplete
        className={'fill ' + name}
        options={options}
        getOptionLabel={(option) => option}
        onChange={(e, newval) => handleChange(newval)}
        renderInput={(params) => <TextField {...params} label={label} variant='outlined' required={required}/>}        
    />

    return <TextField 
        required={required} 
        className={'fill ' + name} 
        label={label} 
        onChange={e => handleChange(e.target.value)}
    />
}

const FIELDS = [
    {name: 'lastname', label: 'Nom', required: true},
    {name: 'firstname', label: 'Prenom', required: true},
    {name: 'sex', label: 'Sexe', options: SEXES, required: true},
    {name: 'nationality', label: 'Nationalite', required: true},
    {name: 'telephone', label: 'Telephone', required: true},
    {name: 'email', label: 'Email', required: true},
    {name: 'address', label: 'Adresse', required: true},
    {name: 'profession', label: 'Situation Actuelle', options: PROFESSIONS, required: true},
    {name: 'level', label: 'Niveau d\'integration', options: LEVELS, required: true},
    {name: 'date', label: 'Date de votre RDV d\'admission', required: true},
    {name: 'time', label: 'Heure de votre RDV d\'admission', options: HOURS, required: true}
]

async function postForData(endpoint, dict={}) {
    let response = await fetch(endpoint, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dict)
    });
    let data = await response.json();
    return data;
}

class RegisterForm extends Component {
    state = {sent: false}

    changeHdler = (dct) => {
        this.setState(dct);
        console.log(this.state);
    }

    handleSubmit = async () => {
        let data = await postForData('/register-submit', this.state);
        if (data.status == 'ok') this.setState({sent: true})
    }

    render() {
        return <div className='register-form'>
            <h1>{this.state.sent? 'Merci de votre inscription': 'Informations Personelles'}</h1>
            {this.state.sent?null: <div className='form-container'>
                {FIELDS.map((d, ix) => <Fill key={ix} {...d} hdler={this.changeHdler}/>)}
                <Button className='submit' onClick={this.handleSubmit}>Validez votre inscription</Button>
            </div>}
        </div>
    }
}

export {RegisterForm};