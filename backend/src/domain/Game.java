package domain;

import java.util.Date;

public class Game {
    String playerName;
    int score;
    Date scoreDate;
    
    public Game(String playerName, int score, Date scoreDate){
        this.playerName = playerName;
        this.score = score;
        this.scoreDate = scoreDate;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public Date getScoreDate() {
        return scoreDate;
    }

    public void setScoreDate(Date scoreDate) {
        this.scoreDate = scoreDate;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((playerName == null) ? 0 : playerName.hashCode());
        result = prime * result + score;
        result = prime * result + ((scoreDate == null) ? 0 : scoreDate.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Game other = (Game) obj;
        if (playerName == null) {
            if (other.playerName != null)
                return false;
        } else if (!playerName.equals(other.playerName))
            return false;
        if (score != other.score)
            return false;
        if (scoreDate == null) {
            if (other.scoreDate != null)
                return false;
        } else if (!scoreDate.equals(other.scoreDate))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Game [playerName=" + playerName + ", score=" + score + ", scoreDate=" + scoreDate + "]";
    }
}
