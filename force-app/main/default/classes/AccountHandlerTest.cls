@IsTest
public class AccountHandlerTest {
    static testmethod void testInserAccount() {
        Integer numberAccs = 10;
        Test.startTest();
        AccountHandler.insertAccount(numberAccs);
        Integer lstAccounts = [SELECT Count() FROM Account];
        System.AssertEquals(lstAccounts, numberAccs);
        Test.stopTest();
    }
}