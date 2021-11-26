import React, { useState } from 'react'
import { Button, FormControl, Input, InputLabel, Grid, Paper, Container, Stack } from '@mui/material';
import { useParams } from 'react-router';
import { Box } from '@mui/system';

export const AdherenteScreen = () => {
    const { id } = useParams();

    console.log(id)
    const [formState, setFormState] = useState({
        nombre: '',
        dni: '',
        nacionalidad: '',
        lugarDeNacimiento: '',
        fechaDeNacimiento: '',
        chekeado: false,
        // provincia: '',
    })

    const { nombre, dni, fechaDeNacimiento } = formState;

    // const handleChangeCheck = ({ target }) => {
    //     setFormState({
    //         ...formState, [target.name]: target.checked
    //     })
    // }
    const handleChange = ({ target }) => {
        setFormState({
            ...formState, [target.name]: target.value
        })
    }

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
                <Grid container  spacing={3}>
                    <Grid item xs={6} sm={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="standard-adornment-nombre">Apellido y nombre</InputLabel>
                            <Input
                                autoComplete="off"
                                name="nombre"
                                placeholder="Apellido y nombre"
                                label="Apellido y nombre"
                                type="text"
                                value={nombre}
                                variant="filled"
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="standard-adornment-dni">Documento</InputLabel>
                            <Input
                                autoComplete="off"
                                id="standard-adornment-dni"
                                name="dni"
                                value={dni}
                                type="number"
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={3} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="standard-adornment-fechaDeNacimiento">Fecha De Nacimiento</InputLabel>
                            <Input
                                autoComplete="off"
                                id="standard-adornment-fechaDeNacimiento"
                                name="fechaDeNacimiento"
                                value={fechaDeNacimiento}
                                onChange={handleChange}
                                type="date"
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <br />
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="primary" p={3}>
                        Grabar
                    </Button>
                    <Button variant="contained" color="error">
                        Cancelar
                    </Button>
                </Stack>
            </Container>
        </Box>
    )
}
