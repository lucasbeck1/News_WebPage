// eslint-disable-line no-console
import server from "./app";
import { AppDataSource } from "./db";
import { PORT } from "./config/keys.config";

async function main() {
  try {
    await AppDataSource.initialize();
    server.listen(PORT);
    console.log("Server on port", PORT);
  } catch (error) {
    console.error(error);
  }
}

main();
