import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  store_id: process.env.STORE_ID,
  payment_url: process.env.PAYMENT_URL,
  payment_varify_url: process.env.PAYMENT_VERIFY_URL,
  signature_key: process.env.SIGNATURE_KEY,

  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,

  reset_password_ui_link: process.env.RESET_PASSWORD_UL_LINK,
};
