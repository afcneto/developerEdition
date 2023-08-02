import { LightningElement, track, api } from 'lwc';

import objectName from '@salesforce/schema/Account';

export default class Favorite extends LightningElement {
    @track likeState = false;
    followState = 'Follow';
    objectApiName = objectName;
    @api recordId;

    handleLikeButtonClick() {
        this.likeState = !this.likeState;
        this.followState = this.followState == 'Follow' ? 'Followed' : 'Follow';
    }
}