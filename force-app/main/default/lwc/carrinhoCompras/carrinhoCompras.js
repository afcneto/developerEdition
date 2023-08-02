import { LightningElement, wire, track } from "lwc";
import { subscribe, MessageContext } from 'lightning/messageService';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import CART_UPDATED_CHANNEL from '@salesforce/messageChannel/Cart_Updated__c';
import saveRecords from '@salesforce/apex/ProdutosController.atualizaEstoqueProduto';

const colunas = [
    {
        label: 'Produto',
        fieldName: 'nome'
    },
    {
        label: 'Valor R$',
        fieldName: 'preco'
    },
];

export default class CarrinhoCompras extends LightningElement {
    adding = null;
    colunas = colunas;
    @track data = [];
    @track records = [];
    @track totalCart = 0;

    @wire(MessageContext)
    messageContext;

    cartToMessageChannel() {
        this.adding = subscribe(
            this.messageContext,
            CART_UPDATED_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        //alert('messagem: '+JSON.stringify(message));
        this.records.push(message);
        this.data.push(message);
        //alert('this.record: '+JSON.stringify(this.records));

        this.totalCart += parseFloat(message.preco);
    }

    connectedCallback() {
        this.cartToMessageChannel();
    }

    atualizaEstoque() {
        //alert('this.record: '+JSON.stringify(this.records));
        //saveRecords({records:this.records});
        saveRecords({ records: this.records })
            .then(result => {
                //alert('result: '+result)    
                this.records = [];
                this.totalCart = 0;
                const toastEvent = new ShowToastEvent({
                    title: 'Success!',
                    message: 'Compra realizada com sucesso',
                    variant: 'success'
                });
                this.dispatchEvent(toastEvent);
                this.frame();
            })
            .catch(error => {
                this.error = error.message;
                alert(this.error);
            });
    }

}