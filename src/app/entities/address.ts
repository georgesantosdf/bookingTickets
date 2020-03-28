export class Address {
  cep: string;
  address: string;
  country: string;
  state: string;
  telephone: string;

  constructor(cep: string, address:string, country:string, state: string, telephone:string){
    this.cep = cep;
    this.address = address;
    this.country = country
    this.state = state;
    this.telephone = telephone;
  }
}