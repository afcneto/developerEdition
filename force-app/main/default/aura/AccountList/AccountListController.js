({
    fetchAccounts: function(component, event, helper) {
        component.set('v.mycolumns', [
            	{label: 'Account Name', fieldName: 'Name', type: 'text'},
                {label: 'Industry', fieldName: 'Industry', type: 'text'},
                {label: 'Type', fieldName: 'Type', type: 'Text'},
                {label: 'Button', fieldName: 'Type', type: 'button', iconName: 'utility:chevrondown', 
                    typeAttributes:{
                        label: 'Seleccione',
                        name: 'seleccione',
                        title: 'Seleccione',
                        disabled: false,
                        iconPosition: 'right',
                        value: 'Seleccione',
                    },
                },
            ]);
        var action = component.get("c.fetchAccts");
        action.setParams({
            
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.acctList", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    buscar: function(component, event, helper) {
        component.set('v.mycolumns', [
            {label: 'Account Name', fieldName: 'Name', type: 'text'},
            {label: 'Industry', fieldName: 'Industry', type: 'text'},
            {label: 'Type', fieldName: 'Type', type: 'Text'}
        ]);
        var action = component.get("c.buscar");
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
    }
})