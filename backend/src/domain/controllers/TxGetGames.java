package domain.controllers;

import java.util.ArrayList;

import domain.Game;
import domain.dataCtrl.DataCtrl;
import domain.dataCtrl.GameDataCtrl;

public class TxGetGames {
    private ArrayList<Game> result;

    public TxGetGames(){
    }

    public void execute(){
        DataCtrl dataCtrl = DataCtrl.getInstance();
        GameDataCtrl gdc = dataCtrl.getGameDataCtrl();
        result = gdc.selectAll();
    }

    public ArrayList<Game> getResult(){
        return result;
    }
}