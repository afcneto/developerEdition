({
	packItem : function(component, event, helper) {
		var item = component.get(v.item);
        item.Packed__c = true;
        component.set("v.item", item);
        
        var btn = event.getSource();
        document.getElementById(btn.id).disabled=true;
	}
})