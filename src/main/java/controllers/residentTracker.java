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

@Path("/residentTracker")
public class residentTracker {
	// connect to database
	main careSense = new main();
	String connectStr = careSense.serverConnect();
	
	// get all resident data
	@Path("all")
	@GET
	public Response getResidentTrackerAll() throws Exception {
		JSONArray listOfRecords = new JSONArray ();
		
		Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();
		String query = "SELECT userID, locationID, sensorID FROM resident";
		ResultSet rs = sqlStatement.executeQuery(query);
		while (rs.next())
		{
			JSONObject viewRecord = new JSONObject ();
			viewRecord.put("userID", rs.getString("userID"));
			viewRecord.put("locationID", rs.getString("locationID"));
			viewRecord.put("sensorID", rs.getString("sensorID"));
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
	
	// Delete a resident
	@Path("{userID}")
	@DELETE
	public Response deleteResidentTracker (@PathParam("userID") String userID) throws SQLException, Exception  {
		
	   	Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();	 

		sqlStatement.executeUpdate("DELETE FROM resident WHERE userID = \"" + userID + "\"");
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
	
	// add resident
	@Path("")
	@POST
	public Response addResidentTracker (String userInfo) throws Exception {
		
		JSONObject userJSON = new JSONObject (userInfo);
		JSONObject newRecord = new JSONObject ();
					
		String userID = userJSON.getString("userID");
		String locationID = userJSON.getString("locationID");
		String sensorID = userJSON.getString("sensorID");
		
		newRecord.put("userID", userID);
		newRecord.put("locationID", locationID);
		newRecord.put("sensorID", sensorID);
		
        String SQL = "INSERT INTO resident VALUES ("
        		+ "\"" + userID 	+ "\","
        		+ "\"" + locationID 	+ "\","
        		+ "\"" + sensorID 		+ "\")";
        
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
	
	// update resident
	@Path("{userInfo}")
	@PUT
	public Response updateResidentTracker (@PathParam("userInfo") String userInfo, String JSONrequest) throws Exception {
		
		JSONObject userJSON = new JSONObject (JSONrequest);
		JSONObject newRecord = new JSONObject ();
					
		String userID = "userID = \"" 	+ userJSON.getString("userID") 	+ "\"";
		String locationID = "locationID = \"" 		+ userJSON.getString("locationID") 	+ "\"";
		String sensorID = "sensorID = \"" 	+ userJSON.getString("sensorID") 	+ "\"";
			
		newRecord.put("userID", userJSON.getString("userID"));
		newRecord.put("locationID", 	userJSON.getString("locationID"));
		newRecord.put("sensorID", 	userJSON.getString("sensorID"));
					
        String SQL = "UPDATE resident SET " 
        		+ userID 	+ ", " 
        		+ locationID 		+ ", " 
        		+ sensorID		 
        		+ " WHERE userID = \"" + userJSON.getString("userID") + "\"";
	        
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