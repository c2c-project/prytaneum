import auth from './auth';
import feedbackPortal from './feedbackPortal';
import invite from './invite';
import townhall from './townhall';
import forExample from './for-example';

export default [
    ...auth,
    ...townhall,
    ...invite,
    ...feedbackPortal,
    ...forExample,
];
