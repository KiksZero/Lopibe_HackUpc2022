package domain;

public class Phrase {
    int idPhrase;
    String phrase;
    
    public Phrase(int idPhrase, String phrase){
        this.idPhrase = idPhrase;
        this.phrase = phrase;
    }

    public int getIdPhrase() {
        return idPhrase;
    }

    public String getPhrase() {
        return phrase;
    }

    
}
