import * as Sentry from '@sentry/node';
// import config from '@config/index';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  serverName: process.env.BASE_URL,
  debug: process.env.NODE_ENV !== 'production',
  enabled: true,
});

export default Sentry;
