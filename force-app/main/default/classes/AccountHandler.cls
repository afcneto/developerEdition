public class AccountHandler extends AccountRecordTypeHandler {
    public override void beforeInsert(){
        System.debug('AccountHandler.beforeInsert - init');
        /**
         * Implementa as chamadas das classes e métodos
         */
    }
    
    public override void beforeUpdate(){
        System.debug('AccountHandler.beforeUpdate - init');
        /**
         * Implementa as chamadas das classes e métodos
         */
    }
    
    public override void afterInsert(){
        System.debug('AccountHandler.afterInsert - init');
        /**
         * Implementa as chamadas das classes e métodos
         */
    }
    
    public override void afterUpdate(){
        System.debug('AccountHandler.afterUpdate - init');
        /**
         * Implementa as chamadas das classes e métodos
         */
    }
}