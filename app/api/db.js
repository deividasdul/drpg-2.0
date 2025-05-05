import pg from "pg";

const PGHOST = "ep-mute-brook-a27kmpdk-pooler.eu-central-1.aws.neon.tech";
const PGDATABASE = "drpg";
const PGUSER = "neondb_owner";
const PGPASSWORD = "npg_MyvWzqGdf4A3";

const pool = new pg.Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  ssl: true,
});

export default pool;
