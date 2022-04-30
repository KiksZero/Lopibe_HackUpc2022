package api;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import domain.dataCtrl.DataCtrl;
import domain.dataCtrl.DueloDataCtrl;

@Path("/duelos")
public class Multiplayer {
	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON}) 
	@Path("/create")
	public Response create(@QueryParam("name1") String name1) {
		DataCtrl dataCtrl = DataCtrl.getInstance();
		DueloDataCtrl ddc = dataCtrl.getDueloDataCtrl();
		int result = ddc.insert(name1);
		return Response.ok(result).header("Access-Control-Allow-Origin", "*").build();
	}

    @POST
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON}) 
	@Path("/start")
	public Response start(@QueryParam("id") int id, @QueryParam("name2") String name2) {
		DataCtrl dataCtrl = DataCtrl.getInstance();
		DueloDataCtrl ddc = dataCtrl.getDueloDataCtrl();
		boolean result = ddc.updateName2(id, name2);
		return Response.ok(result).header("Access-Control-Allow-Origin", "*").build();
	}

    @GET
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON}) 
	@Path("/started")
	public Response started(@QueryParam("id") int id) {
		DataCtrl dataCtrl = DataCtrl.getInstance();
		DueloDataCtrl ddc = dataCtrl.getDueloDataCtrl();
		boolean result = ddc.selectStarts(id);
		return Response.ok(result).header("Access-Control-Allow-Origin", "*").build();
	}

    @POST
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON}) 
	@Path("/submitResult1")
	public Response submitResult1(@QueryParam("id") int id, @QueryParam("r1") int r1) {
		DataCtrl dataCtrl = DataCtrl.getInstance();
		DueloDataCtrl ddc = dataCtrl.getDueloDataCtrl();
		boolean result = ddc.updateResult1(id, r1);
		return Response.ok(result).header("Access-Control-Allow-Origin", "*").build();
	}

    @POST
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON}) 
	@Path("/submitResult2")
	public Response submitResult2(@QueryParam("id") int id, @QueryParam("r2") int r2) {
		DataCtrl dataCtrl = DataCtrl.getInstance();
		DueloDataCtrl ddc = dataCtrl.getDueloDataCtrl();
		boolean result = ddc.updateResult2(id, r2);
		return Response.ok(result).header("Access-Control-Allow-Origin", "*").build();
	}

    @GET
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON}) 
	@Path("/getResult1")
	public Response getResults1(@QueryParam("id") int id) {
		DataCtrl dataCtrl = DataCtrl.getInstance();
		DueloDataCtrl ddc = dataCtrl.getDueloDataCtrl();
		int result = ddc.selectResult1(id);
		return Response.ok(result).header("Access-Control-Allow-Origin", "*").build();
	}

    @GET
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON}) 
	@Path("/getResult2")
	public Response getResults2(@QueryParam("id") int id) {
		DataCtrl dataCtrl = DataCtrl.getInstance();
		DueloDataCtrl ddc = dataCtrl.getDueloDataCtrl();
		int result = ddc.selectResult2(id);
		return Response.ok(result).header("Access-Control-Allow-Origin", "*").build();
	}

	@OPTIONS
	@Path("/")
	public Response options(){
		return Response.ok().header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Headers", "*").header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,DELETE,POST").build();
	}
}
