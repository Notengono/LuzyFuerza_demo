import React, { useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MuiPaper from "@mui/material/Paper";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "./Login.css";
import logo from "../../assets/images/erColor.png";
import api from "../../service/api";
import {
	login,
	setUsuario,
	setMenu,
	setAcciones,
} from "../../reducers/authSlice";

const Form = styled("form")(({ theme }) => ({
	width: "100%", // Fix IE 11 issue.
}));

const Paper = styled(MuiPaper)(({ theme }) => ({
	padding: theme.spacing(5, 5, 5, 5),
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	border: "1px solid #e0e0e0",
	[theme.breakpoints.down("sm")]: {
		padding: theme.spacing(5, 1, 5, 1),
	},
}));

const FormBox = styled(Box)(({ theme }) => ({
	width: "100%",
	[theme.breakpoints.down("sm")]: {
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
	},
}));

const Error = styled(Box)(({ theme }) => ({
	backgroundColor: "#fadddd",
	color: "#772b35",
	borderColor: "#f8cfcf",
	borderRadius: ".25rem",
	paddingTop: theme.spacing(2),
	paddingBottom: theme.spacing(2),
	textAlign: "center",
	marginTop: theme.spacing(1),
	marginBottom: theme.spacing(2),
}));

const LoginScreen = (props) => {
	const captcha = useRef(null);
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const [error, setError] = useState("");
	const [documento, setDocumento] = useState("");
	const [contrasenia, setContrasenia] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const salt = process.env.REACT_APP_LS_SALT;
	const { from } = location.state || { from: { pathname: "/" } };

	const loginUser = (
		nombreUsuario,
		menu,
		acciones,
		accessToken,
		refreshToken
	) => {
		localStorage.setItem("usuario" + salt, nombreUsuario);
		localStorage.setItem("accessToken" + salt, accessToken);
		localStorage.setItem("refreshToken" + salt, refreshToken);
		dispatch(setUsuario(nombreUsuario));
		dispatch(setMenu(menu));
		dispatch(setAcciones(acciones));
		dispatch(login());
		history.push(from);
	};

	const handleOnChange = (event) => {
		setError("");
		switch (event.target.name) {
			case "documento":
				setDocumento(event.target.value);
				break;
			case "contrasenia":
				setContrasenia(event.target.value);
				break;
			default:
				break;
		}
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (documento.length === 0 || contrasenia.length === 0) {
			setError("Debe ingresar el usuario y la contraseña");
		} else if (!/^-?\d+$/.test(documento)) {
			setError("Usuario: Solo números");
		} else if (contrasenia.length < 6) {
			setError("Contraseña: Mínimo 6 caracteres.");
		} else if (captcha.current.getValue() === "") {
			setError("Debe validar el reCAPTCHA.");
		} else {
			handleLogin({ documento, contrasenia });
		}
	};

	const handleLogin = (credenciales) => {
		setError("");
		setSubmitting(true);
		api
			.login({
				usuario: credenciales.documento,
				contrasenia: credenciales.contrasenia,
				captcha: captcha.current.getValue(),
			})
			.then((res) => {
				captcha.current.reset();
				setSubmitting(false);
				let nombreUsuario = res.data.apellido + ", " + res.data.nombre;
				loginUser(
					nombreUsuario,
					res.data.menu,
					res.data.acciones,
					res.data.accessToken,
					res.data.refreshToken
				);
			})
			.catch((e) => {
				console.log(e);
				captcha.current.reset();
				setSubmitting(false);

				setError(
					e.response.data.error
						? e.response.data.error
						: "Error de validaci�n. Compruebe los campos."
				);
			});
	};

	return (
		<>
			<CssBaseline />
			<Box className="login">
				<Container component="main" maxWidth="xl">
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						height="95vh"
					>
						<Grid container spacing={1} justifyContent="center">
							<Grid item lg={7} sm={12} xs={12}>
								<Paper elevation={0}>
									<Box mb={1}>
										<img src={logo} mb={2} alt="Logo" />
									</Box>
									<Box alignSelf="flex-start" sx={{ p: 1 }}>
										<Typography component="h1" variant="h5">
											{String(
												process.env.REACT_APP_NOMBRE_SISTEMA
											).toUpperCase()}
										</Typography>
										<Typography sx={{ color: "#768192" }}>
											{String(process.env.REACT_APP_SUBNOMBRE_SISTEMA)}
										</Typography>
									</Box>
									<FormBox sx={{ width: "100%" }}>
										<Form noValidate onSubmit={handleSubmit}>
											<TextField
												variant="outlined"
												size="small"
												margin="normal"
												fullWidth
												id="documento"
												label="USUARIO"
												name="documento"
												autoFocus
												onChange={handleOnChange}
											/>
											<TextField
												variant="outlined"
												size="small"
												margin="normal"
												fullWidth
												name="contrasenia"
												label="CONTRASE�A"
												type={showPassword ? "text" : "password"}
												id="contrasenia"
												autoComplete="current-password"
												onChange={handleOnChange}
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<IconButton
																aria-label="toggle password visibility"
																onClick={handleClickShowPassword}
																edge="end"
															>
																{showPassword ? (
																	<VisibilityOff />
																) : (
																	<Visibility />
																)}
															</IconButton>
														</InputAdornment>
													),
												}}
											/>
											<Box mt={2} mb={2}>
												<div align="center">
													<ReCAPTCHA
														ref={captcha}
														sitekey="6LdsgSgbAAAAAPg_cxA1KmgM43Lx7Mwas19i6y2A"
													/>
												</div>
											</Box>

											{error !== "" ? (
												<Error>
													<Typography
														component="p"
														variant="cuerpo"
														sx={{ color: "#b71c1c" }}
													>
														{error}
													</Typography>
												</Error>
											) : (
												""
											)}

											<Button
												type="submit"
												fullWidth
												variant="verde"
												mb={2}
												disabled={submitting}
											>
												{submitting ? "INGRESANDO..." : "INGRESAR"}
											</Button>
										</Form>
									</FormBox>
								</Paper>
							</Grid>
						</Grid>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default LoginScreen;
