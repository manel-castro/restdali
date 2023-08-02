// -  id        String   @id @default(uuid())
// -  email     String
// -  password  String
// -  createdAt DateTime @default(now())
// -  updatedAt DateTime @updatedAt

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
