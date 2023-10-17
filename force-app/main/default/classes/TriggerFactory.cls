/** 
* @author Aderson de Farias Carvalho Neto
* @company --- 
*/
public class TriggerFactory {

    public static void createHandler(Schema.sObjectType soType) {

        if(!trigger.isExecuting){return;}

        ITrigger handler = getHandler(soType);
        if(handler == null){return;}

        execute(handler);
    }

    //Para utilizar de acordo com o Record Type do registro
    public static void createHandlerByRecordType(Schema.sObjectType soType) {
        System.debug('TriggerFactory.createHandlerByRecordType - init');

        Map<Id, Schema.RecordTypeInfo> mapRecordType  = soType.getDescribe().getRecordTypeInfosById();

        Map<String, List<SObject>> mapCasesByRTDeveloperName = new Map<String, List<SObject>>();
        List<SObject> sObjectList = Trigger.new != null ? Trigger.new : Trigger.old;
        
        System.debug('TriggerFactory.createHandlerByRecordType - size: ' + sObjectList.size());

        for(SObject item : sObjectList){
            String key = mapRecordType.get((Id) item.get('RecordTypeId')).getDeveloperName();

            if(!mapCasesByRTDeveloperName.containsKey(key)){
                mapCasesByRTDeveloperName.put(key, new List<SObject>());
            }

            mapCasesByRTDeveloperName.get(key).add(item);
        }

        System.debug('TriggerFactory.createHandlerByRecordType - record types: ' + mapCasesByRTDeveloperName.keySet());

        Map<String, RecordTypeHandler> mapExecucao = RecordTypeHandlerFactory.getMap(soType, mapCasesByRTDeveloperName.keySet());

        System.debug('TriggerFactory.createHandlerByRecordType - mapExecucao: ' + mapExecucao.keySet());
        
        for(String mapKey : mapCasesByRTDeveloperName.keySet()){
            RecordTypeHandler recordTypeHandler = mapExecucao.get(mapKey);
            recordTypeHandler.setSObjectList(mapCasesByRTDeveloperName.get(mapKey));
            execute(recordTypeHandler);
        }
    }
    
    private static void execute(ITrigger handler) {

        if (Trigger.isBefore){
            handler.bulkBefore();

            if(Trigger.isInsert){
                handler.beforeInsert();
            } else if(Trigger.isUpdate){
                handler.beforeUpdate();
            } else if(Trigger.isDelete){
                handler.beforeDelete();
            }
        } else {
            handler.bulkAfter();

            if(Trigger.isInsert){
                handler.afterInsert();
            } else if (Trigger.isUpdate){
                handler.afterUpdate();
            } else if (Trigger.isDelete){
                handler.afterDelete();
            }
        }
        handler.andFinally();
    }

    /**
    * @description Create instance of a class handler dynamically, to work the Handler class must have the name of the object + TriggerHandler.
           Examples:
            CaseTriggerHandler
            MyCustomizedObjectTriggerHandler
    * @param soType
    * @return Instance of class that implements ITrigger interface
    */
    private static ITrigger getHandler(Schema.sObjectType soType) {
        String className = String.valueOf(soType).remove('__c') + 'TriggerHandler';
        try{
            Type t = Type.forName(className);
            ITrigger handler = (ITrigger)t.newInstance();
            return handler;
        }catch(Exception e){
            throw new TypeException('Class TriggerHandler named ' + className + ' not found');
        }
    }
}