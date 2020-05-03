import React, { Component, useState } from 'react';

// 3rd party imports
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


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
export default Fill;