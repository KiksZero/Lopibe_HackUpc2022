package domain.dataCtrl;

import data.GameDB;
import data.PhraseDB;

public class DataCtrl{
    static DataCtrl instance;

    public static DataCtrl getInstance(){
        if(instance == null) instance = new DataCtrl();
        return instance;
    }

    public GameDataCtrl getGameDataCtrl(){
        return GameDB.getInstance();
    }

    public PhraseDataCtrl getPhraseDataCtrl(){
        return PhraseDB.getInstance();
    }
}