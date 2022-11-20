package controllers;

import java.net.URI;
import java.sql.*;
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
	    URI uri = UriBuilder.fromPath("/CareSense/home.jsp")
	            .queryParam("messageHello", message1)
	            .queryParam("messageWorld", message2)
	            .build();
	    return Response.seeOther(uri).build();
	}

}
