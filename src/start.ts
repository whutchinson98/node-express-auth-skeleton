import * as logger from './utils/logger';
import app from './index';
const appAny:any = app;

// CONSTANTS
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

appAny.listen(PORT, () => {
  logger.logDebug(`Running on http://${HOST}:${PORT}`);
});
