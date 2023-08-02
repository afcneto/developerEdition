/********************************************************************************
* Classe responsável por gerar um servico que consulta as contas
*
* NAME: AccountManager.cls
* AUTHOR: Aderson de Farias                             		 DATE: 27/04/2021
*********************************************************************************/
@RestResource(urlMapping='/Accounts/AccountManager/*')
global with sharing class AccountManager {
    @HttpGet
    global static Account getAccountById() {
        RestRequest request = RestContext.request;
        // Pega o Id da conta no final da URL
        String accountId = request.requestURI.substring(
            request.requestURI.lastIndexOf('/')+1);
        Account result =  [SELECT Id,Name,Phone
                           FROM Account
                           WHERE Id =: accountId];
        return result;
    }
    
    @HttpPost
    global static Id createAccount(Account conta) {
        //pega o id do CNAE
        Id cnaeId;
        if (!Test.isRunningTest()){
            /*if (conta.CNAE__c != null) {
                cnaeId = [SELECT Id FROM CNAE__C WHERE Name =: string.ValueOf(conta.CNAE__c)].Id;
                conta.CNAE__c = cnaeId;
            }*/
        }        
        
        insert conta;
        return conta.Id;
    }   
    
    @HttpDelete
    global static void deleteAccount() {
        RestRequest request = RestContext.request;
        String accountId = request.requestURI.substring(
            request.requestURI.lastIndexOf('/')+1);
        Account thisAcc = [SELECT Id FROM Account WHERE Id = :accountId];
        delete thisAcc;
    } 
    
    @HttpPut
    global static Id upsertAccount(Account conta) {
        Account thisAcc = new Account();
        thisAcc = conta;
        // Confirma a conta pelo Id, se presente.
        // Caso contrário, cria uma nova conta.
        upsert thisAcc;
        // Retorna o Id da Conta.
        return thisAcc.Id;
    }
    
    @HttpPatch
    global static ID updateAccountFields() {
        RestRequest request = RestContext.request;
        String accountId = request.requestURI.substring(
            request.requestURI.lastIndexOf('/')+1);
        system.debug(accountId);
        Account thisAcc = [SELECT Id FROM Account WHERE Id =: accountId];
        // Deserialize o JSON string into name-value pairs
        Map<String, Object> params = (Map<String, Object>)JSON.deserializeUntyped(request.requestbody.tostring());
        // Iterate through each parameter field and value         
        Object cnae;
        for(String fieldName : params.keySet()) {
            // Seta o campo e o valor no objeto Conta
            system.debug(fieldName);
            system.debug(params.get(fieldName));
            if(!Test.isRunningTest() && fieldName == 'CNAE__c') cnae = params.get(fieldName);
            else thisAcc.put(fieldName, params.get(fieldName));
        }
        
        if (!Test.isRunningTest()){
            /*Id cnaeId = [SELECT Id FROM CNAE__C WHERE Name =: string.ValueOf(cnae)].Id;
            thisAcc.CNAE__c = cnaeId;*/
        }
        
        update thisAcc;
        return thisAcc.Id;
    }    
}