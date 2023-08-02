public with sharing class MinutaTestClass {
    
    public class wrapperProposta {
        @AuraEnabled public String name 		{get;set;}
        @AuraEnabled public String phone		{get;set;}
        @AuraEnabled public String email       {get;set;}
    }

    public List<wrapperProposta> lstWp      {get; set;}

    public MinutaTestClass() {
        getAccounts();
    }

    public void getAccounts(){

        List<Account> contas = [SELECT Name, Phone, Email__c 
                                FROM Account 
                                ORDER BY CreatedDate desc
                                LIMIT 1]; 
        
        this.lstWp = new List<wrapperProposta>();
        for (Account acc : contas) {
            wrapperProposta wp = new wrapperProposta();
            wp.name = acc.Name;
            wp.phone = acc.Phone;
            wp.email = acc.Email__c;
            lstWp.add(wp);
        }
        
    }

}