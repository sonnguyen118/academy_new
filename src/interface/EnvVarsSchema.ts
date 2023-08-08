export default interface EnvVarsSchemaInterface {
  NODE_ENV: string;
  PORT: number;
  BASE_URL: string;
  MONGODB_URL: string;
  JWT_SECRET: string;
  SENTRY_DSN: string;
  ROLE_SUPPER_ADMIN: string;
  ROLE_TEACHER_ADMIN: string;
  ROLE_STUDENT_ADMIN: string;
  LIFECYCLE_TEMPORARYTOKEN: string;
  LIFECYCLE_ACCESSTOKEN: string;
  LIFECYCLE_REFRESHTOKEN: string;
  NODE_MAIL_USER: string;
  NODE_MAIL_PASSWORD: string;
}
