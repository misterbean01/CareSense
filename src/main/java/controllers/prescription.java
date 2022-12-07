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

@Path("/prescription")
public class prescription {
	// connect to database
	main careSense = new main();
	String connectStr = careSense.serverConnect();
	
	// get all prescription data
	@Path("")
	@GET
	public Response getPrescription() throws Exception {
		JSONArray listOfRecords = new JSONArray ();
				
		Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();
		String query = "SELECT prescriptionID, userID, medicationName, dose, frequency, "
				+ "intendedUse, instructions FROM prescription";
		ResultSet rs = sqlStatement.executeQuery(query);
		while (rs.next())
		{
			JSONObject viewRecord = new JSONObject ();
			viewRecord.put("prescriptionID", rs.getString("prescriptionID"));
			viewRecord.put("userID", rs.getString("userID"));
			viewRecord.put("medicationName", rs.getString("medicationName"));
			viewRecord.put("dose", rs.getString("dose"));
			viewRecord.put("frequency", rs.getString("frequency"));
			viewRecord.put("intendedUse", rs.getString("intendedUse"));
			viewRecord.put("instructions",  rs.getString("instructions"));
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
	
	// get prescription data via userID
		@Path("resident/{userID}")
		@GET
		public Response getPrescriptionUserID(@PathParam("userID") String userID) throws Exception {
			JSONArray listOfRecords = new JSONArray ();
						
			Class.forName("com.mysql.cj.jdbc.Driver");
	    	Connection connection = DriverManager.getConnection(connectStr); 
			Statement sqlStatement = connection.createStatement();
			String query = "SELECT prescriptionID, userID, medicationName, dose, frequency, "
					+ "intendedUse, instructions FROM prescription WHERE userID = \"" + userID + "\"";
			ResultSet rs = sqlStatement.executeQuery(query);
			while (rs.next())
			{
				JSONObject viewRecord = new JSONObject ();
				viewRecord.put("prescriptionID", rs.getString("prescriptionID"));
				viewRecord.put("userID", rs.getString("userID"));
				viewRecord.put("medicationName", rs.getString("medicationName"));
				viewRecord.put("dose", rs.getString("dose"));
				viewRecord.put("frequency", rs.getString("frequency"));
				viewRecord.put("intendedUse", rs.getString("intendedUse"));
				viewRecord.put("instructions",  rs.getString("instructions"));
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
	
	// Delete a prescriptionID
	@Path("/{prescriptionID}")
	@DELETE
	public Response deletePrescription (@PathParam("prescriptionID") String prescriptionID) throws SQLException, Exception  {
		
	   	Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();	 

		sqlStatement.executeUpdate("DELETE FROM prescription WHERE prescriptionID = \"" + prescriptionID + "\"");
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
	
	// add prescription
	@Path("")
	@POST
	public Response addPrescription (String userInfo) throws Exception {
		
		JSONObject userJSON = new JSONObject (userInfo);
		JSONObject newRecord = new JSONObject ();
					
		String prescriptionID = userJSON.getString("prescriptionID");
		String userID = userJSON.getString("userID");
		String medicationName = userJSON.getString("medicationName");
		String dose = userJSON.getString("dose");
		String frequency = userJSON.getString("frequency");
		String intendedUse = userJSON.getString("intendedUse");
		String instructions = userJSON.getString("instructions");
		
		newRecord.put("prescriptionID", prescriptionID);
		newRecord.put("userID", userID);
		newRecord.put("medicationName", medicationName);
		newRecord.put("dose", dose);
		newRecord.put("frequency", frequency);
		newRecord.put("intendedUse", intendedUse);
		newRecord.put("instructions",  instructions);
		
		String SQL = "INSERT INTO prescription VALUES ("
        		+ "\"" + prescriptionID 	+ "\","
        		+ "\"" + userID 			+ "\","
        		+ "\"" + medicationName 	+ "\","
        		+ "\"" + dose 				+ "\","
        		+ "\"" + frequency 			+ "\","
        		+ "\"" + intendedUse 		+ "\","
        		+ "\"" + instructions		+ "\")";
        
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
	
	// update prescription
	@Path("{userInfo}")
	@PUT
	public Response updatePrescription (@PathParam("userInfo") String userInfo, String JSONrequest) throws Exception {
		System.out.println(userInfo);
		System.out.println(JSONrequest);
		JSONObject userJSON = new JSONObject (JSONrequest);
		JSONObject newRecord = new JSONObject ();
					
		String prescriptionID = "prescriptionID = \"" 	+ userJSON.getString("prescriptionID") 	+ "\"";
		String userID = "userID = \"" 					+ userJSON.getString("userID") 			+ "\"";
		String medicationName = "medicationName = \"" 	+ userJSON.getString("medicationName") 	+ "\"";
		String dose = "dose = \"" 						+ userJSON.getString("dose") 			+ "\"";
		String frequency = "frequency = \"" 			+ userJSON.getString("frequency") 		+ "\"";
		String intendedUse = "intendedUse = \"" 		+ userJSON.getString("intendedUse") 	+ "\"";
		String instructions = "instructions = \"" 		+ userJSON.getString("instructions") 	+ "\"";
			
		newRecord.put("prescriptionID", 		userJSON.getString("prescriptionID"));
		newRecord.put("userID", 	userJSON.getString("userID"));
		newRecord.put("medicationName", 	userJSON.getString("medicationName"));
		newRecord.put("dose", 		userJSON.getString("dose"));
		newRecord.put("frequency", 		userJSON.getString("frequency"));
		newRecord.put("intendedUse", 			userJSON.getString("intendedUse"));
		newRecord.put("instructions",  	userJSON.getString("instructions"));
					
        String SQL = "UPDATE prescription SET " 
        		+ prescriptionID 	+ ", " 
        		+ userID 			+ ", " 
        		+ medicationName	+ ", " 
        		+ dose				+ ", " 
        		+ frequency			+ ", " 
        		+ intendedUse		+ ", " 
        		+ instructions   
        		+ " WHERE prescriptionID = \"" + userJSON.getString("prescriptionID") + "\"";
	        
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