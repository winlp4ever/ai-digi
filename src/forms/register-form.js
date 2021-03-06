import React, { Component, useState } from 'react';

// 3rd party imports
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

import './_register-form.scss';

import Fill from './fill';
import { postForData } from '../utils';

const SEXES = ['homme', 'femme'];
const PROFESSIONS = ['Etudiant', 'Employe', 'Autre'];
const LEVELS = ['1ere annee de Mastere', '2eme annee de Mastere'];
const DAYS = ['5th May', '6th May', '7th May', '11th May', '12th May', '13th May', '14th May', '15th May', 
    '18th May', '19th May', '20th May', '21st May', '22nd May', '25th May', '26th May', '27th May', '28th May', '29th May']
const HOURS = ['11h', '12h', '15h', '17h'];

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
    {name: 'date', label: 'Date de votre RDV d\'admission', options: DAYS, required: true},
    {name: 'time', label: 'Heure de votre RDV d\'admission', options: HOURS, required: true}
]

class RegisterForm extends Component {
    state = {sent: false, err: false, errmsg: 'Le formulaire n\'est pas complet!!!'}

    changeHdler = (dct) => {
        this.setState(dct);
    }

    handleSubmit = async () => {
        if (!this.state.email) {
            this.setState({
                err: true
            })
        }
        else {
            let data = await postForData('/register-submit', this.state);
            if (data.status == 'ok') {
                this.setState({sent: true});
                window.location.href = 'http://ai-digital-transformation-school.com/merci-pour-votre-inscription/'; 
            }
        }
    }

    render() {
        return <div className='register-form'>
            <h1>{this.state.sent? 'Merci de votre inscription': 'Informations Personelles'}</h1>
            {this.state.sent?null: <div className='form-container'>
                {FIELDS.map((d, ix) => <Fill key={ix} {...d} hdler={this.changeHdler}/>)}
                {this.state.err ? <p className='err'>{this.state.errmsg}</p>: null}
                <Button className='submit' onClick={this.handleSubmit}>Validez votre inscription</Button>
            </div>}
        </div>
    }
}

export default RegisterForm;