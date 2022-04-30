package domain.controllers;

import java.util.concurrent.ThreadLocalRandom;

import domain.Phrase;
import domain.dataCtrl.DataCtrl;
import domain.dataCtrl.PhraseDataCtrl;

public class TxGetPhrase {
    private String result;

    public TxGetPhrase(){
    }

    public void execute(){
        DataCtrl dataCtrl = DataCtrl.getInstance();
        PhraseDataCtrl gdc = dataCtrl.getPhraseDataCtrl();
        int biggestIndex = gdc.biggestIndex();
        int toGet = ThreadLocalRandom.current().nextInt(1, biggestIndex + 1);
        Phrase p = gdc.select(toGet);
        result = p.getPhrase();
    }

    public String getResult(){
        return result;
    }
}