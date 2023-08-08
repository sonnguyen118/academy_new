import * as dotenv from 'dotenv';
import * as path from 'path';
import * as Joi from 'joi';
import EnvVarsSchemaInterface from 'src/interface/EnvVarsSchema';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema: Joi.ObjectSchema<EnvVarsSchemaInterface> = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: Joi.number().required().description('port'),
    BASE_URL: Joi.string().required().description('port'),
    MONGODB_URL: Joi.string().required().description('Db mongo url'),
    JWT_SECRET: Joi.string().required().description('jwt secret for custom'),
    SENTRY_DSN: Joi.string().required().description('sentry dsn'),
    ROLE_SUPPER_ADMIN: Joi.string()
      .required()
      .description('title of role admin'),
    ROLE_TEACHER_ADMIN: Joi.string()
      .required()
      .description('title of role admin'),
    ROLE_STUDENT_ADMIN: Joi.string()
      .required()
      .description('title of role admin'),
    LIFECYCLE_TEMPORARYTOKEN: Joi.string()
      .required()
      .description('life cycle of role temporary token'),
    LIFECYCLE_ACCESSTOKEN: Joi.string()
      .required()
      .description('life cycle of role access token'),
    LIFECYCLE_REFRESHTOKEN: Joi.string()
      .required()
      .description('life cycle of role refresh token'),
    NODE_MAIL_USER: Joi.string()
      .required()
      .description('account mail for send mail to student'),
    NODE_MAIL_PASSWORD: Joi.string().required().description('pass app gmail'),
  })
  .unknown();

const { value, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);
const envVars: EnvVarsSchemaInterface = value;

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  base_url: envVars.BASE_URL,
  mongo_url: envVars.MONGODB_URL,
  jwt: envVars.JWT_SECRET,
  sentry_dsn: envVars.SENTRY_DSN,
  supper_admin: envVars.ROLE_SUPPER_ADMIN,
  teacher_admin: envVars.ROLE_TEACHER_ADMIN,
  student: envVars.ROLE_STUDENT_ADMIN,
  lifecycle_temporarytoken: envVars.LIFECYCLE_TEMPORARYTOKEN,
  lifecycle_accesstoken: envVars.LIFECYCLE_ACCESSTOKEN,
  lifecycle_refreshtoken: envVars.LIFECYCLE_REFRESHTOKEN,
  nodemail_user: envVars.NODE_MAIL_USER,
  nodemail_password: envVars.NODE_MAIL_PASSWORD,
};
