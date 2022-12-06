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

import org.json.JSONObject;

@Path("/resident")
public class resident {
	// connect to database
	caresense_app careSense = new caresense_app();
	String connectStr = careSense.serverConnect();
	
	// get resident data via userID
	@Path("/{userID}")
	@GET
	public Response getResident(@PathParam("userID") String userID) throws Exception {
		
		JSONObject viewRecord = new JSONObject ();
		
		Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();
		String query = "SELECT userID, locationID, sensorID FROM resident WHERE userID = \"" + userID + "\"";
		ResultSet rs = sqlStatement.executeQuery(query);
		while (rs.next())
		{
			viewRecord.put("userID", userID);
			viewRecord.put("locationID", rs.getString("locationID"));
			viewRecord.put("sensorID", rs.getString("sensorID"));
		}
		
		return Response
			.status(Response.Status.OK)
      	    .header("Access-Control-Allow-Origin", "*")
      	    .header("Access-Control-Allow-Headers",
					"Origin, X-Requested-With, Content-Type, Accept")
      	    .header("Access-Control-Allow-Methods",
					"Origin, X-Requested-With, GET,POST,OPTIONS,DELETE,PUT")
      	    .entity(viewRecord.toString())
      	    .build();
	}
	
	// Delete a resident
	@Path("/{userID}")
	@DELETE
	public Response deleteResident (@PathParam("userID") String userID) throws SQLException, Exception  {
		
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
	@Path("/{userInfo}")
	@POST
	public Response addResident (@PathParam("userInfo") String userInfo) throws Exception {
		
		JSONObject userJSON = new JSONObject (userInfo);
		JSONObject newRecord = new JSONObject ();
					
		String useriD = userJSON.getString("useriD");
		String locationID = userJSON.getString("locationID");
		String sensorID = userJSON.getString("sensorID");
		
		newRecord.put("useriD", useriD);
		newRecord.put("locationID", locationID);
		newRecord.put("sensorID", sensorID);
		
        String SQL = "INSERT INTO resident VALUES ("
        		+ "\"" + useriD 	+ "\","
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
	@Path("/{userInfo}")
	@PUT
	public Response updateResident (@PathParam("userInfo") String userInfo) throws Exception {
		
		JSONObject userJSON = new JSONObject (userInfo);
		JSONObject newRecord = new JSONObject ();
					
		String userID = "userID = \"" 				+ userJSON.getString("userID") 	+ "\"";
		String locationID = "locationID = \"" 		+ userJSON.getString("locationID") 	+ "\"";
		String sensorID = "sensorID = \"" 		+ userJSON.getString("sensorID") 	+ "\"";
			
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