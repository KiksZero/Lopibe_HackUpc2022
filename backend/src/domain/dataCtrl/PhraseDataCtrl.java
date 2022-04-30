package domain.dataCtrl;

import domain.Phrase;

public interface PhraseDataCtrl {
    public Phrase select(int idPhrase);
    public int biggestIndex();
}