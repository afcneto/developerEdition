trigger Account_Before on Account (after insert, after update) {
	if(Trigger.isAfter && Trigger.isInsert){
        TesteAccount.Execute();
    }
}