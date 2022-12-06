package controllers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import org.json.JSONObject;

@Path("/")
public class crud {
	// connect to database
	caresense_app careSense = new caresense_app();
	String connectStr = careSense.serverConnect();
	
	// method to add a complete record into any of the 11 tables
	// JSON must contain 'tableName'
	@Path("newRecord/{recordInfo}")
	@POST
	public Response newRecord (@PathParam("recordInfo") String recordInfo) throws Exception {
		
		JSONObject userJSON = new JSONObject (recordInfo);
		String tableName = userJSON.getString("tableName");
		JSONObject newRecord = new JSONObject ();
		
		if (tableName == "admin") {		
			String userID = userJSON.getString("userID");
			String username = userJSON.getString("username");
			String password = userJSON.getString("password");
			
			newRecord.put("userID", userID);
			newRecord.put("username", username);
			newRecord.put("password", password);
			
	        String SQL = "INSERT INTO admin VALUES ("
	        		+ "\"" + userID 	+ "\","
	        		+ "\"" + username + "\","
	        		+ "\"" + password 	+ "\")";

	        Class.forName("com.mysql.cj.jdbc.Driver");
	    	Connection connection = DriverManager.getConnection(connectStr); 
			Statement sqlStatement = connection.createStatement();	 
			sqlStatement.executeUpdate(SQL);
		}
		
		if (tableName == "user") {		
			String userID = userJSON.getString("userID");
			String userType = userJSON.getString("userType");
			String username = userJSON.getString("username");
			String password = userJSON.getString("password");
			String firstName = userJSON.getString("firstName");
			String lastName = userJSON.getString("lastName");
			String birthday = userJSON.getString("birthday");
			String gender = userJSON.getString("gender");
			String phoneNumber = userJSON.getString("phoneNumber");
			
			newRecord.put("userID", userID);
			newRecord.put("userType", userType);
			newRecord.put("username", username);
			newRecord.put("password", password);
			newRecord.put("firstName", firstName);
			newRecord.put("lastName", lastName);
			newRecord.put("birthday", birthday);
			newRecord.put("gender", gender);
			newRecord.put("phoneNumber", phoneNumber);
					
	        String SQL = "INSERT INTO user VALUES ("
	        		+ "\"" + userID 	+ "\","
	        		+ "\"" + userType 	+ "\","
	        		+ "\"" + username 	+ "\"," 
	        		+ "\"" + password	+ "\","
	        		+ "\"" + firstName	+ "\","
	        		+ "\"" + lastName	+ "\","
	        		+ "\"" + birthday	+ "\","
	        		+ "\"" + gender		+ "\","
	        		+ "\"" + phoneNumber + "\")";
	        
	        Class.forName("com.mysql.cj.jdbc.Driver");
	    	Connection connection = DriverManager.getConnection(connectStr); 
			Statement sqlStatement = connection.createStatement();	 
			sqlStatement.executeUpdate(SQL);
			connection.close();
		}
		
		if (tableName == "resident") {		
			String userID = userJSON.getString("userID");
			String locationID = userJSON.getString("locationID");
			String sensorID = userJSON.getString("sensorID");
			
			newRecord.put("userID", userID);
			newRecord.put("locationID", locationID);
			newRecord.put("sensorID", sensorID);
			
	        String SQL = "INSERT INTO resident VALUES ("
	        		+ "\"" + userID 	+ "\","
	        		+ "\"" + locationID + "\","
	        		+ "\"" + sensorID 	+ "\")";
	        
	        Class.forName("com.mysql.cj.jdbc.Driver");
	    	Connection connection = DriverManager.getConnection(connectStr); 
			Statement sqlStatement = connection.createStatement();	 
			sqlStatement.executeUpdate(SQL);
			connection.close();
		}
		
		if (tableName == "associatedResident") {		
			String userID = userJSON.getString("userID");
			String associatedUserID = userJSON.getString("associatedUserID");
			
			newRecord.put("userID", userID);
			newRecord.put("associatedUserID", associatedUserID);
			
	        String SQL = "INSERT INTO associatedResident VALUES ("
	        		+ "\"" + userID 			+ "\","
	        		+ "\"" + associatedUserID 	+ "\")";

	        Class.forName("com.mysql.cj.jdbc.Driver");
	    	Connection connection = DriverManager.getConnection(connectStr); 
			Statement sqlStatement = connection.createStatement();	 
			sqlStatement.executeUpdate(SQL);
			connection.close();
		}
		
		if (tableName == "sensor") {		
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
		}
		
		if (tableName == "location") {		
			String locationID = userJSON.getString("locationID");
			String latitude = userJSON.getString("latitude");
			String longitude = userJSON.getString("longitude");
			String timestamp = userJSON.getString("timestamp");
			
			newRecord.put("locationID", locationID);
			newRecord.put("latitude", latitude);
			newRecord.put("longitude", longitude);
			newRecord.put("timestamp", timestamp);
			
	        String SQL = "INSERT INTO locationInfo VALUES ("
	        		+ "\"" + locationID 	+ "\","
	        		+ "\"" + latitude 	+ "\","
	        		+ "\"" + longitude 	+ "\","
	        		+ "\"" + timestamp 		+ "\")";
	        
	        Class.forName("com.mysql.cj.jdbc.Driver");
	    	Connection connection = DriverManager.getConnection(connectStr); 
			Statement sqlStatement = connection.createStatement();	 
			sqlStatement.executeUpdate(SQL);
			connection.close();
		}
		
		if (tableName == "prescription") {		
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
			newRecord.put("instructions", instructions);
			
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
		}
		
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
	
	// Delete a record from any table; references tableName and first key in table
	@Path("deleteRecord/{recordInfo}")
	@DELETE
	public Response deleteRecord (@PathParam("recordInfo") String recordInfo) throws SQLException, Exception  {
		
		JSONObject userJSON = new JSONObject (recordInfo);
		String tableName = userJSON.getString("tableName");
		String primaryKey = userJSON.getString("PrimaryKey");
		
	   	Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();	 
		
		if (tableName == "admin") {
			sqlStatement.executeUpdate("DELETE FROM " + tableName + " WHERE userID = " + primaryKey );
		}
		if (tableName == "user") {
			sqlStatement.executeUpdate("DELETE FROM " + tableName + " WHERE userID = " + primaryKey );
		}
		if (tableName == "resident") {
			sqlStatement.executeUpdate("DELETE FROM " + tableName + " WHERE userID = " + primaryKey);
		}
		if (tableName == "associatedResident") {
			sqlStatement.executeUpdate("DELETE FROM " + tableName + " WHERE uniqueID = " + primaryKey );
		}
		if (tableName == "sensor") {
			sqlStatement.executeUpdate("DELETE FROM " + tableName + " WHERE sensorID = " + primaryKey );
		}
		if (tableName == "location") {
			sqlStatement.executeUpdate("DELETE FROM " + tableName + " WHERE locationID = " + primaryKey );
		}
		if (tableName == "prescription") {
			sqlStatement.executeUpdate("DELETE FROM " + tableName + " WHERE prescriptionID = " + primaryKey);
		}
		
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
	
	// resident view: resident table
	@Path("residentViewResident/{recordInfo}")
	@GET
	public Response residentViewResident (@PathParam("recordInfo") String recordInfo) throws Exception {
		
		JSONObject userJSON = new JSONObject (recordInfo);
		String userID = userJSON.getString("userID");
		JSONObject viewRecord = new JSONObject ();
		
		Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();
		String query = "SELECT userID, locationID, sensorID FROM resident WHERE userID = " + userID;
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

	// resident view: sensor table
	@Path("residentViewSensor/{recordInfo}")
	@GET
	public Response residentViewSensor (@PathParam("recordInfo") String recordInfo) throws Exception {
		
		JSONObject userJSON = new JSONObject (recordInfo);
		String sensorID = userJSON.getString("sensorID");
		JSONObject viewRecord = new JSONObject ();
		
		Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();
		String query = "SELECT sensorID, bloodPressure, temperature, heartrate, "
				+ "glucose, spO2 FROM sensor WHERE sensorID = " + sensorID;
		ResultSet rs = sqlStatement.executeQuery(query);
		while (rs.next())
		{
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
      	    .header("Access-Control-Allow-Origin", "*")
      	    .header("Access-Control-Allow-Headers",
					"Origin, X-Requested-With, Content-Type, Accept")
      	    .header("Access-Control-Allow-Methods",
					"Origin, X-Requested-With, GET,POST,OPTIONS,DELETE,PUT")
      	    .entity(viewRecord.toString())
      	    .build();
	}
	
	// resident view: prescription table
	@Path("residentViewprescription/{recordInfo}")
	@GET
	public Response residentViewprescription (@PathParam("recordInfo") String recordInfo) throws Exception {
		
		JSONObject userJSON = new JSONObject (recordInfo);
		String userID = userJSON.getString("userID");
		JSONObject viewRecord = new JSONObject ();
		
		Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();
		String query = "SELECT prescriptionID, userID, medicationName, dose, frequency, "
				+ "intendedUse, instructions FROM prescription WHERE userID = " + userID;
		ResultSet rs = sqlStatement.executeQuery(query);
		while (rs.next())
		{
			viewRecord.put("sensorID", rs.getString("sensorID"));
			viewRecord.put("bloodPressure", rs.getString("bloodPressure"));
			viewRecord.put("temperature", rs.getString("temperature"));
			viewRecord.put("heartrate", rs.getString("heartrate"));
			viewRecord.put("glucose", rs.getString("glucose"));
			viewRecord.put("spO2", rs.getString("spO2"));
			viewRecord.put("timestamp",  rs.getString("timestamp"));
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

	// resident view: location table
	@Path("residentViewLocation/{recordInfo}")
	@GET
	public Response residentViewLocation (@PathParam("recordInfo") String recordInfo) throws Exception {
		
		JSONObject userJSON = new JSONObject (recordInfo);
		String locationID = userJSON.getString("locationID");
		JSONObject viewRecord = new JSONObject ();
		
		Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();
		String query = "SELECT locationID, latitude, longitude, timestamp "
				+ "FROM location WHERE locationID = " + locationID;
		ResultSet rs = sqlStatement.executeQuery(query);
		while (rs.next())
		{
			viewRecord.put("locationID", locationID);
			viewRecord.put("latitude", rs.getString("latitude"));
			viewRecord.put("longitude", rs.getString("longitude"));
			viewRecord.put("timestamp", rs.getString("timestamp"));
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
}
