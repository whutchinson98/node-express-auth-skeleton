import app from './index';
const appAny:any = app;

// CONSTANTS
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

appAny.listen(PORT, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
