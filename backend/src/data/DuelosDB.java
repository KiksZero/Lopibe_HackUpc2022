package data;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import domain.Duelo;
import domain.dataCtrl.DueloDataCtrl;

public class DuelosDB implements DueloDataCtrl{
    static DuelosDB instance;
    Connection conn;
    PreparedStatement selectStart;
    PreparedStatement selectResult1;
    PreparedStatement selectResult2;
    PreparedStatement selectResult;
    PreparedStatement insert;
    PreparedStatement updateName2;
    PreparedStatement select;
    PreparedStatement updateResults1;
    PreparedStatement updateResults2;

    private DuelosDB(){
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://144.24.196.175:3306/HACKUPC?allowPublicKeyRetrieval=true&useSSL=false", "pibes", "n3guWytmxxmJtx");
            selectStart = conn.prepareStatement("SELECT starts FROM Duelos WHERE id = ?");
            selectResult1 = conn.prepareStatement("SELECT result1 FROM Duelos WHERE id = ?");
            selectResult = conn.prepareStatement("(SELECT result1 AS res FROM Duelos WHERE id = ? AND name2 = ?) UNION (SELECT result2 AS res  FROM Duelos WHERE id = ? AND name1 = ? AND name1 != name2)");
            selectResult2 = conn.prepareStatement("SELECT result2 FROM Duelos WHERE id = ?");
            insert = conn.prepareStatement("INSERT INTO Duelos (name1) VALUES (?)", PreparedStatement.RETURN_GENERATED_KEYS);
            updateName2 = conn.prepareStatement("UPDATE Duelos SET name2 = ? WHERE id = ?");
            updateResults1 = conn.prepareStatement("UPDATE Duelos SET result1 = ? WHERE id = ?");
            updateResults2 = conn.prepareStatement("UPDATE Duelos SET result2 = ? WHERE id = ?");
            select = conn.prepareStatement("SELECT * FROM Duelos WHERE id = ?");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    static public DueloDataCtrl getInstance(){
        if(instance == null) instance = new DuelosDB();
        return instance;
    }

    @Override
    public int insert(String name1) {
        try {
            System.out.println(name1);
            insert.setString(1, name1);
            insert.executeUpdate();
            ResultSet r = insert.getGeneratedKeys();
            if (r.next()) {
                return r.getInt(1);
            }
            return -1;
        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public boolean updateName2(int id, String name2) {
        try {
            updateName2.setString(1, name2);
            updateName2.setInt(2, id);
            updateName2.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean selectStarts(int id) {
        try {
            selectStart.setInt(1, id);
            ResultSet r = selectStart.executeQuery();
            if (r.next()) {
                return r.getBoolean("starts");
            }
            return false;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean updateResult1(int id, int result) {
        try {
            updateResults1.setInt(1, result);
            updateResults1.setInt(2, id);
            updateResults1.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean updateResult2(int id, int result) {
        try {
            updateResults2.setInt(1, result);
            updateResults2.setInt(2, id);
            updateResults2.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public int selectResult1(int id) {
        try {
            selectResult1.setInt(1, id);
            ResultSet r = selectResult1.executeQuery();
            if (r.next()) {
                return r.getInt("result1");
            }
            return -1;
        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public Duelo select(int id) {
        try {
            select.setInt(1, id);
            ResultSet r = select.executeQuery();
            if (r.next()) {
                boolean starts = r.getBoolean("starts");
                String name1 = r.getString("name1");
                String name2 = r.getString("name2");
                int result1 = r.getInt("result1");
                int result2 = r.getInt("result2");
                return new Duelo(id, starts, name1, name2, result1, result2);
            }
            return null;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public int selectResult2(int id) {
        try {
            selectResult2.setInt(1, id);
            ResultSet r = selectResult2.executeQuery();
            if (r.next()) {
                return r.getInt("result1");
            }
            return -1;
        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public int selectResult(int id, String name) {
        try {
            selectResult.setInt(1, id);
            selectResult.setString(2, name);
            selectResult.setInt(3, id);
            selectResult.setString(4, name);
            ResultSet r = selectResult.executeQuery();
            if (r.next()) {
                return r.getInt("res");
            }
            return -1;
        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        }
    }
}
