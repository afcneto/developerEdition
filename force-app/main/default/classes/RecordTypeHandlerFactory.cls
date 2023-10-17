public with sharing class RecordTypeHandlerFactory {
    public static Map<String, RecordTypeHandler> getMap(Schema.sObjectType sobjectType, Set<String> rtDeveloperNames){
        // Logica para obter De-Para recordType devName -> RecordTypeHandler
        // 1) configuração personalizada (sem query, numero de dados limitado)
        // 2) manipular o developerName (contra: alguns nomes de tipo de registro são bastante extensos)
        // 3) Metadado Personalizado (Contra precisaria de query porém seria mais fácil extender para outros objetos)
        String sObjectName = String.valueOf(sobjectType);

        System.debug('RecordTypeHandlerFactory.getMap - sObjectName: ' + sObjectName);
        System.debug('RecordTypeHandlerFactory.getMap - rtDeveloperNames: ' + rtDeveloperNames);

        List<RecordTypeHandlerClass__mdt> classes = [SELECT ClassName__c, RecordTypeDeveloperName__c 
                                                        FROM RecordTypeHandlerClass__mdt 
                                                        WHERE sObjectType__c = :sObjectName
                                                        AND RecordTypeDeveloperName__c IN :rtDeveloperNames];
        
        Map<String, RecordTypeHandler> mapHandlers = new Map<String, RecordTypeHandler>();
        for(RecordTypeHandlerClass__mdt clazz : classes){
            Type t = Type.forName(clazz.ClassName__c);
            mapHandlers.put(clazz.RecordTypeDeveloperName__c, (RecordTypeHandler)t.newInstance());
        }

        return mapHandlers;
    }
}