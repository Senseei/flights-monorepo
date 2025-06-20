import { Column, Entity } from 'typeorm';
import { DomainEntity } from '@common/domain.entity';

@Entity("tb_flights")
export class Flight extends DomainEntity {

  @Column({name: "flight_number"})
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  @Column({type: "timestamptz"})
  departure: Date;
  @Column({type: "timestamptz"})
  arrival: Date;
  price: number;

  constructor(flightNumber: string, airline: string, origin: string, destination: string, departure: Date, arrival: Date, price: number) {
    super();
    this.flightNumber = flightNumber;
    this.airline = airline;
    this.origin = origin;
    this.destination = destination;
    this.departure = departure;
    this.arrival = arrival;
    this.price = price;
  }
}