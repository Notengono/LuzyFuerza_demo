import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext'
import { types } from "../../types/types";

import { AppBar, Button, IconButton, Toolbar, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";

import logo from '../../assets/logo_blanco.png'

const styles = theme => ({
    drawerPaper: { background: "blue" }
});

const useStyles = makeStyles(/*(theme) => */({
    // offset: theme.mixins.toolbar,
    // offset: '165px',
    menuButton: { margigRight: '0.8em'/*theme.spacing(12) */ },
    title: { flexGrow: 1 },
    papel: {
        backgroundColor: '#1976d2'
    }
}))

export const Navbar = () => {
    const clases = styles();
    const classes = useStyles()
    const { user: { name }, dispatch } = useContext(AuthContext)
    const history = new useHistory();

    const handleLogout = () => {
        history.replace('/login')
        dispatch({
            type: types.logout
        })
    }

    const handlePage = () => {
        history.replace('search')
    }

    const handleNewAfiliado = () => {
        history.replace('afiliado')
    }

    const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
    return (
        <div>
            <AppBar position="fixed">
                <Paper >
                    <Toolbar className={clases.drawerPaper}>
                        {/* className={classes.menuButton} */}
                        <IconButton edge="start"
                            className={classes.menuButton}
                            color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <img src={logo} mb={2} alt="Logo" />
                        </IconButton>



                        <Button variant="text" color="inherit"
                            onClick={handlePage}>
                            Listado de Afiliados
                        </Button>
                        <Button variant="text" color="inherit"
                            onClick={handleNewAfiliado} >
                            Nuevo Afiliado
                        </Button>

                        <Typography
                            variant='h6'
                            className={classes.title}
                        >
                            {/* {name} */}
                        </Typography>

                        <IconButton sx={{ color: "inherit" }}>
                            {name}
                            <MoreVertIcon />
                        </IconButton>
                        {/* <Button variant="text" color="inherit"
                        onClick={handleLogout}>
                        sss
                    </Button> */}
                    </Toolbar>
                </Paper>
            </AppBar>
            {/* <div className={classes.offset}>s</div> */}
            <Offset />
        </div>
        // <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

        //     <Link
        //         className="navbar-brand"
        //         to="/"
        //     >
        //         Asociaciones
        //     </Link>

        //     <div className="navbar-collapse">
        //         <div className="navbar-nav me-auto mb-2 mb-lg-0">
        //             <NavLink
        //                 activeClassName="active"
        //                 className="nav-item nav-link"
        //                 exact
        //                 to="/marvel"
        //             >
        //                 Marvel
        //             </NavLink>

        //             <NavLink
        //                 activeClassName="active"
        //                 className="nav-item nav-link"
        //                 exact
        //                 to="/dc"
        //             >
        //                 DC
        //             </NavLink>

        //             <NavLink
        //                 activeClassName="active"
        //                 className="nav-item nav-link"
        //                 exact
        //                 to="/search"
        //             >
        //                 Buscar
        //             </NavLink>
        //         </div>
        //     </div>

        //     <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        //         <ul className="navbar-nav ml-auto">
        //             <span className="nav-item nav-link text-info">
        //                 {name}
        //             </span>
        //             <button
        //                 className="nav-item nav-link btn"
        //                 onClick={handleLogout}
        //             >
        //                 Logout
        //             </button>
        //         </ul>
        //     </div>
        // </nav>
    )
}