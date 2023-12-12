import sql from "mssql";
import config from "../config/database";
import Config from "../interface/database";

const ConnectServer = async (config: Config) => {
  try {
    console.log("config", config);
    const result = await sql.connect(config);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

export default ConnectServer;
