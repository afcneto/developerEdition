@RestResource(urlMapping = '/Participante/*')
global class ParticipanteREST {
	@HttpGet
	global static Participante__c getParticipante() {
		Id idParticipante = (Id)RestContext.request.params.get('Id');
		try {
			return [SELECT Id,
					Name,
					Email__c,
					Evento__c,
					Evento__r.Name
					FROM Participante__c
					WHERE Id = :idParticipante];
		} catch (Exception ex) {
			system.debug(ex);
			RestContext.response.statusCode = 404;
			return null;
		}
	}
 
	@HttpPost
	global static Participante__c newParticipante(Participante__c participante) {
		insert participante; 
		return participante;
	}
 
	@HttpPut
	global static Participante__c upsertParticipante(Participante__c participante) {
		upsert participante; 
		return participante;
	}
 
	@HttpPatch
	global static Participante__c updateParticipante(Participante__c participante) {
		update participante; 
		return participante;
	}
 
	@HttpDelete
	global static void deleteParticipante() {
		Id idParticipante = (Id)RestContext.request.params.get('Id');
		Participante__c participante = new Participante__c(Id = idParticipante); 
		delete participante;
	}
}