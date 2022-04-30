package api;

import java.util.ArrayList;
import java.util.Date;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import domain.controllers.TxAddGame;
import domain.controllers.TxGetGames;

@Path("/games")
public class Game {
	
	@GET
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	@Path("/")
	public Response getGames() {
		TxGetGames tx = new TxGetGames();
		tx.execute();
		ArrayList<domain.Game> result = tx.getResult();
		Response r = Response.ok(result).header("Access-Control-Allow-Origin", "*").build();
		return r;
	}

	@OPTIONS
	@Path("/")
	public Response options(){
		return Response.ok().header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Headers", "*").header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,DELETE,POST").build();
	}

	@POST
	@Path("/")
	public Response addGame(@QueryParam("playerName") String playerName, @QueryParam("score") int score, @QueryParam("scoreDate") Date scoreDate){
		TxAddGame tx = new TxAddGame(playerName, score, scoreDate);
		tx.execute();
		boolean result = tx.getResult();
		Response r = Response.ok(result).header("Access-Control-Allow-Origin", "*").build();
		return r;
	}
}
