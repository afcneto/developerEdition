@RestResource(urlMapping='/Eventos')
global class ListEventoREST {
    @HttpGet
    global static List<Evento__c> getEventos() {
        return [SELECT Id,
                Name,
                Inicio__c,
                Fim__c
                FROM Evento__c
                WHERE Fim__c >= TODAY];
    }
}