import { buildProductionLogger } from './productionLogger';
import { buildDevelopmentLogger } from './developmentLogger';

let logger = buildProductionLogger();

if (process.env.NODE_ENV === 'development') {
    logger = buildDevelopmentLogger();
}
export default logger;
