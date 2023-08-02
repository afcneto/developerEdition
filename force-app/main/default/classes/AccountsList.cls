public class AccountsList {    
    @AuraEnabled
    public static List<Account> buscarContas(String name) {
        String strNome = '%'+name+'%';
        List<Account> contas = [SELECT Name, Phone, Email__c 
                                FROM Account 
                                WHERE Name 
                                LIKE :strNome 
                                ORDER BY CreatedDate desc
                                LIMIT 10]; 
        return contas;
    }
}