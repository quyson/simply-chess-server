interface Config {
  user: string;
  password: string;
  server: string;
  database: string;
  port: number;
  pool: {
    max: number;
    min: number;
    idleTimeoutMillis: number;
  };
  options: {
    trustServerCertificate: boolean;
    trustedConnection: boolean;
    instancename: string;
  };
}

export default Config;
