import { LightningElement, track } from 'lwc';

export default class CredentialsCalculator extends LightningElement {
  @track matricula;
  @track cpf;
  @track ano;
  login;
  senha;
  handleMatriculaChange(event) {
    this.matricula = parseInt(event.target.value);
  }
  handleCPFChange(event) {
    this.cpf = parseInt(event.target.value);
  }
  handleAnoChange(event) {
    this.ano = parseInt(event.target.value);
  }
  generate() {
    this.login = this.matricula + String(this.cpf).substr(0,5);
    this.senha = this.matricula + String(this.cpf).substr(parseInt(String(this.cpf).length)-2) + this.ano;
  }
}