import React, { useContext, useState } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types'
import { useForm } from '../../hooks/useForm'
import logo from '../../assets/banners-web-grande.png'

import {
    Button,
    FormControl,
    Input,
    InputLabel, Grid
} from '@mui/material';

import { makeStyles } from '@mui/styles';
import { styled } from "@mui/material/styles";
import { Box } from '@mui/system'

// const MyFormControl = styled(FormControl)((theme) => ({
// }));

const useStyles = makeStyles({
    margin: { margin: '0.8em' },
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: '15px'
    },
});

export const LoginScreen = ({ history }) => {

    const [formValues, handleInputChange] = useForm({
        name: '',
        password: '',
    });
    const { name, password } = formValues;

    // const handleSubmit = (event) => {
    // 	event.preventDefault();

    // 	if (documento.length === 0 || contrasenia.length === 0) {
    // 		setError("Debe ingresar el usuario y la contraseña");
    // 	} else if (!/^-?\d+$/.test(documento)) {
    // 		setError("Usuario: Solo números");
    // 	} else if (contrasenia.length < 6) {
    // 		setError("Contraseña: Mínimo 6 caracteres.");
    // 	} else if (captcha.current.getValue() === "") {
    // 		setError("Debe validar el reCAPTCHA.");
    // 	} else {
    // 		handleLogin({ documento, contrasenia });
    // 	}
    // };

    const classes = useStyles();
    const { dispatch } = useContext(AuthContext)

    const handleLogin = () => {
        const lastPath = localStorage.getItem('lastPath') || '/'
        dispatch({
            type: types.login,
            payload: {
                name: name
            }
        })
        history.replace(lastPath);
    }
    return (
        <div>
            {/* <h1>Login</h1> */}
            <Grid container
                alignItems="center"
                justifyContent="center"
                sx={{
                    // backgroundColor: '#ffe352',
                    backgroundColor: '#1976d2',
                }}
            >
                <img src={logo} />
            </Grid>
            <hr />
            
            <Box
                sx={{
                    mx: 'auto',
                    width: '35%',
                    p: 12,
                }}
            >
                {/* Centered element */}
                <Grid container
                    justifyContent="center"
                    alignItems="stretch"
                >
                    {/* <Grid
                        container
                        xs={6}
                        justifyContent="center"
                        alignItems="stretch"
                    > */}
                    <FormControl fullWidth >
                        <InputLabel htmlFor="standard-adornment-nombre">Nombre usuario</InputLabel>
                        <Input
                            autoComplete="off"
                            name="name"
                            placeholder="Nombre usuario"
                            label="Nombre usuario"
                            type="text"
                            variant="filled"
                            onChange={handleInputChange}
                            className={classes.margin}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="standard-adornment-nombre">Password usuario</InputLabel>
                        <Input
                            autoComplete="off"
                            name="password"
                            onChange={handleInputChange}
                            placeholder="Nombre usuario"
                            label="Nombre usuario"
                            type="password"
                            variant="filled"
                            className={classes.margin}
                        />
                    </FormControl>
                    <Button
                        // className={classes.root}
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Grid>
                {/* </Grid> */}
            </Box>
        </div>
    )
}
