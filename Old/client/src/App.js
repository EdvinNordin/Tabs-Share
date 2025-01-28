
import React from 'react';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import memories from './images/memories.png';
import styled from './styles';

const App = () => {
    const classes = styled();
    return (
        <div>
                <img classname={classes.image} src={memories} alt="memories" height="60"/>
                        <Posts />        
                        <Form />
                </div>
    );
}

export default App;