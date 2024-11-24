import { Client } from "pg";

const client = new Client({
  user: "user",
  host: "localhost",
  database: "db",
  password: "pass",
  port: 35432,
});

export default client;
