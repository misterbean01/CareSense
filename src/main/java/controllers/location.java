package controllers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import org.json.JSONArray;
import org.json.JSONObject;

@Path("/location")
public class location {
	// connect to database
	main careSense = new main();
	String connectStr = careSense.serverConnect();
	
	// get location data via locationID
	@Path("{locationID}")
	@GET
	public Response getLocation(@PathParam("locationID") String locationID) throws Exception {
		
		JSONObject viewRecord = new JSONObject ();
		
		Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();
		String query = "SELECT locationID, latitude, longitude, timestamp FROM location WHERE locationID = \"" + locationID + "\"";
		ResultSet rs = sqlStatement.executeQuery(query);
		String timestamp = "", latitude = "", longitude = "";
		while (rs.next())
		{
			timestamp = rs.getString("timestamp");
					latitude = rs.getString("latitude"); 
					longitude = rs.getString("longitude");
			viewRecord.put("locationID", locationID);
			viewRecord.put("latitude", rs.getString("latitude"));
			viewRecord.put("longitude", rs.getString("longitude"));
			viewRecord.put("timestamp", rs.getString("timestamp"));
		}
		
		return Response
			.status(Response.Status.OK)
			.header("timestamp", timestamp)
			.header("latitude", latitude)
			.header("longitude", longitude)
      	    .header("Access-Control-Allow-Origin", "*")
      	    .header("Access-Control-Allow-Headers",
					"Origin, X-Requested-With, Content-Type, Accept")
      	    .header("Access-Control-Allow-Methods",
					"Origin, X-Requested-With, GET,POST,OPTIONS,DELETE,PUT")
      	    .entity(viewRecord.toString())
      	    .build();
	}
	
	// get location data via locationID
		@Path("all")
		@GET
		public Response getLocationAll() throws Exception {
			JSONArray listOfRecords = new JSONArray ();
			
			Class.forName("com.mysql.cj.jdbc.Driver");
	    	Connection connection = DriverManager.getConnection(connectStr); 
			Statement sqlStatement = connection.createStatement();
			String query = "SELECT locationID, latitude, longitude, timestamp FROM location";
			ResultSet rs = sqlStatement.executeQuery(query);
			while (rs.next())
			{
				JSONObject viewRecord = new JSONObject ();
				viewRecord.put("locationID", rs.getString("locationID"));
				viewRecord.put("latitude", rs.getString("latitude"));
				viewRecord.put("longitude", rs.getString("longitude"));
				viewRecord.put("timestamp", rs.getString("timestamp"));
				listOfRecords.put(viewRecord);
			}
			
			return Response
				.status(Response.Status.OK)
	      	    .header("Access-Control-Allow-Origin", "*")
	      	    .header("Access-Control-Allow-Headers",
						"Origin, X-Requested-With, Content-Type, Accept")
	      	    .header("Access-Control-Allow-Methods",
						"Origin, X-Requested-With, GET,POST,OPTIONS,DELETE,PUT")
	      	    .entity(listOfRecords.toString())
	      	    .build();
		}
	
	// Delete a location
	@Path("{locationID}")
	@DELETE
	public Response deleteLocation (@PathParam("locationID") String locationID) throws SQLException, Exception  {
		
	   	Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();	 

		sqlStatement.executeUpdate("DELETE FROM location WHERE locationID = \"" + locationID + "\"");
        connection.close();
        
        return Response
				.status(Response.Status.OK)
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Headers",
						"Origin, X-Requested-With, Content-Type, Accept")
				.header("Access-Control-Allow-Methods",
						"Origin, X-Requested-With, GET,POST,OPTIONS,DELETE,PUT")
				.build();
	}
	
	// add location
	@Path("")
	@POST
	public Response addLocation (String userInfo) throws Exception {
		
		JSONObject userJSON = new JSONObject (userInfo);
		JSONObject newRecord = new JSONObject ();
					
		String locationID = userJSON.getString("locationID");
		String latitude = userJSON.getString("latitude");
		String longitude = userJSON.getString("longitude");
		String timestamp = userJSON.getString("timestamp");
		
		newRecord.put("locationID", locationID);
		newRecord.put("latitude", latitude);
		newRecord.put("longitude", longitude);
		newRecord.put("timestamp", timestamp);
		
        String SQL = "INSERT INTO location VALUES ("
        		+ "\"" + locationID 	+ "\","
        		+ "\"" + latitude 	+ "\","
        		+ "\"" + longitude 	+ "\","
        		+ "\"" + timestamp 		+ "\")";
        
        Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();	 
		sqlStatement.executeUpdate(SQL);
		connection.close(); 

		return Response
				.status(Response.Status.OK)
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Headers",
						"Origin, X-Requested-With, Content-Type, Accept")
				.header("Access-Control-Allow-Methods",
						"Origin, X-Requested-With, GET,POST,OPTIONS,DELETE,PUT")
				.entity(newRecord.toString())
				.build();
	}	
	
	// update location
	@Path("{userInfo}")
	@PUT
	public Response updateLocation (@PathParam("userInfo") String userInfo, String JSON) throws Exception {
		System.out.println(JSON);
		System.out.println(userInfo);
		JSONObject userJSON = new JSONObject (JSON);
		JSONObject newRecord = new JSONObject ();
					
		String locationID = "locationID = \"" 	+ userJSON.getString("locationID") 	+ "\"";
		String latitude = "latitude = \"" 		+ userJSON.getString("latitude") 	+ "\"";
		String longitude = "longitude = \"" 	+ userJSON.getString("longitude") 	+ "\"";
		String timestamp = "timestamp = \"" 	+ userJSON.getString("timestamp") 	+ "\"";
			
		newRecord.put("locationID", userJSON.getString("locationID"));
		newRecord.put("latitude", 	userJSON.getString("latitude"));
		newRecord.put("longitude", 	userJSON.getString("longitude"));
		newRecord.put("timestamp", 	userJSON.getString("timestamp"));
					
        String SQL = "UPDATE location SET " 
        		+ locationID 	+ ", " 
        		+ latitude 		+ ", " 
        		+ longitude		+ ", " 
        		+ timestamp   
        		+ " WHERE locationID = \"" + userJSON.getString("locationID") + "\"";
	        
        Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();	 
		sqlStatement.executeUpdate(SQL);
		connection.close();	
			
	return Response
			.status(Response.Status.OK)
			.header("Access-Control-Allow-Origin", "*")
			.header("Access-Control-Allow-Headers",
					"Origin, X-Requested-With, Content-Type, Accept")
			.header("Access-Control-Allow-Methods",
					"Origin, X-Requested-With, GET,POST,OPTIONS,DELETE,PUT")
			.entity(newRecord.toString())
			.build();
	}	
}