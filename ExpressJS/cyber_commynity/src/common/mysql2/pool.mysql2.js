import mysql from "mysql2/promise";
import { DATABASE_URL } from "../constant/app.constant";

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
   // host: "localhost",
   // user: "root",
   // database: "db_cyber_community",
   // port: `3307`,
   // password: `1234`,
   uri: DATABASE_URL,

   waitForConnections: true,
   connectionLimit: 10,
   maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
   idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
   queueLimit: 0,
   enableKeepAlive: true,
   keepAliveInitialDelay: 0,
});

export default pool;
