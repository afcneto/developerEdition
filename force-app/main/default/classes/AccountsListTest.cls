@IsTest
public with sharing class AccountsListTest {
    @TestSetup
    static void makeData(){
        Test.loadData(Contact.sObjectType, 'staticResource');

        
    }
    static testmethod void run(){
        System.debug([SELECT Id, name FROM Contact]);
    }
}