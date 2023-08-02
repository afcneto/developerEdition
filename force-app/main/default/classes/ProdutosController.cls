public with sharing class ProdutosController {
    
    public class wrapperProdutos {
        @AuraEnabled public string nome     {get; set;}
        @AuraEnabled public Decimal preco    {get; set;}
        @AuraEnabled public string id       {get; set;}
        @AuraEnabled public Decimal qtde     {get; set;}
        @AuraEnabled public string imagem   {get; set;}
        @AuraEnabled public string descricao   {get; set;}
    }

    @AuraEnabled(cacheable=true)
    public static List<wrapperProdutos> listaProdutos(){
        
        List<wrapperProdutos> lstWP = new List<wrapperProdutos>();
        for (Produto__c p : [SELECT Id, Name, Preco__c, QuantidadeEmEstoque__c, Imagem__c, Descricao__c FROM Produto__c WHERE QuantidadeEmEstoque__c > 0]) {
            wrapperProdutos wp = new wrapperProdutos();
            wp.id = p.Id;
            wp.nome = p.Name;
            wp.preco = p.Preco__c;
            wp.imagem = p.Imagem__c;
            wp.qtde = p.QuantidadeEmEstoque__c;
            wp.descricao = p.Descricao__c;
            lstWP.add(wp);
            //System.debug(wp);
        }

        return lstWP;

    }

    @AuraEnabled
    public static void atualizaEstoqueProduto(List<wrapperProdutos> records){
        System.debug('produtos: '+records);
        Map<String, Decimal> mapQtde = new Map<String, Decimal>();
        for (wrapperProdutos w : records) {
            if (!mapQtde.containsKey(w.id)){
                mapQtde.put(w.id, 1);
            } else {
                Decimal qtdOld = mapQtde.get(w.id);
                mapQtde.remove(w.id);
                mapQtde.put(w.id, qtdOld + 1);
            }
        }

        List<Produto__c> produtosToUpdate = [SELECT Id, QuantidadeEmEstoque__c FROM Produto__c WHERE Id =: mapQtde.keySet()];
        
        if (produtosToUpdate.isEmpty()) return;

        for (Produto__c p : produtosToUpdate) {
            p.QuantidadeEmEstoque__c = p.QuantidadeEmEstoque__c - mapQtde.get(p.Id);
        }

        try {
            update produtosToUpdate;
        } catch (Exception exp) {
            throw new AuraHandledException(exp.getMessage());
        }
    }
}