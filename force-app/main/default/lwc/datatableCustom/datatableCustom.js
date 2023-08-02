import { LightningElement } from 'lwc';
import generateData from './generateData';

const columns = [
    { label: 'Label', fieldName: 'name', editable: true },
    { label: 'Website', fieldName: 'website', type: 'url', editable: true },
    { label: 'Phone', fieldName: 'phone', type: 'phone', editable: true },
    { label: 'CloseAt', fieldName: 'closeAt', type: 'date-local', editable: true },
    { label: 'Balance', fieldName: 'amount', type: 'currency', editable: true },
    {
        label: 'Tarifa', type: "button",
        typeAttributes: {
            label: 'Initiate',
            name: 'initiate',
            title: 'View',
            disabled: false,
            value: 'view',
            iconPosition: 'left',
            variant: "brand",
            class: { fieldName: 'ModeClass' }
        }
    }
];

export default class DatatableWithInlineEdit extends LightningElement {
    data = [];
    columns = columns;
    rowOffset = 0;

    connectedCallback() {
        this.data = generateData({ amountOfRecords: 100 });
    }
}
