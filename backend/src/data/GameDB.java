package data;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

import domain.Game;
import domain.dataCtrl.GameDataCtrl;

import java.util.ArrayList;
import java.util.Date;

public class GameDB implements GameDataCtrl{
    static GameDB instance;
    Connection conn;
    PreparedStatement insert;
    PreparedStatement update;
    PreparedStatement delete;
    PreparedStatement select;
    PreparedStatement selectAll;

    private GameDB(){
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://144.24.196.175:3306/HACKUPC?allowPublicKeyRetrieval=true&useSSL=false", "pibes", "pibes");
            insert = conn.prepareStatement("INSERT INTO Game(playerName, score, scoreDate) VALUES (?, ?, ?)");
            select = conn.prepareStatement("SELECT * FROM Game WHERE playerName = ? AND score = ? AND scoreDate = ?");
            selectAll = conn.prepareStatement("SELECT * FROM Game ORDER BY score DESC");
            delete = conn.prepareStatement("DELETE FROM Game WHERE playerName = ? AND score = ? AND scoreDate = ?");
            update = conn.prepareStatement("UPDATE Game SET playerName = ?, score = ? WHERE scoreDate = ?");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    static public GameDB getInstance(){
        if(instance == null) instance = new GameDB();
        return instance;
    }

    public boolean insert(Game g){
        try {
            insert.setString(1, g.getPlayerName());
            insert.setInt(2, g.getScore());
            Timestamp ts = new Timestamp(g.getScoreDate().getTime());
            insert.setTimestamp(1, ts);
            insert.executeUpdate();
            ResultSet r = insert.getGeneratedKeys();
            if (r.next()) {
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public void delete(String playerName, int score, Date scoreDate){
        try {
            delete.setString(1, playerName);
            delete.setInt(1, score);
            Timestamp ts = new Timestamp(scoreDate.getTime());
            delete.setTimestamp(1, ts);
            delete.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void update(Game g){
        try {
            update.setString(1, g.getPlayerName());
            update.setInt(2, g.getScore());
            Timestamp ts = new Timestamp(g.getScoreDate().getTime());
            update.setTimestamp(1, ts);
            update.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public Game select(String playerName, int score, Date scoreDate){
        try {
            select.setString(1, playerName);
            select.setInt(1, score);
            Timestamp ts = new Timestamp(scoreDate.getTime());
            select.setTimestamp(1, ts);
            ResultSet r = select.executeQuery();
            while(r.next()) {
                playerName = r.getString("playerName");
                score = r.getInt("score");
                scoreDate = r.getDate("scoreDate");
                Game s = new Game(playerName, score, scoreDate);
                return s;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public ArrayList<Game> selectAll(){
        ArrayList<Game> ret = new ArrayList<Game> ();
        try {
            ResultSet r = selectAll.executeQuery();
            while(r.next()) {
                String playerName = r.getString("playerName");
                int score = r.getInt("score");
                Date scoreDate = r.getDate("scoreDate");
                Game g = new Game(playerName, score, scoreDate);
                ret.add(g);
            }
            return ret;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
