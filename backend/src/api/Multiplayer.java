package api;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import domain.Duelo;
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
			System.out.println("HOLA");
			System.out.println(name1);
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
	@Path("/start")
	public Response start(String content) {
		boolean result = false;
		try {
			JSONObject json = new JSONObject(content);
			String name2 = json.getString("name2");
			int id = json.getInt("id");
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
	@Path("/started")
	public Response started(String content) {
		boolean result = false;
		try {
			JSONObject json = new JSONObject(content);
			int id = json.getInt("id");
			DataCtrl dataCtrl = DataCtrl.getInstance();
			DueloDataCtrl ddc = dataCtrl.getDueloDataCtrl();
			result = ddc.selectStarts(id);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return Response.ok(result).header("Access-Control-Allow-Origin", "*").build();
	}

    @PUT
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON}) 
	@Path("/updateResult")
	public Response submitResult2(String content) {
		boolean result = false;
		try {
			JSONObject json = new JSONObject(content);
			int r = json.getInt("puntuacion");
			int id = json.getInt("id");
			String name = json.getString("name");
			DataCtrl dataCtrl = DataCtrl.getInstance();
			DueloDataCtrl ddc = dataCtrl.getDueloDataCtrl();
			Duelo d = ddc.select(id);
			result = false;
			if(d.getName1().equals(name)) {
				result = ddc.updateResult1(id, r);
			} else {
				result = ddc.updateResult2(id, r);
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return Response.ok(result).header("Access-Control-Allow-Origin", "*").build();
	}

    @GET
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON}) 
	@Path("/getResult")
	public Response getResults1(@QueryParam("name") String name, @QueryParam("id") int id) {
		int result = 0;
		DataCtrl dataCtrl = DataCtrl.getInstance();
		DueloDataCtrl ddc = dataCtrl.getDueloDataCtrl();
		result = ddc.selectResult(id, name);
		return Response.ok(result).header("Access-Control-Allow-Origin", "*").build();
	}

	@OPTIONS
	@Path("/")
	public Response options(){
		return Response.ok().header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Headers", "*").header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,DELETE,POST").build();
	}

	@OPTIONS
	@Path("/start")
	public Response options2(){
		return Response.ok().header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Headers", "*").header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,DELETE,POST").build();
	}

	@OPTIONS
	@Path("/getResult")
	public Response options3(){
		return Response.ok().header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Headers", "*").header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,DELETE,POST").build();
	}

	@OPTIONS
	@Path("/updateResult")
	public Response options4(){
		return Response.ok().header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Headers", "*").header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,DELETE,POST").build();
	}
}
