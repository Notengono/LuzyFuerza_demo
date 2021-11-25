import React, { useContext } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { AuthContext } from "../../auth/AuthContext";
import { AppBar } from "@mui/material";

// import { logout, selectUsuario } from "../reducers/authSlice";

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "right",
		}}
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		border: "1px solid #d3d4d5",
	},
}));

const UserMenu = (props) => {
	const { user: { name }, dispatch } = useContext(AuthContext)

	// const dispatch = useDispatch();
	// const usuario = useSelector(selectUsuario);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		// dispatch(logout());
		//history.push("/login");
	};
	
	const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

	return (
		<>
			<AppBar position="fixed">
				<Typography
					component="p"
					variant="body2"
					sx={{
						fontWeight: "bold",
						color: "red",
						display: { xs: "none", md: "block" },
					}}
					noWrap
				>
				</Typography>
				<IconButton sx={{ color: "red" }} onClick={handleClick}>
					<MoreVertIcon />
				</IconButton>
				<StyledMenu
					id="customized-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem component={Link} to="/perfil" onClick={handleClose}>
						<ListItemIcon>
							<PersonOutlineOutlinedIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText
							primary="Perfil"
							primaryTypographyProps={{ variant: "body2" }}
						/>
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleClose();
							window.open(
								"https://apps.entrerios.gov.ar/cambioclave/",
								"",
								"toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=600, height=800, top=10, left=10"
							);
						}}
					>
						<ListItemIcon>
							<CreateOutlinedIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText
							primary="Cambiar Contrase�a"
							primaryTypographyProps={{ variant: "body2" }}
						/>
					</MenuItem>
					<Divider />
					<MenuItem
						onClick={() => {
							handleLogout();
							handleClose();
						}}
					>
						<ListItemIcon>
							<ExitToAppOutlinedIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText
							primary="Cerrar Sesión"
							primaryTypographyProps={{ variant: "body2" }}
						/>
					</MenuItem>
				</StyledMenu>
				<Typography variant='h6'>
					{name}
				</Typography>
			</AppBar>
			<Offset />
		</>
	);
};

export default UserMenu;
