import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import logoER from "../assets/images/er.png";
import Menu from "./Menu";
import UserMenu from "./UserMenu";
import {
  setError,
  setSuccess,
  setWarning,
  selectError,
  selectSuccess,
  selectWarning,
} from "../reducers/appSlice";

const drawerWidth = 256;

const Root = styled(Box)({
  display: "flex",
  backgroundColor: "#EBEDEF",
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: "white",
  borderBottom: "1px solid	#D3D3D3",
  height: "56px",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    //boxSizing: 'border-box',
    backgroundColor: "#799F4F",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
    }),
  },
}));

const AppBarSpacer = styled("div")({
  minHeight: 56,
});

const Logo = styled("div")(({ theme }) => ({
  height: "56px",
  display: "flex",
  alignItems: "center",
  paddingLeft: "35px",
  paddingTop: "5px",
  backgroundColor: "#608051",
}));

const Footer = styled("footer")(({ theme }) => ({
  padding: theme.spacing(2, 2),
  marginTop: "auto",
  height: 50,
  borderTop: "1px solid #e0e0e0",
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = (props) => {
  const errorMsg = useSelector(selectError);
  const successMsg = useSelector(selectSuccess);
  const warningMsg = useSelector(selectWarning);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [openResponsive, setOpenResponsive] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);

  const handleCloseError = (event, reason) => {
    setOpenError(false);
    dispatch(setError(""));
  };

  const handleCloseSuccess = (event, reason) => {
    setOpenSuccess(false);
    dispatch(setSuccess(""));
  };

  const handleCloseWarning = (event, reason) => {
    setOpenWarning(false);
    dispatch(setWarning(""));
  };

  const toggleDrawerResponsive = (state) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenResponsive(state);
  };

  const closeResponsiveDrawer = () => {
    setOpenResponsive(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (errorMsg !== "" && errorMsg !== null) setOpenError(true);
    else setOpenError(false);
  }, [errorMsg]);

  useEffect(() => {
    if (successMsg !== "" && successMsg !== null) setOpenSuccess(true);
    else setOpenSuccess(false);
  }, [successMsg]);

  useEffect(() => {
    if (warningMsg !== "" && warningMsg !== null) setOpenWarning(true);
    else setOpenWarning(false);
  }, [warningMsg]);

  return (
    <Root>
      <CssBaseline />
      <AppBar position="absolute" elevation={0} open={open}>
        <Toolbar sx={{ minHeight: "56px  !important" }}>
          <IconButton
            edge="start"
            sx={{
              color: "gray",
              marginRight: "12px",
              display: { xs: "none", md: "inline" },
            }}
            aria-label="open drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            edge="start"
            sx={{
              color: "gray",
              marginRight: "12px",
              display: { xs: "inline", md: "none" },
            }}
            aria-label="open drawer"
            onClick={toggleDrawerResponsive(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            sx={{ color: "gray", flexGrow: 1 }}
            noWrap
          >
            {String(process.env.REACT_APP_NOMBRE_SISTEMA).toUpperCase()}
            {process.env.REACT_APP_SUBNOMBRE_SISTEMA !== ""
              ? " - " +
                String(process.env.REACT_APP_SUBNOMBRE_SISTEMA).toUpperCase()
              : ""}
          </Typography>

          <UserMenu />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <Logo>
          <img src={logoER} alt="Logo Entre R�os" width={150} />
        </Logo>
        <Divider />
        <Menu closeResponsiveDrawer={closeResponsiveDrawer} />
      </Drawer>

      <MuiDrawer
        anchor="left"
        open={openResponsive}
        onClose={toggleDrawerResponsive(false)}
        sx={{ zIndex: 2000, display: { xs: "block", md: "none" } }}
      >
        <Box
          sx={{
            width: drawerWidth,
            backgroundColor: "#799F4F",
            height: "100%",
          }}
          role="presentation"
        >
          <Logo>
            <img src={logoER} alt="Logo Entre R�os" width={150} />
          </Logo>
          <Divider />
          <Menu
            items={props.menu}
            closeResponsiveDrawer={closeResponsiveDrawer}
          />
        </Box>
      </MuiDrawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <AppBarSpacer />
        <Container
          maxWidth="100%"
          disableGutters={true}
          sx={{ minHeight: "90vh" }}
        >
          {props.children}
        </Container>
        <Footer sx={{ backgroundColor: "#EBEDEF" }}>
          <Container maxWidth="xl" disableGutters>
            <Box display="flex" flexDirection="row-reverse">
              <Typography variant="body2">
                Direcci�n General de Inform�tica -{" "}
                <Link
                  href="https://www.entrerios.gov.ar/dgin"
                  variant="body2"
                  sx={{ color: "#799F4F" }}
                  target="_blank"
                >
                  {"www.entrerios.gov.ar/dgin"}
                </Link>
              </Typography>
            </Box>
          </Container>
        </Footer>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openError}
        autoHideDuration={5000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSuccess}
        autoHideDuration={2000}
        onClose={handleCloseSuccess}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openWarning}
        autoHideDuration={2000}
        onClose={handleCloseWarning}
      >
        <Alert
          onClose={handleCloseWarning}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {warningMsg}
        </Alert>
      </Snackbar>
    </Root>
  );
};

export default Dashboard;
