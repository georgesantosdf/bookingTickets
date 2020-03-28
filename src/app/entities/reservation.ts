import { Address } from './address';

export class Reservation {
    name: string;
    lastName: string;
    cpf: string;
    birthDate: string;
    email: string;

    nameWife: string;
    lastNameWife: string;
    cpfWife: string;
    birthDateWife: string;
    emailWife: string;

    address: Address;

    constructor(name:string, lastName:string, cpf: string, 
      birthDate: string, email: string,nameWife:string, lastNameWife:string, cpfWife:string, birthDateWife:string, emailWife:string, address:Address) {
      this.name = name;
      this.lastName = lastName;
      this.cpf = cpf;
      this.birthDate = birthDate;
      this.email = email;

      this.nameWife = nameWife;
      this.lastNameWife = lastNameWife;
      this.cpfWife = cpfWife;
      this.birthDateWife = birthDateWife;
      this.emailWife = emailWife;
      this.address = address;
    }
  
  }