import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import ACCOUNT_ID_FIELD from '@salesforce/schema/Contact.AccountId';

export default class MyComponent extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_ID_FIELD] })
    account;

    @wire(getFieldValue, { record: '$account', field: ACCOUNT_ID_FIELD})
    accountId;

    @wire(getRecord, { recordId: '$accountId', objectApiName: CONTACT_OBJECT })
    relatedContacts;

    get contacts() {
        return this.relatedContacts.data.records;
    }
}