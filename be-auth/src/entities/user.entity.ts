// -  id        String   @id @default(uuid())
// -  email     String
// -  password  String
// -  createdAt DateTime @default(now())
// -  updatedAt DateTime @updatedAt

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => Project, (project) => project.id)
  project: Project;
}
