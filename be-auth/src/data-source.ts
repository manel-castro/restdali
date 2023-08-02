import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgresdb",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  dropSchema: true,

  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  migrations: [],
  subscribers: [],
});
