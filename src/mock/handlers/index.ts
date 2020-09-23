import auth from './auth';
import feedbackPortal from './feedbackPortal';
import townhall from './townhall';
import team from './teams';

export default [...auth, ...townhall, ...feedbackPortal, ...team];
