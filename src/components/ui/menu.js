import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMenu } from "../reducers/authSlice";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const RootList = styled(List)(({ theme }) => ({
  width: "100%",
  maxWidth: 256,
  backgroundColor: "#799F4F",
  color: "#FFFFFF",
  paddingTop: 0,
}));

const ListItem = styled(MuiListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#3E6650",
    color: "white",
  },
}));

const HeaderListItem = styled(ListItem)(({ theme }) => ({
  height: 49,
  paddingTop: 0,
  paddingBottom: 0,
}));

const NestedListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  backgroundColor: "#608051",
}));

const Menu = (props) => {
  const menu = useSelector(selectMenu);
  const [selectedIndex, setSelectedIndex] = React.useState("");

  const handleClick = (index) => {
    if (selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <RootList component="nav" aria-labelledby="nested-list-subheader">
      <HeaderListItem
        button
        key="encabezado"
        component={Link}
        to="/"
        onClick={props.closeResponsiveDrawer}
      >
        <ListItemIcon>
          <HomeOutlinedIcon sx={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText
          primary="Inicio"
          primaryTypographyProps={{ variant: "body2" }}
        />
      </HeaderListItem>
      {menu.map((item, index) => (
        <React.Fragment key={"fragment" + index}>
          {item.hijos ? (
            <React.Fragment key={"fragment" + index}>
              <ListItem
                button
                key={item.opcion_menu + index}
                onClick={() => handleClick(index)}
                sx={
                  index === selectedIndex
                    ? {
                        backgroundColor: "#608051",
                      }
                    : ""
                }
              >
                <ListItemText
                  primary={item.opcion_menu}
                  primaryTypographyProps={{ variant: "body2" }}
                />
                {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                key={"collapse" + index}
                in={index === selectedIndex}
                timeout="auto"
                unmountOnExit
              >
                <List key={"submenu" + index} component="div" disablePadding>
                  {item.hijos.map((hijo, index) => (
                    <React.Fragment key={"fragment" + index}>
                      {hijo.pantalla ? (
                        <NestedListItem
                          button
                          key={hijo.opcion_menu + index}
                          component={Link}
                          to={hijo.pantalla}
                          onClick={props.closeResponsiveDrawer}
                        >
                          <ListItemText
                            primary={hijo.opcion_menu}
                            primaryTypographyProps={{ variant: "body2" }}
                          />
                        </NestedListItem>
                      ) : (
                        <NestedListItem
                          button
                          key={hijo.opcion_menu + index}
                          component={Link}
                          to="PageError"
                        >
                          <ListItemText
                            primary={hijo.opcion_menu}
                            primaryTypographyProps={{ variant: "body2" }}
                          />
                        </NestedListItem>
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ) : (
            <ListItem
              button
              key={item.opcion_menu + index}
              component={Link}
              to={item.pantalla}
              onClick={props.closeResponsiveDrawer}
            >
              <ListItemText
                primary={item.opcion_menu}
                primaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
          )}
        </React.Fragment>
      ))}
    </RootList>
  );
};

export default Menu;