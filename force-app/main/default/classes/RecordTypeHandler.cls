public abstract class RecordTypeHandler implements ITrigger{
    
    public RecordTypeHandler(){

    }

    public abstract void setSObjectList(List<SObject> sObjectList);
    
    public virtual void bulkBefore(){
        System.debug('RecordTypeHandler.bulkBefore - Not yet Implemented');
	}
	
	public virtual void bulkAfter(){
        System.debug('RecordTypeHandler.bulkAfter - Not yet Implemented');
	}
		
	public virtual void beforeInsert(){
	    System.debug('RecordTypeHandler.beforeInsert - Not yet Implemented');
    }
	
	public virtual void beforeUpdate(){
        System.debug('RecordTypeHandler.beforeUpdate - Not yet Implemented');
    }
	
	public virtual void beforeDelete(){
        System.debug('RecordTypeHandler.beforeDelete - Not yet Implemented');
    }
	
	public virtual void afterInsert(){
        System.debug('RecordTypeHandler.afterInsert - Not yet Implemented');
    }
	
	public virtual void afterUpdate(){
        System.debug('RecordTypeHandler.afterUpdate - Not yet Implemented');
    }
	
	public virtual void afterDelete(){
        System.debug('RecordTypeHandler.afterDelete - Not yet Implemented');
    }

	public virtual void afterUndelete(){
        System.debug('RecordTypeHandler.afterUndelete - Not yet Implemented');
    }

	public virtual void andFinally(){
        System.debug('RecordTypeHandler.andFinally - Not yet Implemented');
    }
}