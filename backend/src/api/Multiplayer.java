package api;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import domain.dataCtrl.DataCtrl;
import domain.dataCtrl.DueloDataCtrl;

@Path("/duelos")
public class Multiplayer {

	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON}) 
	@Path("/")
	public Response create(String content) {
		int result = 0;
		try {
			JSONObject json = new JSONObject(content);
			String name1 = json.getString("name1");
			DataCtrl dataCtrl = DataCtrl.getInstance();
			DueloDataCtrl ddc = dataCtrl.getDueloDataCtrl();
			result = ddc.insert(name1);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return Response.ok(result).header("Access-Control-Allow-Origin", "*").build();
	}

    @PUT
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON}) 
	@Path("/{id}/start")
	public Response start(@PathParam("id") int id, String content) {
		boolean result = false;
		try {
			JSONObject json = new JSONObject(content);
			String name2 = json.getString("name2");
			DataCtrl dataCtrl = DataCtrl.getInstance();
			DueloDataCtrl ddc = dataCtrl.getDueloDataCtrl();
			result = ddc.updateName2(id, name2);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return Response.ok(result).header("Access-Control-Allow-Origin", "*").build();
	}

    @GET
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON}) 
	@Path("/{id}/started")
	public Response started(@PathParam("id") int id) {
		DataCtrl dataCtrl = DataCtrl.getInstance();
		DueloDataCtrl ddc = dataCtrl.getDueloDataCtrl();
		boolean result = ddc.selectStarts(id);
		return Response.ok(result).header("Access-Control-Allow-Origin", "*").build();
	}

    @PUT
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON}) 
	@Path("/{id}/submitResult1")
	public Response submitResult1(@PathParam("id") int id, String content) {
		boolean result = false;
		try {
			JSONObject json = new JSONObject(content);
			int r1 = json.getInt("r1");
			DataCtrl dataCtrl = DataCtrl.getInstance();
			DueloDataCtrl ddc = dataCtrl.getDueloDataCtrl();
			result = ddc.updateResult1(id, r1);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return Response.ok(result).header("Access-Control-Allow-Origin", "*").build();
	}

    @PUT
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON}) 
	@Path("/{id}/submitResult2")
	public Response submitResult2(@PathParam("id") int id, String content) {
		boolean result = false;
		try {
			JSONObject json = new JSONObject(content);
			int r2 = json.getInt("r2");
			DataCtrl dataCtrl = DataCtrl.getInstance();
			DueloDataCtrl ddc = dataCtrl.getDueloDataCtrl();
			result = ddc.updateResult2(id, r2);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return Response.ok(result).header("Access-Control-Allow-Origin", "*").build();
	}

    @GET
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON}) 
	@Path("/{id}/getResult1")
	public Response getResults1(@PathParam("id") int id) {
		DataCtrl dataCtrl = DataCtrl.getInstance();
		DueloDataCtrl ddc = dataCtrl.getDueloDataCtrl();
		int result = ddc.selectResult1(id);
		return Response.ok(result).header("Access-Control-Allow-Origin", "*").build();
	}

    @GET
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON}) 
	@Path("/{id}/getResult2")
	public Response getResults2(@PathParam("id") int id) {
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
