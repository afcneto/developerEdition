import { LightningElement, api, wire, track } from "lwc";
import { publish, MessageContext } from 'lightning/messageService';
import CART_UPDATED_CHANNEL from '@salesforce/messageChannel/Cart_Updated__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from "lightning/uiRecordApi";

import { refreshApex } from '@salesforce/apex';
import getProdutos from '@salesforce/apex/ProdutosController.listaProdutos';

const colunas = [{
        label: 'Produto',
        fieldName: 'nome'
    },
    {
        label: 'Descrição',
        fieldName: 'descricao'
    },
    {
        type: 'action',
        typeAttributes: { rowActions: [
            { label: 'Ver detalhes', name: 'ver_detalhes' }
        ] }
    }
];

export default class VisualizadorProdutos extends LightningElement {
        
    colunas = colunas;
    showModal = false;

    record;
    precoProduto;
    qtdProduto;

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
        this.qtdProduto = 'Licenças disponíveis: '+ this.record.qtde;
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
}