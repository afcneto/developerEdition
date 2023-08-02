import { LightningElement, wire, track } from "lwc";
import { publish, subscribe, MessageContext } from 'lightning/messageService';
import CART_UPDATED_CHANNEL from '@salesforce/messageChannel/Cart_Updated__c';
import PRODUCTS_UPDATED_CHANNEL from '@salesforce/messageChannel/Products_Updated__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { refreshApex } from '@salesforce/apex';
import getProdutos from '@salesforce/apex/ProdutosController.listaProdutos';

export default class VisualizadorProdutos extends LightningElement {

    showModal = false;

    adding = null;
    record;
    precoProduto;
    @track qtdProduto;

    @wire(getProdutos)
    produtosList;

    handleRowAction(event) {
        this.showModal = true;
        const row = event.detail.row;
        this.record = row;
        //alert(JSON.stringify(this.record));
        this.precoProduto = 'R$ ' + row.preco;
        this.qtdProduto = row.qtde;
    }

    closeModal() {
        this.showModal = false;
    }

    @wire(MessageContext)
    messageContext;

    modalAddToCart() {
        const payload = this.record;
        publish(this.messageContext, CART_UPDATED_CHANNEL, payload);
        const showSuccess = new ShowToastEvent({
            title: 'Success!!',
            message: this.record.nome + ' foi adicionado ao carrinho.',
            variant: 'Success',
        });
        this.dispatchEvent(showSuccess);
        this.showModal = false;
    }

    handleClickView(event) {
        this.showModal = true;
        this.record = event.target.dataset;
        this.precoProduto = 'R$ ' + parseFloat(this.record.preco);
        this.qtdProduto = 'Licenças disponíveis: ' + this.record.qtde;
    }

    handleClickAddToCart(event) {
        const payload = event.target.dataset;

        publish(this.messageContext, CART_UPDATED_CHANNEL, payload);
        const showSuccess = new ShowToastEvent({
            title: 'Success!!',
            message: this.record.nome + ' foi adicionado ao carrinho.',
            variant: 'Success',
        });
        this.dispatchEvent(showSuccess);
        this.showModal = false;
    }

    @wire(MessageContext)
    messageContext2;

    refreshProdutos() {
        this.adding = subscribe(
            this.messageContext2,
            PRODUCTS_UPDATED_CHANNEL,
            (message) => this.handleMessage(message) 
        );
    }

    handleMessage(message) {
        if (message)
            refreshApex(this.produtosList);
    }

    connectedCallback() {
        this.refreshProdutos();
    }
}