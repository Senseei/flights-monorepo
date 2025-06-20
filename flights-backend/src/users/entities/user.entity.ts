import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  Unique,
} from 'typeorm';
import { DomainEntity } from '@common/domain.entity';
import { Flight } from '@flights/entities/flight.entity';

@Entity("tb_users")
@Unique(["email"])
export class User extends DomainEntity {
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;

  @ManyToMany(() => Flight)
  @JoinTable({
    name: "tb_user_bookmarks",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "flight_id", referencedColumnName: "id" },
  })
  bookmarks: Flight[];

  constructor(
    name: string,
    email: string,
    password: string
  ) {
    super();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}