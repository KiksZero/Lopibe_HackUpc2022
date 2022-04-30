package api;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/phrase")
public class Phrase {
	//144.24.196.175/lopibes/services/phrase
	@GET
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON}) 
	@Path("/")
	public Response phrase() {
		String result = "This is a test";
		return Response.ok(result).build();
	}
}
