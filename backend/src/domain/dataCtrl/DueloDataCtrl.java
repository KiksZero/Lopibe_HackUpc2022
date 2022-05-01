package domain.dataCtrl;

import domain.Duelo;

public interface DueloDataCtrl {
    public int insert(String name1);
    public boolean updateName2(int id, String name2);
    public boolean selectStarts(int id);
    public int selectResult1(int id);
    public int selectResult2(int id);
    public int selectResult(int id, String name);
    public boolean updateResult1(int id, int result);
    public boolean updateResult2(int id, int result);
    public Duelo select(int id);
}