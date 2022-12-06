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

@Path("/associated")
public class associated {
	// connect to database
	caresense_app careSense = new caresense_app();
	String connectStr = careSense.serverConnect();
	
	// get residentAssociations
	@Path("/{uniqueID}")
	@GET
	public Response getAssociation (@PathParam("uniqueID") String uniqueID) throws Exception {
		
		JSONObject viewRecord = new JSONObject ();
		
		Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();
		String query = "SELECT uniqueID, userID, associatedUserID FROM associatedResident WHERE uniqueID = \"" + uniqueID + "\"";
		ResultSet rs = sqlStatement.executeQuery(query);
		while (rs.next())
		{
			viewRecord.put("uniqueID", uniqueID);
			viewRecord.put("userID", rs.getString("userID"));
			viewRecord.put("associatedUserID", rs.getString("associatedUserID"));
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
	
	// Delete an association
	@Path("/{uniqueID}")
	@DELETE
	public Response deleteAssociation (@PathParam("uniqueID") String uniqueID) throws SQLException, Exception  {
		
	   	Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();	 

		sqlStatement.executeUpdate("DELETE FROM associatedResident WHERE uniqueID = \"" + uniqueID + "\"");
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
	
	// add association
	@Path("/{userInfo}")
	@POST
	public Response addLocation (@PathParam("userInfo") String userInfo) throws Exception {
		
		JSONObject userJSON = new JSONObject (userInfo);
		JSONObject newRecord = new JSONObject ();
					
		String uniqueID = userJSON.getString("uniqueID");
		String userID = userJSON.getString("userID");
		String associatedUserID = userJSON.getString("associatedUserID");

		newRecord.put("uniqueID", uniqueID);
		newRecord.put("userID", userID);
		newRecord.put("associatedUserID", associatedUserID);
		
        String SQL = "INSERT INTO associatedResident VALUES ("
        		+ "\"" + uniqueID 			+ "\","
        		+ "\"" + userID 			+ "\","
        		+ "\"" + associatedUserID 	+ "\")";
        
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
	
	// update association
	@Path("/{userInfo}")
	@PUT
	public Response updateAssociation (@PathParam("userInfo") String userInfo) throws Exception {
		
		JSONObject userJSON = new JSONObject (userInfo);
		JSONObject newRecord = new JSONObject ();
					
		String uniqueID = "uniqueID = \"" 					+ userJSON.getString("uniqueID") 			+ "\"";
		String userID = "userID = \"" 						+ userJSON.getString("userID") 				+ "\"";
		String associatedUserID = "associatedUserID = \"" 	+ userJSON.getString("associatedUserID") 	+ "\"";
			
		newRecord.put("uniqueID", 			userJSON.getString("uniqueID"));
		newRecord.put("userID", 			userJSON.getString("userID"));
		newRecord.put("associatedUserID", 	userJSON.getString("associatedUserID"));
					
        String SQL = "UPDATE associatedResident SET " 
        		+ uniqueID 					+ ", " 
        		+ userID 					+ ", " 
        		+ associatedUserID   
        		+ " WHERE uniqueID = \"" 	+ userJSON.getString("uniqueID") + "\"";
	        
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