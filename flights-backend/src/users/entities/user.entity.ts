import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("tb_users")
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ name: "created_at" })
  createdAt: Date;

  constructor(
    name: string,
    email: string,
    password: string
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
  }
}