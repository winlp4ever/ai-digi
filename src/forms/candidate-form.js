import React, { Component, useState } from 'react';

// 3rd party imports
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';


import Drop from '../drop/drop';
import Fill from './fill';
import { postForData } from '../utils';
import './_candidate-form.scss';

const SEXES = ['homme', 'femme'];
const PROFESSIONS = ['Etudiant', 'Employe', 'Autre'];
const LEVELS = ['1ere annee de Mastere', '2eme annee de Mastere'];
const HOURS = ['11h', '12h', '15h', '17h'];

const FIELDS = [
    {name: 'lastname', label: 'Nom', required: true},
    {name: 'firstname', label: 'Prenom', required: true},
    {name: 'sex', label: 'Sexe', options: SEXES, required: true},
    {name: 'email', label: 'Email', required: true},
    {name: 'address', label: 'Adresse postale', required: true},
    {name: 'city', label: 'Ville', required: true},
    {name: 'country', label: 'Pays', required: true},
    {name: 'telephone', label: 'Telephone', required: true},
    {name: 'birthday', label: 'Date de naissance'},
    {name: 'birthplace', label: 'Ville et Pays de naissance'},
    {name: 'nationality', label: 'Nationalite', required: true},
    {name: 'profession', label: 'Situation Actuelle', options: PROFESSIONS, required: true},
]

const EXPS1 = [
    {name: 'company1', label: 'Enterprise', required: false},
    {name: 'sector1', label: "Secteur d'activite", required: false},
    {name: 'position1', label: "Fonction occupee", required: false},
    {name: 'contract1', label: 'type de contrat et duree', required: false},
    {name: 'desc1', label: 'Description du poste', required: false}
]

const EXPS2 = [         
    {name: 'company2', label: 'Enterprise', required: false},
    {name: 'sector2', label: "Secteur d'activite", required: false},
    {name: 'position2', label: "Fonction occupee", required: false},
    {name: 'contract2', label: 'type de contrat et duree', required: false},
    {name: 'desc2', label: 'Description du poste', required: false}
]

const EXPCHOICES = [
    'Bachelor 1 in Artificial Intelligence and Business',
    'Bachelor 2 in Artificial Intelligence and Business',
    'Bachelor 3 in Artificial Intelligence and Business',
    'Master 1 in Artificial Intelligence and Management',
    'Master 2 in Artificial Intelligence and Management'
]

const SKILLS = [
    {name: 'skill1', label: 'Ecrivez votre competence', required: false},
    {name: 'skill2', label: 'Ecrivez votre competence', required: false},
    {name: 'skill3', label: 'Ecrivez votre competence', required: false}
]

const ASKFORDOCS = [
    "Telecharger une photocopie d'une piece d'identite *",
    "Telecharger votre Curriculum Vitae (CV) *",
    'Telecharger des releves de notes des deux dernieres annees *',
    'Telecharger les derniers diplomes obtenus *'
]

const Choice = (props) => {
    return <Button 
        className='int-choice' 
        onClick={props.hdler} 
        startIcon={props.chosen? <CheckBoxIcon/>: <CheckBoxOutlineBlankIcon />}>
        {props.text}
    </Button>
}

export default class CandidateForm extends Component {
    state = {sent: false, choice: -1, choiceText: '', links: []}

    changeHdler = (dct) => {
        this.setState(dct);
        console.log(this.state);
    }

    choiceHdler = (i) => {
        this.setState({
            choice: i,
            choiceText: EXPCHOICES[i]
        })
    }

    handleLink = (url) => {
        let links = this.state.links.slice();
        links.push(url);
        this.setState({links: links})
    }

    handleSubmit = async () => {
        let data = await postForData('/register-submit', this.state);
        if (data.status == 'ok') this.setState({sent: true})
    }

    render() {
        return <div className='candidate-form'>
            <h1>{this.state.sent? 'Merci de votre dossier de candidature, on va vous contactera tres bien tot': 
                'Dossier de candidature'}</h1>
            
            {this.state.sent? null: <div className='level-integration'>
                <h2>NIVEAU D'INTEGRATIONI SOUHAITE</h2>
                <span><b>Cochez le niveau d'integration souhaite *</b></span>
                {EXPCHOICES.map((ex, ix) => <Choice key={ix} text={ex} hdler={_ => this.choiceHdler(ix)} chosen={ix==this.state.choice} />)}
            </div>}
            {this.state.sent?null: <div className='basic-info'>
                <h2>Etat Civil</h2>
                {FIELDS.map((d, ix) => <Fill key={ix} {...d} hdler={this.changeHdler}/>)}
                
            </div>}
            {this.state.sent? null:
            <div className='experiences'>
                <h2>EXPERIENCE PROFESSIONNELLE/ 1 ou 2 experiences significatives</h2>
                <div className='exp'>
                    {EXPS1.map((d, ix) => <Fill key={ix} {...d} hdler={this.changeHdler} />)}
                </div>
                <div className='exp'>
                    {EXPS2.map((d, ix) => <Fill key={ix} {...d} hdler={this.changeHdler} />)}
                </div>
            </div>}
            {this.state.sent? null:
            <div className='skills'>
                <h2>COMPETENCES CLES/ Citez au minimum 3 competences acquises par experience</h2>  
                {SKILLS.map((s, ix) => <Fill key={ix} {...s} hdler={this.changeHdler} />)}
            </div>}
            {this.state.sent? null:
            <div className='project'>
                <h2>Projet Personelle</h2>
                <p><b>Quelles sont les motivations de votre candidature a l'IA School</b></p>
                <Fill name='why' label='les motivations' hdler={this.changeHdler}/>
                <p><b>Avez vous des competences en programmation</b></p>
                <Fill name='programmation' label='Listez vos competences (avec le niveau) en programmation' hdler={this.changeHdler}/>
                <p><b>Pouvez vous donnez un secteur d'activite avec des applications possibles de l'IA dans ce secteur?</b></p>
                <Fill name='programmation' label='Votre pensee' hdler={this.changeHdler}/>
            </div>
            }
            {this.state.sent? null:
            <div className='upload-docs'>
                <h2>Constitution du dossier</h2>
                <p><b>Le jury se reserve le droit de refuser tout dossier incomplet</b></p>
                <span><b>Pieces obligatoires</b></span>
                {ASKFORDOCS.map((d, ix) => <Drop msg={d} linkHdler={this.handleLink} key={ix} />)}
            </div>
            }
            {this.state.sent? null:
                <Button className='submit' onClick={this.handleSubmit}>Validez votre inscription</Button>
            }

        </div>
    }
}