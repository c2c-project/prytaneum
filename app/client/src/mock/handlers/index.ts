import auth from './auth';
import feedbackPortal from './feedbackPortal';
import invite from './invite';
import townhall from './townhall';
import forExample from './for-example';
import team from './teams';
import adminDashboard from './adminDashboard';

export default [
    ...auth,
    ...townhall,
    ...invite,
    ...feedbackPortal,
    ...forExample,
    ...team,
    ...adminDashboard,
];
