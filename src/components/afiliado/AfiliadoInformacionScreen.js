import React, { useState } from 'react'
import { Button, FormControl, Input, InputLabel, Grid, Paper, Container, Stack } from '@mui/material';
import { useParams } from 'react-router';
import { Box } from '@mui/system';

export const AfiliadoInformacionScreen = () => {
    const { id } = useParams();

    console.log(id)
    // const [formState, setFormState] = useState({
    //     nombre: '',
    //     dni: '',
    //     nacionalidad: '',
    //     lugarDeNacimiento: '',
    //     fechaDeNacimiento: '',
    //     chekeado: false,
    //     // provincia: '',
    // })

    // const { nombre, dni, fechaDeNacimiento } = formState;

    // const handleChangeCheck = ({ target }) => {
    //     setFormState({
    //         ...formState, [target.name]: target.checked
    //     })
    // }
    // const handleChange = ({ target }) => {
    //     setFormState({
    //         ...formState, [target.name]: target.value
    //     })
    // }

    return (
        <Box
            sx={{
                width: '95%',
                margin: '0 auto',
                backgroundColor: '#f1f1f1',
            }}
        >
            <Paper
            // sx={{
            //     backgroundColor: '#01f1f1',
            // }}
            >
                <h1>Datos Afiliado</h1>
                <hr />
                <p><b>Nombre:</b> Javier Garcia</p>
                <p><b>Documento:</b> 21166357</p>
                <p><b>Empleado en:</b> ENERSA</p>
                <p><b>Obra Social:</b> OSFATLyF</p>
            </Paper>

            <Container >
                <h2>Adherente de Afiliado</h2>
                <hr />
                <Grid container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                >
                    <Grid item xs={6} >
                        <b>Nombre: </b> Ricardo Garcia
                    </Grid>
                    <Grid item xs={3} >
                        <b>Documento: </b> 31658789
                    </Grid>
                    <Grid item xs={3}>
                        <b>Fecha Nacimiento: </b>31/12/1990
                    </Grid>
                    <Grid item xs={6} >
                        <b>Nombre: </b> Nelida Garcia
                    </Grid>
                    <Grid item xs={3} >
                        <b>Documento: </b> 16615512
                    </Grid>
                    <Grid item xs={3}>
                        <b>Fecha Nacimiento: </b>31/12/1940
                    </Grid>
                </Grid>
                <br />
            </Container>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" p={3}>
                    Volver
                </Button>
            </Stack>
        </Box >
    )
}
