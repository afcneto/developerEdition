public class TesteAccount {
    public static void Execute(){
        List<Contact> ctts = new List<Contact>();
        for(Account acc :(List<Account>)Trigger.New){
            Contact ct = new Contact();
            ct.FirstName = 'Contact from';
            ct.LastName = acc.Name;
            ct.AccountId = acc.Id;
            ctts.add(ct);
        }        
        insert ctts;
    }
}