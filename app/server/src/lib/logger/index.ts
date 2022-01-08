import productionLogger from './productionLogger';
import developmentLogger from './developmentLogger';

let logger = developmentLogger();

if (process.env.NODE_ENV === 'production') {
  logger = productionLogger();
}

export default logger
