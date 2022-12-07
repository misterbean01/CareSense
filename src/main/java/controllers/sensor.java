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

@Path("/sensor")
public class sensor {
	// connect to database
	main careSense = new main();
	String connectStr = careSense.serverConnect();
	
	// get sensor data via sensorID
	@Path("{sensorID}")
	@GET
	public Response getSensor(@PathParam("sensorID") String sensorID) throws Exception {
	
		JSONObject viewRecord = new JSONObject ();
		
		Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();
		String query = "SELECT sensorID, bloodPressure, temperature, heartrate, "
				+ "glucose, spO2, timestamp FROM sensor WHERE sensorID = \"" + sensorID + "\"";
		ResultSet rs = sqlStatement.executeQuery(query);
		String timestamp = "", heartrate = "";
		while (rs.next())
		{
			timestamp =rs.getString("timestamp");
					heartrate = rs.getString("heartrate");
			viewRecord.put("sensorID", sensorID);
			viewRecord.put("bloodPressure", rs.getString("bloodPressure"));
			viewRecord.put("temperature", rs.getString("temperature"));
			viewRecord.put("heartrate", rs.getString("heartrate"));
			viewRecord.put("glucose", rs.getString("glucose"));
			viewRecord.put("spO2", rs.getString("spO2"));
			viewRecord.put("timestamp",  rs.getString("timestamp"));
		}
		
		return Response
			.status(Response.Status.OK)
			.header("heartrate", timestamp)
			.header("timestamp", heartrate)
      	    .header("Access-Control-Allow-Origin", "*")
      	    .header("Access-Control-Allow-Headers",
					"Origin, X-Requested-With, Content-Type, Accept")
      	    .header("Access-Control-Allow-Methods",
					"Origin, X-Requested-With, GET,POST,OPTIONS,DELETE,PUT")
      	    .entity(viewRecord.toString())
      	    .build();
	}
	
	// get sensor data via sensorID
		@Path("all")
		@GET
		public Response getSensorAll() throws Exception {
			JSONArray listOfRecords = new JSONArray ();
			
			
			Class.forName("com.mysql.cj.jdbc.Driver");
	    	Connection connection = DriverManager.getConnection(connectStr); 
			Statement sqlStatement = connection.createStatement();
			String query = "SELECT sensorID, bloodPressure, temperature, heartrate, "
					+ "glucose, spO2, timestamp FROM sensor";
			ResultSet rs = sqlStatement.executeQuery(query);
			while (rs.next())
			{
				JSONObject viewRecord = new JSONObject ();
				viewRecord.put("sensorID", rs.getString("sensorID"));
				viewRecord.put("bloodPressure", rs.getString("bloodPressure"));
				viewRecord.put("temperature", rs.getString("temperature"));
				viewRecord.put("heartrate", rs.getString("heartrate"));
				viewRecord.put("glucose", rs.getString("glucose"));
				viewRecord.put("spO2", rs.getString("spO2"));
				viewRecord.put("timestamp",  rs.getString("timestamp"));
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
	
	// Delete a sensor
	@Path("{sensorID}")
	@DELETE
	public Response deleteSensor (@PathParam("sensorID") String sensorID) throws SQLException, Exception  {
		
	   	Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();	 

		sqlStatement.executeUpdate("DELETE FROM sensor WHERE sensorID = \"" + sensorID + "\"");
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
	
	// add sensor
	@Path("")
	@POST
	public Response addSensor (String JSON) throws Exception {
		
		JSONObject userJSON = new JSONObject (JSON);
		JSONObject newRecord = new JSONObject ();
					
		String sensorID = userJSON.getString("sensorID");
		String bloodPressure = userJSON.getString("bloodPressure");
		String temperature = userJSON.getString("temperature");
		String heartrate = userJSON.getString("heartrate");
		String glucose = userJSON.getString("glucose");
		String spO2 = userJSON.getString("spO2");
		String timestamp = userJSON.getString("timestamp");
		
		newRecord.put("sensorID", sensorID);
		newRecord.put("bloodPressure", bloodPressure);
		newRecord.put("temperature", temperature);
		newRecord.put("heartrate", heartrate);
		newRecord.put("glucose", glucose);
		newRecord.put("spO2", spO2);
		newRecord.put("timestamp",  timestamp);
		
        String SQL = "INSERT INTO sensor VALUES ("
        		+ "\"" + sensorID 		+ "\","
        		+ "\"" + bloodPressure 	+ "\","
        		+ "\"" + temperature 	+ "\","
        		+ "\"" + heartrate 		+ "\","
        		+ "\"" + glucose 		+ "\","
        		+ "\"" + spO2 		+ "\","
        		+ "\"" + timestamp		 	+ "\")";
        
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
	
	// update sensor
	@Path("{userInfo}")
	@PUT
	public Response updateSensor (@PathParam("userInfo") String userInfo, String JSON) throws Exception {
		
		JSONObject userJSON = new JSONObject (JSON);
		JSONObject newRecord = new JSONObject ();
					
		String sensorID = "sensorID = \"" 			+ userJSON.getString("sensorID") 		+ "\"";
		String bloodPressure = "bloodPressure = \"" + userJSON.getString("bloodPressure") 	+ "\"";
		String temperature = "temperature = \"" 	+ userJSON.getString("temperature") 	+ "\"";
		String heartrate = "heartrate = \"" 		+ userJSON.getString("heartrate") 		+ "\"";
		String glucose = "glucose = \"" 			+ userJSON.getString("glucose") 		+ "\"";
		String spO2 = "spO2 = \"" 					+ userJSON.getString("spO2") 			+ "\"";
		String timestamp = "timestamp = \"" 		+ userJSON.getString("timestamp") 		+ "\"";
			
		newRecord.put("sensorID", 		userJSON.getString("sensorID"));
		newRecord.put("bloodPressure", 	userJSON.getString("bloodPressure"));
		newRecord.put("temperature", 	userJSON.getString("temperature"));
		newRecord.put("heartrate", 		userJSON.getString("heartrate"));
		newRecord.put("glucose", 		userJSON.getString("glucose"));
		newRecord.put("spO2", 			userJSON.getString("spO2"));
		newRecord.put("timestamp",  	userJSON.getString("timestamp"));
					
        String SQL = "UPDATE sensor SET " 
        		+ sensorID 			+ ", " 
        		+ bloodPressure 	+ ", " 
        		+ temperature		+ ", " 
        		+ heartrate			+ ", " 
        		+ glucose			+ ", " 
        		+ spO2				+ ", " 
        		+ timestamp   
        		+ " WHERE sensorID = \"" + userJSON.getString("sensorID") + "\"";
	        
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