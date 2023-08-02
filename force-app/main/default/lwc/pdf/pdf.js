import { api, LightningElement } from 'lwc';

export default class Pdf extends LightningElement {
  @api base64;
  pdf;
  fileName;
  
  connectedCallback() {
    this.pdf = `data:application/pdf;base64,${this.base64}`;
    this.fileName = 'example.pdf';
  }


  get pdfSrc() {
    return this.pdf;
  }

}