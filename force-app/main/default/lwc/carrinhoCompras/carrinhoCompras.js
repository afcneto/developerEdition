import { LightningElement, wire, track } from "lwc";
import { subscribe, publish, MessageContext } from 'lightning/messageService';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import CART_UPDATED_CHANNEL from '@salesforce/messageChannel/Cart_Updated__c';
import PRODUCTS_UPDATED_CHANNEL from '@salesforce/messageChannel/Products_Updated__c';
import saveRecords from '@salesforce/apex/ProdutosController.atualizaEstoqueProduto';

export default class CarrinhoCompras extends LightningElement {
    adding = null;
    
    @track data = [];
    @track records = null;
    @track totalCart = 0;
    @track emptyCart = true;
    @track error;

    @wire(MessageContext)
    messageContext;

    imagem = 'https://www.pngkit.com/png/detail/411-4110678_carrinho-de-compras-vazio-shopping-cart.png';

    cartToMessageChannel() {
        this.adding = subscribe(
            this.messageContext,
            CART_UPDATED_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        if (this.records === null) this.records = [];
        this.records.push(message);
        this.data.push(message);
        this.totalCart += parseFloat(message.preco);
        this.emptyCart = false;
    }

    connectedCallback() {
        this.cartToMessageChannel();
    }

    @wire(MessageContext)
    messageContext2;
    finalizaCompra() {
        saveRecords({ records: this.records })
            .then(result => {
                //alert('result: '+result)   
                publish(this.messageContext2, PRODUCTS_UPDATED_CHANNEL, this.records); 
                this.records = null;
                this.emptyCart = true;
                this.totalCart = 0;
                this.toast('Success!', 'Compra realizada com sucesso', 'success');                
                
            })
            .catch(error => {
                this.error = error.message;
                this.toast('Erro!', this.error, 'error');
            });
    }

    limpaCarrinho() {
        this.records = null;
        this.emptyCart = true;
        this.totalCart = 0;
        this.toast('Success!', 'Seu carrinho está vazio!', 'success');
    }

    toast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }
}