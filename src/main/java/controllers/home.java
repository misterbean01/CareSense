package controllers;

import java.net.URI;
import java.sql.*;
import java.util.Map;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import org.json.JSONArray;
import org.json.JSONObject;

@Path("/home")
public class home {
	
	@Path("")
	@GET
	public Response SelectRecord ()  {
	    String message1 = "Hello";
	    String message2 = "WORLD";
//	    URI uri = UriBuilder.fromPath("/CareSense/home.jsp")
//	            .queryParam("messageHello", message1)
//	            .queryParam("messageWorld", message2)
//	            .build();
	    JSONObject homeResponseJSON = new JSONObject();
	    homeResponseJSON.put("msg1", message1);
	    homeResponseJSON.put("msg2", message2);
	    return Response
				.status(Response.Status.OK)
				.header("message", "Hello World")
				.header("Access-Control-Allow-Origin", "*") // always include this 2 header to access the JSON
				.header("Access-Control-Allow-Headers", 
						"Origin, X-Requested-With, Content-Type, Accept") // always include this 2 header to access the JSON
				.entity(homeResponseJSON.toString())
				.build();
	}
	
	@Path("")
	@POST
	public Response PostRecord(String loginUserPassJSON)  {
	    String message1 = "Hello";
	    String message2 = "WORLD";
	    
	    JSONObject loginJSON = new JSONObject(loginUserPassJSON); 
	    System.out.println(loginJSON.getString("Username"));
	    System.out.println(loginJSON.getString("Password"));
	    // Access the database with the user/pass and retrieve if valid user
	    
	    JSONObject userResponseJSON = new JSONObject();
	    userResponseJSON.put("Username", message1);
	    userResponseJSON.put("Password", message2);
	    
	    return Response
				.status(Response.Status.OK)
				.header("message", "Hello World")
				.header("Access-Control-Allow-Origin", "*") // always include this 2 header to access the JSON
				.header("Access-Control-Allow-Headers", 
						"Origin, X-Requested-With, Content-Type, Accept") // always include this 2 header to access the JSON
				.header("Access-Control-Allow-Methods", 
						"Origin, X-Requested-With, GET,POST,OPTIONS,DELETE,PUT")
				.entity(userResponseJSON.toString())
				.build();
	}

}
