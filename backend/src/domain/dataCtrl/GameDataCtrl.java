package domain.dataCtrl;

import domain.Game;

import java.util.Date;
import java.util.ArrayList;

public interface GameDataCtrl {
    public boolean insert(Game g);
    public void delete(String playerName, int score, Date scoreDate);
    public void update(Game g);
    public Game select(String playerName, int score, Date scoreDate);
    public ArrayList<Game> selectAll();
}