import { LightningElement ,api, wire, track} from 'lwc';
import getAccountList from '@salesforce/apex/AccountHelper.getAccountList';
import accountName from '@salesforce/schema/Account.Name';
export default class LightningDatatableLWCExample extends LightningElement {
    @track columns = [{
            label: 'Nome',
            fieldName: 'Name',
            type: 'text',
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
        }
    ];

    filters = {
      street: '',
      addressNumber: '',
      postalCode: ''
    };
 
    @track error;
    @track accList ;
    @wire(getAccountList, { name: 'Stucco Bulk Company', fieldApiName: accountName })
    accounts;

    wiredAccounts({
        error,
        data
    }) {
        if (data) {
            this.accList = data;
        } else if (error) {
          console.log('Deu erro heim!');
            this.error = error;
        }
    }
}