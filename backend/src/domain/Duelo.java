package domain;

public class Duelo {
    Integer id;
    Boolean starts;
    String name1;
    String name2;
    Integer result1;
    Integer result2;
    
    public Integer getId() {
        return id;
    }

    public Boolean getStarts() {
        return starts;
    }

    public void setStarts(Boolean starts) {
        this.starts = starts;
    }

    public String getName1() {
        return name1;
    }

    public void setName1(String name1) {
        this.name1 = name1;
    }

    public String getName2() {
        return name2;
    }

    public void setName2(String name2) {
        this.name2 = name2;
    }

    public Integer getResult1() {
        return result1;
    }

    public void setResult1(Integer result1) {
        this.result1 = result1;
    }

    public Integer getResult2() {
        return result2;
    }

    public void setResult2(Integer result2) {
        this.result2 = result2;
    }
    public Duelo(Integer id, Boolean starts, String name1, String name2, Integer result1, Integer result2) {
        this.id = id;
        this.starts = starts;
        this.name1 = name1;
        this.name2 = name2;
        this.result1 = result1;
        this.result2 = result2;
    }

    public Duelo(String name1){
        this.name1 = name1;
    }
}
