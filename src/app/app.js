import React, {useState} from 'react';

import { RegisterForm } from '../forms/forms';
import Drop from '../drop/drop';

const App = (props) => {
    return <div className='app'>
        <RegisterForm/>
        <Drop />
    </div>
}

export default App;