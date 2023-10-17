public class EinsteinForDevelopers {
    public static void createAccount(String name, String id) {
        Account acc = new Account();
        acc.Name = name;
        acc.Id = id;
        
        try {
            insert acc;
        } catch (DmlException e) {
            // exception processing
        }
    }

    public static void getAccounts() {
        try {
            List<Account> accounts = [SELECT Id, Name FROM Account];
            for (Account acc : accounts) {
                System.debug(acc);
            }
        } catch (QueryException e) {
            // exception processing
        }
    }

    public static void deleteAccount(String id) {
        try {
            Account acc = [SELECT Id FROM Account WHERE Id = :id];
            delete acc;
        } catch (QueryException e) {
            // exception processing
        } catch (DmlException e) {
            // exception processing
        }
    }

    public static void sendRequest() {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://external-system.com/accounts');
        req.setMethod('POST');

        req.setHeader('Content-Type', 'application/json');
        req.setBody('{"name":"AccountName","id":"12345"}');

        Http http = new Http();

        HttpResponse res = http.send(req);

        if (res.getStatusCode() == 200) {
            // success
        } else {
            // error
        }
    }
}