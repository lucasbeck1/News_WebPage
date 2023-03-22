import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3001;
export const db_type = process.env.db_type || "mysql";
export const db_host = process.env.db_host || "localhost";
export const db_name = process.env.db_name || "db_name";
export const db_port: number = Number(process.env.db_port) || 3306;
export const db_username = process.env.db_username || "db_username";
export const db_password = process.env.db_password || "db_password";
