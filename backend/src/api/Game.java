package api;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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
		return Response.ok(result).build();
	}
}
