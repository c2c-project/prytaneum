import auth from './auth';
import feedbackPortal from './feedbackPortal';
import townhall from './townhall';
import mock from './mock';

export default [...auth, ...townhall, ...feedbackPortal, ...mock];
