// import React from 'react';
// import { MemoryRouter, Route, Link } from 'react-router-dom';
// import Tab from '@material-ui/core/Tab';
// import Tabs from '@material-ui/core/Tabs';
// import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';

// import Nav from './Nav';
// import TransitionPage from '../TransitionPage';

// export default { title: 'Layout' };

// function LinkTab(props) {
//     return (
//         <Tab
//             component={Link}
//             // onClick={(event) => {
//             //     event.preventDefault();
//             // }}
//             // eslint-disable-next-line react/jsx-props-no-spreading
//             {...props}
//         />
//     );
// }

// export function NavWithTabs() {
//     const [value, setValue] = React.useState(0);

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };
//     return (
//         <MemoryRouter initialEntries={['/domain/title']}>
//             <Route path='/:domain/:title'>
//                 <Nav
//                     tabs={
//                         <Tabs
//                             variant='fullWidth'
//                             value={value}
//                             onChange={handleChange}
//                             aria-label='nav tabs example'
//                         >
//                             <LinkTab label='Page One' to='/domain/title-one' />
//                             <LinkTab label='Page Two' to='/domain/title-two' />
//                             <LinkTab
//                                 label='Page Three'
//                                 to='/domain/title-three'
//                             />
//                         </Tabs>
//                     }
//                 />

//                 <Box p={3}>
//                     <Typography>{value}</Typography>
//                 </Box>
//             </Route>
//         </MemoryRouter>
//     );
// }

// export function NavWithTransitions() {
//     const [value, setValue] = React.useState(0);

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };
//     const colors = ['red', 'green', 'blue'];
//     return (
//         <MemoryRouter initialEntries={['/domain/title']}>
//             <Route path='/:domain/:title'>
//                 <Nav
//                     tabs={
//                         <Tabs
//                             variant='fullWidth'
//                             value={value}
//                             onChange={handleChange}
//                             aria-label='nav tabs example'
//                         >
//                             <LinkTab label='Page One' to='/domain/title-one' />
//                             <LinkTab label='Page Two' to='/domain/title-two' />
//                             <LinkTab
//                                 label='Page Three'
//                                 to='/domain/title-three'
//                             />
//                         </Tabs>
//                     }
//                 />
//                 <TransitionPage>
//                     <Box p={3} style={{ backgroundColor: colors[value] }}>
//                         <Typography>{value}</Typography>
//                     </Box>
//                 </TransitionPage>
//             </Route>
//         </MemoryRouter>
//     );
// }
