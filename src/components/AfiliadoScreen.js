import React, { useState } from 'react'
import { Button, FormControl, Input, InputLabel, Grid, FormControlLabel, Checkbox } from '@mui/material';
// import { makeStyles } from '@mui/styles';


// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     margin: {
//         margin: theme.spacing(1),
//     },
//     withoutLabel: {
//         marginTop: theme.spacing(3),
//     },
//     textField: {
//         width: '25ch',
//     },
// }));

export const AfiliadoScreen = () => {
    // const classes = useStyles();

    const [formState, setFormState] = useState({
        nombre: '',
        dni: '',
        nacionalidad: '',
        lugarDeNacimiento: '',
        fechaDeNacimiento: '',
        chekeado: false,
        // provincia: '',
    })

    const { nombre, dni, nacionalidad, lugarDeNacimiento, fechaDeNacimiento, chekeado } = formState;

    const handleChangeCheck = ({ target }) => {
        setFormState({
            ...formState, [target.name]: target.checked
        })
    }
    const handleChange = ({ target }) => {
        setFormState({
            ...formState, [target.name]: target.value
        })
    }

    return (
        <div className="container">
            <h1>Nuevos Afiliados</h1>
            <hr />

            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <FormControl fullWidth
                    // className={classes.margin}
                    >
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
                <Grid item xs={6}>
                    <FormControl fullWidth
                    // className={classes.margin}
                    >
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
                <Grid item xs={6}>
                    <FormControl fullWidth
                    // className={classes.margin}
                    >
                        <InputLabel htmlFor="standard-adornment-nacionalidad">Nacionalidad</InputLabel>
                        <Input
                            autoComplete="off"
                            id="standard-adornment-nacionalidad"
                            name="nacionalidad"
                            value={nacionalidad}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth
                    // className={classes.margin}
                    >
                        <InputLabel htmlFor="standard-adornment-lugarDeNacimiento">Lugar De Nacimiento</InputLabel>
                        <Input
                            autoComplete="off"
                            id="standard-adornment-lugarDeNacimiento"
                            name="lugarDeNacimiento"
                            value={lugarDeNacimiento}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <FormControl fullWidth
                    // className={classes.margin}
                    >
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

                <Grid item xs={3}>
                    <FormControl fullWidth 
                    // className={classes.margin}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={chekeado}
                                    onChange={handleChangeCheck}
                                    name="chekeado"
                                    color="primary"
                                />
                            }
                            label="Descuento Obra Social y Aporte Sindical"
                        />
                    </FormControl>
                </Grid>
            </Grid>

            <Button variant="contained" color="primary">
                Grabar
            </Button>
        </div>
    )
}
