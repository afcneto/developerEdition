/** 
* @author Aderson de Farias Carvalho Neto
* @company ---
* @description Trigger do Objeto Quote
*/
trigger CaseTrigger on Case (before insert, before update, before delete, after insert, after update, after delete) {
    TriggerFactory.createHandler(Case.sObjectType);
}