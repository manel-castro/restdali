// -  id        String   @id @default(uuid())
// -  email     String
// -  password  String
// -  createdAt DateTime @default(now())
// -  updatedAt DateTime @updatedAt

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
  name: "project",
  // synchronize: true,
})
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  projectName: string;

  @Column()
  domain: string;
}

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

  @ManyToMany(() => Project, (project) => project.id)
  @JoinTable()
  project: Project;
}
