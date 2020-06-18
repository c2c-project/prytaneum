// import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Divider from '@material-ui/core/Divider';
// import Drawer from '@material-ui/core/Drawer';
// import Hidden from '@material-ui/core/Hidden';
// import IconButton from '@material-ui/core/IconButton';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import MenuIcon from '@material-ui/icons/Menu';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import { useParams, Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// // import circle from '../assets/spp-circle.png';
// import banner from '../assets/spp-banner.png';

// import { parseTitle } from './utils';

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         width: '100%',
//         height: '100%',
//     },
//     drawer: {
//         [theme.breakpoints.up('sm')]: {
//             width: drawerWidth,
//             flexShrink: 0,
//         },
//     },
//     appBar: {
//         [theme.breakpoints.up('sm')]: {
//             width: `calc(100% - ${drawerWidth}px)`,
//             marginLeft: drawerWidth,
//         },
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//         [theme.breakpoints.up('sm')]: {
//             display: 'none',
//         },
//     },
//     toolbar: theme.mixins.toolbar,
//     drawerPaper: {
//         width: drawerWidth,
//     },
//     content: ({ tabState }) => ({
//         flexGrow: 1,
//         height: '100%',
//         // [theme.breakpoints.down('xs')]: {
//         paddingTop: tabState ? '112px' : '64px',
//         // }
//     }),
//     banner: {
//         padding: `${theme.spacing(2)}px ${theme.spacing(1)}px ${theme.spacing(
//             2
//         )}px ${theme.spacing(1)}px`,
//     },
//     logo: {
//         bottom: '0',
//         position: 'absolute',
//         // left: '50px', // offset to center it
//         width: '100%',
//     },
//     img: {
//         width: '100%',
//         height: 'auto',
//     },
// }));

// const config = [
//     { label: 'Sessions', to: '/app/sessions/list' },
//     { label: 'Session Summary', to: '/app/sessions/summary' },
//     // { label: 'Calendar', to: '/calendar' },
//     // { label: 'Chat', to: '/app/chat/0' },
//     { label: 'Logout', to: '/logout' },
// ];

// export const TabContext = React.createContext(null);

// function ResponsiveDrawer({ children }) {
//     const theme = useTheme();
//     const [mobileOpen, setMobileOpen] = React.useState(false);
//     const { title } = useParams();
//     const [tabState, setTabs] = React.useState(null);
//     // TODO: add effects for if it is selected
//     // eslint-disable-next-line
//     const [selected, setSelected] = React.useState('');
//     const classes = useStyles({ tabState });

//     const handleDrawerToggle = () => {
//         setMobileOpen(!mobileOpen);
//     };

//     const drawer = (
//         <div style={{ height: '100%' }}>
//             <div className={classes.banner}>
//                 <img
//                     className={classes.img}
//                     src={banner}
//                     alt='spp-logo-circle'
//                 />
//             </div>
//             {/* <div className={classes.toolbar} /> */}
//             <Divider />
//             <List>
//                 {config.map(({ label, to }) => (
//                     <ListItem
//                         component={Link}
//                         to={to}
//                         button
//                         onClick={() => setSelected(label)}
//                         key={label}
//                     >
//                         <ListItemText primary={label} />
//                     </ListItem>
//                 ))}
//             </List>
//             <Divider />
//             {/* <div className={classes.logo}>
//                 <Grid container justify='center'>
//                     <Grid item xs={6}>
//                         <img
//                             className={classes.img}
//                             src={circle}
//                             alt='spp-logo-circle'
//                         />
//                     </Grid>
//                 </Grid>
//             </div> */}
//         </div>
//     );

//     return (
//         <div className={classes.root}>
//             <AppBar className={classes.appBar}>
//                 <Toolbar>
//                     <IconButton
//                         color='inherit'
//                         aria-label='open drawer'
//                         edge='start'
//                         onClick={handleDrawerToggle}
//                         className={classes.menuButton}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography variant='h6' noWrap>
//                         {parseTitle(title)}
//                     </Typography>
//                 </Toolbar>
//                 {tabState}
//             </AppBar>
//             <nav className={classes.drawer}>
//                 <Drawer
//                     variant='temporary'
//                     anchor={theme.direction === 'rtl' ? 'right' : 'left'}
//                     open={mobileOpen}
//                     onClose={handleDrawerToggle}
//                     classes={{
//                         paper: classes.drawerPaper,
//                     }}
//                     ModalProps={{
//                         keepMounted: true, // Better open performance on mobile.
//                     }}
//                 >
//                     {drawer}
//                 </Drawer>
//                 <Hidden xsDown implementation='css'>
//                     <Drawer
//                         classes={{
//                             paper: classes.drawerPaper,
//                         }}
//                         variant='permanent'
//                         open
//                     >
//                         {drawer}
//                     </Drawer>
//                 </Hidden>
//             </nav>
//             <main className={classes.content}>
//                 <TabContext.Provider value={(tabs: []) => setTabs(tabs)}>
//                     {children}
//                 </TabContext.Provider>
//             </main>
//         </div>
//     );
// }

// ResponsiveDrawer.propTypes = {
//     children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
// };

// export default ResponsiveDrawer;

export default {};
