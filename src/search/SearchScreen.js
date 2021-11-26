import React, { useMemo } from 'react'
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { useForm } from '../hooks/useForm';
import { getAfiliadosByName } from '../selectors/getAfiliadosByName';
import {
    Table, TableBody,
    TableCell, TableContainer, TableHead,
    TableRow, Button, Grid, Input
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Alert } from '@mui/material'

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupIcon from '@mui/icons-material/Group';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    root: {
        flexGrow: 1,
    },
});

export const SearchScreen = ({ history }) => {
    const classes = useStyles();

    const { search } = useLocation();
    const { q = '' } = queryString.parse(search);

    const [formValues, handleInputChange] = useForm({
        searchText: q
    });

    const { searchText } = formValues;
    const afiliadosFiltered = useMemo(() => getAfiliadosByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();

        history.push(`?q=${searchText}`)
    }

    return (
        <div>
            <h1>
                Listado de Afiliados
            </h1>
            <hr />

            <div className="classes.root">
                <Grid container>
                    <Grid item xs={6}>
                        <form onSubmit={handleSearch}>
                            {/* <InputLabel htmlFor="standard-adornment-nombre">Buscar</InputLabel> */}
                            <Input
                                autoComplete="off"
                                fullWidth
                                name="searchText"
                                placeholder="Buscar por nombre"
                                type="text"
                                value={searchText}
                                onChange={handleInputChange}
                            />
                        </form>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            color="primary"
                            fullWidth
                            type="submit"
                            variant="outlined"
                            onClick={handleSearch}
                        >
                            Buscar
                        </Button>
                    </Grid>
                </Grid>
            </div>

            <div className="classes.root">
                {
                    (q !== '' && afiliadosFiltered.length === 0) &&
                    <Alert severity="error">
                        No se ha encontrado ningún afiliado con {q}
                    </Alert>
                }
                {
                    (q === '') &&
                    <Alert severity="info">
                        Buscar un Afiliado
                    </Alert>
                }
                {(q !== '' && afiliadosFiltered.length > 0) &&
                    < div style={{ height: 250, width: '100%' }}>
                        {/* <TableContainer component={Paper}> */}
                        <TableContainer>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>id</TableCell>
                                        <TableCell align="center">Nombre</TableCell>
                                        <TableCell align="center">Documento</TableCell>
                                        <TableCell align="center">Nacionalidad</TableCell>
                                        <TableCell align="center">Lugar de Nacimietno</TableCell>
                                        <TableCell align="center">Fecha Nacimietno</TableCell>
                                        <TableCell align="center">Tarea</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {afiliadosFiltered.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">{row.id}</TableCell>
                                            <TableCell component="th" scope="row">{row.nombre}</TableCell>
                                            <TableCell align="center">{row.dni}</TableCell>
                                            <TableCell align="center">{row.nacionalidad}</TableCell>
                                            <TableCell align="center">{row.lugar_nacimiento}</TableCell>
                                            <TableCell align="center">{row.fecha_nacimiento}</TableCell>
                                            <TableCell align="center">
                                                <Link to={`./informacion/${row.id}`}>
                                                    <IconButton
                                                        color="primary"
                                                        size="small"
                                                        type="submit"
                                                        variant="outlined"
                                                    // onClick={handleSearch}
                                                    >
                                                        <InfoIcon />
                                                    </IconButton >
                                                </Link>
                                                &nbsp;
                                                <Link to={`./adherente/${row.id}`}>
                                                    <IconButton
                                                        color="secondary"
                                                        size="small"
                                                        type="submit"
                                                        variant="outlined"
                                                    // onClick={handleSearch}
                                                    >
                                                        <GroupAddIcon />
                                                    </IconButton >
                                                </Link>
                                                &nbsp;
                                                <IconButton
                                                    color="success"
                                                    size="small"
                                                    type="submit"
                                                    variant="outlined"
                                                // onClick={handleSearch}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                }
            </div>
        </div >
    )
}
