public with sharing class AccountHelper {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Type, Rating, Industry, Phone, Website, Email__c
                FROM Account
                ORDER BY CreatedDate DESC
                LIMIT 10];
    }
}