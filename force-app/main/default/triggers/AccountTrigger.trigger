/** 
* @author Aderson de Farias Carvalho Neto
* @company ---
* @description Trigger do Objeto Account
*/
trigger AccountTrigger on Account (before insert, before update, before delete, after insert, after update, after delete) {
    TriggerFactory.createHandlerByRecordType(Account.sObjectType);
}