import { Pool } from "pg";

const pool = new Pool({
  user: "user",
  host: "host.docker.internal", //localhost
  database: "db",
  password: "pass",
  port: 35432,
});

export default pool;
