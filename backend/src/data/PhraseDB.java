package data;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import domain.Phrase;
import domain.dataCtrl.PhraseDataCtrl;

public class PhraseDB implements PhraseDataCtrl{
    static PhraseDB instance;
    Connection conn;
    PreparedStatement select;
    PreparedStatement biggestIndex;

    private PhraseDB(){
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://144.24.196.175:3306/HACKUPC?allowPublicKeyRetrieval=true&useSSL=false", "pibes", "pibes");
            select = conn.prepareStatement("SELECT * FROM Frases WHERE idFrase = ?");
            biggestIndex = conn.prepareStatement("SELECT MAX(idFrase) as max_int FROM Frases");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    static public PhraseDB getInstance(){
        if(instance == null) instance = new PhraseDB();
        return instance;
    }

    public Phrase select(int idPhrase){
        try {
            select.setInt(1, idPhrase);
            ResultSet r = select.executeQuery();
            while(r.next()) {
                String phrase = r.getString("frase");
                Phrase s = new Phrase(idPhrase, phrase);
                return s;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return new Phrase(1, "ERROR");
    }

    public int biggestIndex(){
        try {
            ResultSet r = biggestIndex.executeQuery();
            while(r.next()) {
                int idPhrase = r.getInt("max_int");
                return idPhrase;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 1;
    }
}
