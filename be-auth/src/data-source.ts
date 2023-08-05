import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  // dropSchema: true,
  // entities: [__dirname + '/../**/*.entity.{js,ts}'],
  entities: [User],
  migrations: [],
  subscribers: [],
});
