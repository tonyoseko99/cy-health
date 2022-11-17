import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PublicIcon from "@mui/icons-material/Public";
import HistoryIcon from "@mui/icons-material/History";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import InfoIcon from "@mui/icons-material/Info";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Dashboard } from "@mui/icons-material";
// import useState and useEffect
import { useState, useEffect } from "react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //   fetch stats from API
  const [stats, setStats] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCountryData = async () => {
      setLoading(true);
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "8cb05c0c99msh54bd09dc4e0a425p1571ddjsnf812c3d83eac",
          "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
        },
      };

      const response = await fetch(
        "https://covid-193.p.rapidapi.com/statistics",
        options
      );
      const data = await response.json();
      setStats(data.response);
      console.log(data.response);
      setLoading(false);
    };
    fetchCountryData();
  }, []);

//   function to get total cases
    const getTotalCases = () => {
        let totalCases = 0;
        stats.map((country) => {
            totalCases += country.cases.total;
        });
        return totalCases;
    };


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            CyHealth
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            <a href="/">Dashbord</a>,
            <a href="/countries">Countries</a>,
            <a href="/history">History</a>,
            <a href="/analysis">Analysis</a>,
            <a href="/about">About US</a>,
            <a href="/contact">Contact US</a>,
          ].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {(() => {
                    if (index === 0) {
                      return <Dashboard />;
                    } else if (index === 1) {
                      return <PublicIcon />;
                    } else if (index === 2) {
                      return <HistoryIcon />;
                    } else if (index === 3) {
                      return <EqualizerIcon />;
                    } else if (index === 4) {
                      return <InfoIcon />;
                    } else if (index === 5) {
                      return <ContactPageIcon />;
                    }
                  })()}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} className="card-box">
        <DrawerHeader />
        <Typography className="dashcard-container">
          {/* card to display total number of covid-19 cases */}
          <Card sx={{ maxWidth: 345 }} className="dashcard">
            <CardHeader title="Total Cases" subheader="September 14, 2021" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Total number of cases of covid-19
                <br></br>
                <strong>
                    {loading ? "Loading..." : getTotalCases().toLocaleString()}
                </strong>
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" className="learn-more-btn">
                Learn More
              </Button>
            </CardActions>
          </Card>
          {/* card to display total number of covid-19 deaths */}
          <Card sx={{ maxWidth: 345 }} className="dashcard">
            <CardHeader title="Total Deaths" subheader="September 14, 2021" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Total number of deaths of covid-19
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" className="learn-more-btn">
                Learn More
              </Button>
            </CardActions>
          </Card>
          {/* card to display total number of covid-19 recovered */}
          <Card sx={{ maxWidth: 345 }} className="dashcard">
            <CardHeader
              title="Total Recovered"
              subheader="September 14, 2021"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Total number of recovered of covid-19
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" className="learn-more-btn">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Typography>
      </Box>
    </Box>
  );
}
