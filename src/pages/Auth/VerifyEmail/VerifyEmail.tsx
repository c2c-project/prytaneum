// import React from 'react';
// import { useHistory, useParams, Redirect } from 'react-router-dom';

// import VerifyEmailComponent from 'domains/Auth/VerifyEmail';

// interface Params {
//     userId?: string;
// }

// // TODO: make this more resilient -- display an error message to the user instead of just redirecting
// export default function VerifyEmail() {
//     const history = useHistory();
//     const { userId } = useParams();

//     return userId ? (
//         <VerifyEmailComponent
//             userId={userId}
//             onSuccess={() => history.push('/auth/login')}
//             onFailure={() => history.push('/auth/login')}
//         />
//     ) : (
//         <Redirect to='/auth/login' />
//     );
// }
export default {};
