public class AccountHandler {
    public static void insertAccount(Integer numberAcct){
        
        Integer counter = 1;
        List<Account> addAccounts = new List<Account>();
        
        while(counter <= numberAcct){
            //create a new account
            Account acc = new Account();
            acc.Name = 'Acme Inc ' + counter;
            acc.AccountNumber = 'A000' + counter;
            acc.Email__c = 'email' + counter + '@email.com';
            addAccounts.add(acc);
            system.debug('acc: '+acc);
            //increment the counter
            counter = counter + 1;
        }
        
        insert(addAccounts);

    } 
}