package domain.controllers;

import java.util.Date;

import domain.Game;
import domain.dataCtrl.DataCtrl;
import domain.dataCtrl.GameDataCtrl;

public class TxAddGame {
    private String playerName;
    private int score;
    private Date scoreDate;
    private boolean result;

    public TxAddGame(String playerName, int score, Date scoreDate){
        this.playerName = playerName;
        this.score = score;
        this.scoreDate = scoreDate;
        result = false;
    }

    public void execute(){
        DataCtrl dataCtrl = DataCtrl.getInstance();
        GameDataCtrl gdc = dataCtrl.getGameDataCtrl();
        Game g = new Game(playerName, score, scoreDate);
        result = gdc.insert(g);
        result = true;
    }

    public boolean getResult(){
        return result;
    }
}