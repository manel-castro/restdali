// -  id        String   @id @default(uuid())
// -  email     String
// -  password  String
// -  createdAt DateTime @default(now())
// -  updatedAt DateTime @updatedAt

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "user",
  // synchronize: true,
})
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  project: Project;
}

@Entity({
  name: "project",
  // synchronize: true,
})
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  projectName: string;
}
