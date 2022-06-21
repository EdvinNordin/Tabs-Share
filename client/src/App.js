
import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import memories from './images/memories.png';
import styled from './styles';

const App = () => {
    const classes = styled();
    return (
        <Container maxwidth="lg">
            <AppBar classname={classes.appBar} position="static" color="inherit">
                <Typography classname={classes.heading} variant="H2" align="center">Memories</Typography>
                <img classname={classes.image} src={memories} alt="memories" height="60"/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="strech" spacing={3}>
                    <Grid item xs={12} sm={7}>                            
                        <Posts />
                    </Grid>
                    <Grid item xs={12} sm={4}>                    
                        <Form />
                    </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;