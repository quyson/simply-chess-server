interface SqlConfig {
  user: string;
  password: string;
  database: string;
  server: string;
  pool: {
    max: number;
    min: number;
    idleTimeoutMillis: number;
  };
  options: {
    encrypt: boolean;
    trustServerCertificate: boolean;
  };
}

export default SqlConfig;
