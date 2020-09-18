// import React from 'react';

// import history from 'utils/history';
// import Fixtures, { Fixture } from 'mock/Fixtures';
// import Page from '.';

// const options = {
//     success: {
//         meta: {
//             status: 200,
//             statusText: 'OK',
//         },
//     },
//     failure: {
//         meta: {
//             status: 500,
//             statusText: 'Internal Server Error',
//         },
//     },
// };
// export default {
//     title: 'Pages/Auth',
//     component: Page,
//     argTypes: {
//         outcome: {
//             control: {
//                 type: 'select',
//                 options,
//             },
//         },
//     },
// };

// const Helper = () => {
//     const history = useHistory();
//     const [time, setTime] = React.useState(5);
//     React.useEffect(() => {
//         const handle = setTimeout(() => history.goBack(), 5000);
//         const handle2 = setInterval(() => setTime((t) => t - 1), 1000);
//         return () => {
//             clearTimeout(handle);
//             clearTimeout(handle2);
//         };
//     }, []);
//     return <h1>{`Redirecting in ${time}`}</h1>;
// };

// export function VerifyEmail({
//     outcome,
// }: {
//     outcome: Fixture<Record<string, unknown>>;
// }) {
//     return (
//         <Fixtures.Provider value={outcome}>
//             <MemoryRouter initialEntries={['/123456']}>
//                 <Switch>
//                     <Route path='/auth/login'>
//                         <Helper />
//                     </Route>
//                     <Route path='/:userId'>
//                         <Page />
//                     </Route>
//                 </Switch>
//             </MemoryRouter>
//         </Fixtures.Provider>
//     );
// }

// VerifyEmail.args = { outcome: options.success };
// FIXME: with the new routing/history here

export default { title: 'FIXME' };
