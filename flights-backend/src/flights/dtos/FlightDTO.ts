import { Flight } from '@flights/entities/flight.entity';

export class FlightDTO {
  id: number;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departure: Date;
  arrival: Date;
  price: number;

  constructor(flight: Flight) {
    this.id = flight.id;
    this.flightNumber = flight.flightNumber;
    this.airline = flight.airline;
    this.origin = flight.origin;
    this.destination = flight.destination;
    this.departure = flight.departure;
    this.arrival = flight.arrival;
    this.price = flight.price;
  }
}