({
    init: function(component, event, helper) {
        component.set('v.mycolumns', [
            	{label: 'Nome', fieldName: 'Name', type: 'text'},
                {label: 'Telefone', fieldName: 'Phone', type: 'text'},
                {label: 'E-mail', fieldName: 'Email__c', type: 'Text'}
            ]);
    },

    buscar: function(component, event, helper) { 
        var action = component.get("c.buscarContas");
        
        let hostname = window.location.hostname;
        alert("Domínio: " + hostname);
        
        action.setParams({
            "name" : component.get("v.nome")            
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.acctList", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
        
    sair: function(cmp, evt, hlp) {             
        window.location.replace(origin + "/secur/logout.jsp");
    }
})