// import React from 'react';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
// import INTERNAL_LOGIN from './LoginForm';
// import INTERNAL_FORGOT_PASS_REQUEST from './ForgotPassRequest';
// import API from '../../utils/API';

// export default { title: 'Auth' };

// export function Login() {
//     const [status, setStatus] = React.useState(200);
//     API.mock = true;
//     API.resolveWith = { status };
//     const statusMap = {
//         200: 'Succeed',
//         400: 'Fail',
//         0: 'Faulty Connection',
//     };

//     return (
//         <>
//             <Grid container spacing={1} alignItems='center'>
//                 <Grid item xs='auto'>
//                     <Button
//                         onClick={() => {
//                             setStatus(200);
//                             API.resolve = true;
//                         }}
//                         disabled={status === 200}
//                         variant='contained'
//                     >
//                         Succeed
//                     </Button>
//                 </Grid>
//                 <Grid item xs='auto'>
//                     <Button
//                         onClick={() => {
//                             setStatus(400);
//                             API.resolve = true;
//                         }}
//                         disabled={status === 400}
//                         variant='contained'
//                     >
//                         Fail
//                     </Button>
//                 </Grid>
//                 <Grid item xs='auto'>
//                     <Button
//                         onClick={() => {
//                             setStatus(0);
//                             API.fail = true;
//                             API.resolve = false;
//                             API.failWith = new Error('Some error with fetch');
//                         }}
//                         disabled={status === 0}
//                         variant='contained'
//                     >
//                         Cannot connect to server
//                     </Button>
//                 </Grid>
//                 <Grid item xs='auto'>
//                     <Typography>
//                         {`Submission will currently: ${statusMap[status]}`}
//                     </Typography>
//                 </Grid>
//             </Grid>
//             <INTERNAL_LOGIN />
//         </>
//     );
// }

// export function ForgotPassRequest() {
//     const [response, setResponse] = React.useState({
//         status: 200,
//         statusText: 'Ok',
//     });
//     API.mock = true;
//     API.resolveWith = response;
//     const statusMap = {
//         200: 'Succeed',
//         400: 'Fail',
//         0: 'Faulty Connection',
//     };
//     return (
//         <>
//             <Grid container spacing={1} alignItems='center'>
//                 <Grid item xs='auto'>
//                     <Button
//                         onClick={() => {
//                             API.resolve = true;
//                             setResponse({ status: 200, statusText: 'Ok' });
//                         }}
//                         disabled={response.status === 200}
//                         variant='contained'
//                     >
//                         Succeed
//                     </Button>
//                 </Grid>
//                 <Grid item xs='auto'>
//                     <Button
//                         onClick={() => {
//                             API.resolve = true;
//                             setResponse({
//                                 status: 400,
//                                 statusText: 'Bad Request',
//                             });
//                         }}
//                         disabled={response.status === 400}
//                         variant='contained'
//                     >
//                         Fail
//                     </Button>
//                 </Grid>
//                 <Grid item xs='auto'>
//                     <Button
//                         onClick={() => {
//                             setResponse({
//                                 status: 0,
//                                 statusText: 'should not see this',
//                             });
//                             API.fail = true;
//                             API.resolve = false;
//                             API.failWith = new Error('Some error with fetch');
//                         }}
//                         disabled={response.status === 0}
//                         variant='contained'
//                     >
//                         Cannot connect to server
//                     </Button>
//                 </Grid>
//                 <Grid item xs='auto'>
//                     <Typography>
//                         {`Submission will currently: ${
//                             statusMap[response.status]
//                         }`}
//                     </Typography>
//                 </Grid>
//             </Grid>
//             <INTERNAL_FORGOT_PASS_REQUEST />
//         </>
//     );
// }
