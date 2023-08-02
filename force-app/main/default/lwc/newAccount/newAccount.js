import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; // for toast notification
import ACCOUNT_OBJECT from '@salesforce/schema/Account';  // import object
import AC_NAME from '@salesforce/schema/Account.Name';  // import fields
import AC_WEBSITE from '@salesforce/schema/Account.Website';
//import AC_NUMBER from '@salesforce/schema/Account.AccountNumber';
import AC_EMAIL from '@salesforce/schema/Account.Email__c';
import AC_INDUSTRY from '@salesforce/schema/Account.Industry';
import AC_RATING from '@salesforce/schema/Account.Rating';
import AC_PHONE from '@salesforce/schema/Account.Phone';
import AC_TYPE from '@salesforce/schema/Account.Type';

import { refreshApex } from '@salesforce/apex';
import getAccountList from '@salesforce/apex/AccountHelper.getAccountList';

export default class CreateNewAccount extends LightningElement {
    accountObject = ACCOUNT_OBJECT;  // object type
    accountFields = [AC_NAME, AC_WEBSITE, AC_EMAIL , AC_INDUSTRY, AC_RATING, AC_PHONE, AC_TYPE]; // fields to be showin in form
    rowOffset = 0;
    
    // shows toast message after account creation
    handleAccountCreated(){
        // Run code when account is created.
        const showSuccess = new ShowToastEvent({
            title: 'Success!!',
            message: 'Account has been created',
            variant: 'Success',
        });
        this.dispatchEvent(showSuccess);

        refreshApex(this.accList);
    }

    @track 
    columns = [{
            label: 'Account name',
            fieldName: 'Name',
            type: 'text',
            sortable: true
        },
        {
            label: 'Type',
            fieldName: 'Type',
            type: 'text',
            sortable: true
        },
        {
            label: 'Industry',
            fieldName: 'Industry',
            type: 'Currency',
            sortable: true
        },
        {
            label: 'Phone',
            fieldName: 'Phone',
            type: 'phone',
            sortable: true
        },
        {
            label: 'Website',
            fieldName: 'Website',
            type: 'url',
            sortable: true
        },
        {
            label: 'Rating',
            fieldName: 'Rating',
            type: 'test',
            sortable: true
        },
        {
            label: 'Email',
            fieldName: 'Email__c',
            type: 'email',
            sortable: true
        }
    ];

    @track error;
    @track accList ;
    @wire(getAccountList)
    wiredAccounts({
        error,
        data
    }) {
        if (data) {
            this.accList = data;
        } else if (error) {
            this.error = error;
        }
    }

}