// import React from 'react';
// import PropTypes from 'prop-types';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Grid from '@material-ui/core/Grid';
// import Slide from '@material-ui/core/Slide';
// import { makeStyles } from '@material-ui/core/styles';
// import { TabContext } from '../layout/Drawer';

// const useStyles = makeStyles({
//     root: {
//         height: '100%'
//     },
//     tabViews: {
//         flexGrow: 1
//     },
//     maxArea: {
//         height: '100%',
//         width: '100%'
//     }
// });

// export default function ModSession({ pages }) {
//     const [currTab, setTab] = React.useState(0);
//     const [dir, setDir] = React.useState('left');
//     const classes = useStyles();
//     const setTabs = React.useContext(TabContext);
//     React.useEffect(() => {
//         setTabs(
//             <Tabs
//                 value={currTab}
//                 onChange={(e, val) => {
//                     if (val < currTab) {
//                         setDir('right');
//                     } else {
//                         setDir('left');
//                     }
//                     setTab(val);
//                 }}
//             >
//                 {pages.map(({ label }, idx) => (
//                     <Tab label={label} value={idx} key={label} />
//                 ))}
//             </Tabs>
//         );
//         return () => setTabs(null);
//         // eslint-disable-next-line
//     }, [dir, currTab, pages]);
//     return (
//         <Grid container direction='column' className={classes.root}>
//             <Grid item xs='auto' className={classes.tabViews}>
//                 {pages.map(({ component, label }, idx) => (
//                     <div
//                         className={classes.maxArea}
//                         hidden={currTab !== idx}
//                         key={label}
//                     >
//                         <Slide
//                             in={currTab === idx}
//                             direction={dir}
//                             timeout={350}
//                         >
//                             {component}
//                         </Slide>
//                     </div>
//                 ))}
//             </Grid>
//         </Grid>
//     );
// }

// ModSession.propTypes = {
//     pages: PropTypes.arrayOf(
//         PropTypes.shape({
//             label: PropTypes.string.isRequired,
//             component: PropTypes.node.isRequired
//         })
//     ).isRequired
// };
