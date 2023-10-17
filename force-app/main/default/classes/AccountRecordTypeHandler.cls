public with sharing class AccountRecordTypeHandler extends RecordTypeHandler{
    protected List<Account> accountList;
    
    public override void setSObjectList(List<SObject> sObjectList){        
        accountList = (List<Account>)sObjectList;
    }
}