import { LightningElement, api, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getFieldValue } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class MyLwc extends LightningElement {
    @api recordId;

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    @wire(getFieldValue, { recordId: '$recordId', fieldApiName: ACCOUNT_OBJECT.fields.Name })
    accountName;

    get name() {
        return this.accountName.data;
    }
}
