package controllers;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.json.JSONObject;

import java.sql.Connection;
import java.sql.DriverManager;

import java.sql.SQLException;
import java.sql.Statement;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Produces;

@Path("/db")
public class database {
	//database connection information
	public String mysql_ip = "35.239.192.83";
	public String username = "jas";
	public String password = "admin1";
    public String connectStr ="jdbc:mysql://" + mysql_ip + ":3306/assign4DB?user=" + username + "&password=" + password ;

 // CREATE ALL TABLES
 	@Path("/createTables")
 	@POST
 	@Produces("text/html")
 	public Response createTables ()  {
 		String admin = "CREATE TABLE admin ("
 	    		+ "userID VARCHAR(20),"
 	    		+ "username VARCHAR(20),"
 	    		+ "password VARCHAR(20),";

 	    String user = "CREATE TABLE user ("
 	    		+ "userID VARCHAR(20),"
 	    		+ "userType VARCHAR(20),"
 	    		+ "username VARCHAR(20),"
 	    		+ "password VARCHAR(20),"
 	    		+ "firstName VARCHAR(20),"
 	    		+ "lastName VARCHAR(20),"
 	    		+ "birthday VARCHAR(20),"
 	    		+ "sex VARCHAR(20),"
 	    		+ "phoneNumber VARCHAR(20),";
 	    
 	    String resident = "CREATE TABLE resident ("
 	    		+ "userID VARCHAR(20),"
 	    		+ "locationID VARCHAR(20),"
 	    		+ "sensorID VARCHAR(20),";
 	    
 	    String associatedResident = "CREATE TABLE associatedResident ("
	    		+ "userID VARCHAR(20),"
	    		+ "associatedUserID VARCHAR(20),";
 	   
 	   String locationInfo = "CREATE TABLE locationInfo ("
	    		+ "locationRFID VARCHAR(20),"
	    		+ "userID VARCHAR(20),";
 	   
 	   String sensorInfo = "CREATE TABLE sensorInfo ("
	    		+ "sensorID VARCHAR(20),"
	    		+ "userID VARCHAR(20),";
 	  
 	    String sensor = "CREATE TABLE sensor ("
	    		+ "sensorID VARCHAR(20),"
	    		+ "bloodPressure VARCHAR(20),"
	    		+ "temperature VARCHAR(20),"
	    		+ "heartrate VARCHAR(20),"
	    		+ "glucose VARCHAR(20),"
	    		+ "spO2 VARCHAR(20),";
 	   
 	    String prescriptionDB = "CREATE TABLE prescriptionDB ("
	    		+ "userID VARCHAR(20),"
	    		+ "medicationID VARCHAR(20),"
	    		+ "compliance VARCHAR(20),"
	    		+ "timestamp VARCHAR(20),";
 	    
 	    String medicationDB = "CREATE TABLE medicationDB ("
	    		+ "medicationID VARCHAR(20),"
	    		+ "medication_name VARCHAR(20),"
	    		+ "dose VARCHAR(20),"
	    		+ "frequency VARCHAR(20),"
	    		+ "instructions VARCHAR(20),";
 	    
 	    String nutritionDB = "CREATE TABLE nutritionDB ("
	    		+ "userID VARCHAR(20),"
	    		+ "foodID VARCHAR(20),"
	    		+ "compliance VARCHAR(20),"
	    		+ "timestamp VARCHAR(20),";
 	    
 	    String foodDB = "CREATE TABLE foodDB ("
	    		+ "foodID VARCHAR(20),"
	    		+ "food_name VARCHAR(20),"
	    		+ "quantity VARCHAR(20),";

 		try { 
 	        	Class.forName("com.mysql.cj.jdbc.Driver");
 	        	Connection connection = DriverManager.getConnection(connectStr); 
 	        	Statement sqlStatement = connection.createStatement();
 	        	sqlStatement.executeUpdate(admin);
 	        	sqlStatement.executeUpdate(user);
 	        	sqlStatement.executeUpdate(resident);
 	        	sqlStatement.executeUpdate(associatedResident);
 	        	sqlStatement.executeUpdate(locationInfo);
 	        	sqlStatement.executeUpdate(sensorInfo);
 	        	sqlStatement.executeUpdate(sensor);
 	        	sqlStatement.executeUpdate(prescriptionDB);
 	        	sqlStatement.executeUpdate(medicationDB);
 	        	sqlStatement.executeUpdate(nutritionDB);
 	        	sqlStatement.executeUpdate(foodDB);

 	        	String message="11 new tables were created in the database";

 	            connection.close();
 	    		
 	    		return Response
 	            	      .status(Response.Status.OK)
 	            	      .entity(message)
 	            	      .build();
 	        }
 	        catch(Exception e)
 	        {
 	            System.out.println(e);
 	            return null;
 	        }	            
 	}
 	
	// DELETE ALL TABLES ENTIRELY
	@Path("/createTables")
	@DELETE
	@Produces("text/html")
	public Response deleteDatabases ()  {
	    String admin = "DROP TABLE admin";
	    String user = "DROP TABLE user";
	    String resident = "DROP TABLE resident";
	    String associatedResident = "DROP TABLE associatedResident";
	    String locationInfo = "DROP TABLE locationInfo";
	    String sensorInfo = "DROP TABLE sensorInfo";
	    String sensor = "DROP TABLE sensor";
	    String prescriptionDB = "DROP TABLE prescriptionDB";
	    String medicationDB = "DROP TABLE medicationDB";
	    String nutritionDB = "DROP TABLE nutritionDB";
	    String foodDB = "DROP TABLE foodDB";
     	
		try { 
	        	Class.forName("com.mysql.cj.jdbc.Driver");
	        	Connection connection = DriverManager.getConnection(connectStr); 
	        	Statement sqlStatement = connection.createStatement();
	         	sqlStatement.executeUpdate(admin);
	         	sqlStatement.executeUpdate(user);
	         	sqlStatement.executeUpdate(resident);
	         	sqlStatement.executeUpdate(associatedResident);
	         	sqlStatement.executeUpdate(locationInfo);
	         	sqlStatement.executeUpdate(sensorInfo);
	         	sqlStatement.executeUpdate(sensor);
	         	sqlStatement.executeUpdate(prescriptionDB);
	         	sqlStatement.executeUpdate(medicationDB);
	         	sqlStatement.executeUpdate(nutritionDB);
	         	sqlStatement.executeUpdate(foodDB);
	        	
	        	String message1="11 tables were deleted from database";

	            connection.close();
	    		
	    		return Response
	            	      .status(Response.Status.OK)
	            	      .entity(message1)
	            	      .build();
	        }
	        catch(Exception e)
	        {
	            System.out.println(e);
	            return null;
	        }	            
	}
	
	//////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////// CRUD Methods ////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////
	
	// method to add a complete record into any of the 11 tables
	// JSON must contain 'tableName'
	@Path("newRecord")
	@POST
	public Response newRecord (String recordInfo) throws Exception {
		
		JSONObject userJSON = new JSONObject (recordInfo);
		String tableName = userJSON.getString("tableName");
		
		if (tableName == "admin") {		
			String userID = userJSON.getString("userID");
			String username = userJSON.getString("username");
			String password = userJSON.getString("password");
							
	        String SQL = "INSERT INTO admin VALUES ("
	        		+ "\"" + userID 	+ "\","
	        		+ "\"" + username + "\","
	        		+ "\"" + password 	+ "\")";
	        
	        System.out.println(SQL);
	        
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
	        
	        System.out.println(SQL);
	        
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
							
	        String SQL = "INSERT INTO resident VALUES ("
	        		+ "\"" + userID 	+ "\","
	        		+ "\"" + locationID + "\","
	        		+ "\"" + sensorID 	+ "\")";
	        
	        System.out.println(SQL);
	        
	        Class.forName("com.mysql.cj.jdbc.Driver");
	    	Connection connection = DriverManager.getConnection(connectStr); 
			Statement sqlStatement = connection.createStatement();	 
			sqlStatement.executeUpdate(SQL);
			connection.close();
		}
		
		if (tableName == "associatedResident") {		
			String userID = userJSON.getString("userID");
			String associatedUserID = userJSON.getString("associatedUserID");
							
	        String SQL = "INSERT INTO associatedResident VALUES ("
	        		+ "\"" + userID 			+ "\","
	        		+ "\"" + associatedUserID 	+ "\")";
	        
	        System.out.println(SQL);
	        
	        Class.forName("com.mysql.cj.jdbc.Driver");
	    	Connection connection = DriverManager.getConnection(connectStr); 
			Statement sqlStatement = connection.createStatement();	 
			sqlStatement.executeUpdate(SQL);
			connection.close();
		}
		
		if (tableName == "sensorInfo") {		
			String sensorID = userJSON.getString("sensorID");
			String userID = userJSON.getString("userID");
							
	        String SQL = "INSERT INTO sensorInfo VALUES ("
	        		+ "\"" + sensorID 			+ "\","
	        		+ "\"" + userID 	+ "\")";
	        
	        System.out.println(SQL);
	        
	        Class.forName("com.mysql.cj.jdbc.Driver");
	    	Connection connection = DriverManager.getConnection(connectStr); 
			Statement sqlStatement = connection.createStatement();	 
			sqlStatement.executeUpdate(SQL);
		}
		
		if (tableName == "sensor") {		
			String sensorID = userJSON.getString("sensorID");
			String bloodPresuure = userJSON.getString("bloodPresuure");
			String temperature = userJSON.getString("temperature");
			String heartrate = userJSON.getString("heartrate");
			String glucose = userJSON.getString("glucose");
			String spO2 = userJSON.getString("spO2");
							
	        String SQL = "INSERT INTO sensor VALUES ("
	        		+ "\"" + sensorID 		+ "\","
	        		+ "\"" + bloodPresuure 	+ "\","
	        		+ "\"" + temperature 	+ "\","
	        		+ "\"" + heartrate 		+ "\","
	        		+ "\"" + glucose 		+ "\","
	        		+ "\"" + spO2		 	+ "\")";
	        
	        System.out.println(SQL);
	        
	        Class.forName("com.mysql.cj.jdbc.Driver");
	    	Connection connection = DriverManager.getConnection(connectStr); 
			Statement sqlStatement = connection.createStatement();	 
			sqlStatement.executeUpdate(SQL);
			connection.close();
		}
		
		if (tableName == "locationInfo") {		
			String locationRFID = userJSON.getString("locationRFID");
			String userID = userJSON.getString("userID");
							
	        String SQL = "INSERT INTO locationInfo VALUES ("
	        		+ "\"" + locationRFID 	+ "\","
	        		+ "\"" + userID 		+ "\")";
	        
	        System.out.println(SQL);
	        
	        Class.forName("com.mysql.cj.jdbc.Driver");
	    	Connection connection = DriverManager.getConnection(connectStr); 
			Statement sqlStatement = connection.createStatement();	 
			sqlStatement.executeUpdate(SQL);
			connection.close();
		}
		
		if (tableName == "prescriptionDB") {		
			String userID = userJSON.getString("userID");
			String medicationID = userJSON.getString("medicationID");
			String compliance = userJSON.getString("compliance");
			String timestamp = userJSON.getString("timestamp");
							
	        String SQL = "INSERT INTO prescriptionDB VALUES ("
	        		+ "\"" + userID 		+ "\","
	        		+ "\"" + medicationID 	+ "\","
	        		+ "\"" + compliance 	+ "\","
	        		+ "\"" + timestamp		+ "\")";
	        
	        System.out.println(SQL);
	        
	        Class.forName("com.mysql.cj.jdbc.Driver");
	    	Connection connection = DriverManager.getConnection(connectStr); 
			Statement sqlStatement = connection.createStatement();	 
			sqlStatement.executeUpdate(SQL);
			connection.close();
		}
		
		if (tableName == "medicationDB") {		
			String medicationID = userJSON.getString("medicationID");
			String medicationName = userJSON.getString("medicationName");
			String dose = userJSON.getString("dose");
			String frequency = userJSON.getString("frequency");
			String instructions = userJSON.getString("instructions");
							
	        String SQL = "INSERT INTO medicationDB VALUES ("
	        		+ "\"" + medicationID 		+ "\","
	        		+ "\"" + medicationName 	+ "\","
	        		+ "\"" + dose 	+ "\","
	        		+ "\"" + frequency 	+ "\","
	        		+ "\"" + instructions		+ "\")";
	        
	        System.out.println(SQL);
	        
	        Class.forName("com.mysql.cj.jdbc.Driver");
	    	Connection connection = DriverManager.getConnection(connectStr); 
			Statement sqlStatement = connection.createStatement();	 
			sqlStatement.executeUpdate(SQL);
			connection.close();
		}
		
		if (tableName == "nutritionDB") {		
			String userID = userJSON.getString("userID");
			String foodID = userJSON.getString("foodID");
			String compliance = userJSON.getString("compliance");
			String timestamp = userJSON.getString("timestamp");
							
	        String SQL = "INSERT INTO nutritionDB VALUES ("
	        		+ "\"" + userID 		+ "\","
	        		+ "\"" + foodID 	+ "\","
	        		+ "\"" + compliance 	+ "\","
	        		+ "\"" + timestamp		+ "\")";
	        
	        System.out.println(SQL);
	        
	        Class.forName("com.mysql.cj.jdbc.Driver");
	    	Connection connection = DriverManager.getConnection(connectStr); 
			Statement sqlStatement = connection.createStatement();	 
			sqlStatement.executeUpdate(SQL);
			connection.close();
		}
		
		if (tableName == "foodDB") {		
			String foodID = userJSON.getString("foodID");
			String foodName = userJSON.getString("foodName");
			String quantity = userJSON.getString("quantity");
										
	        String SQL = "INSERT INTO foodDB VALUES ("
	        		+ "\"" + foodID 		+ "\","
	        		+ "\"" + foodName 	+ "\","
	        		+ "\"" + quantity		+ "\")";
	        
	        System.out.println(SQL);
	        
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
				.build();
	}
	
	// Delete a record from any table; references tableName and first key in table
	@Path("deleteRecord")
	@DELETE
	public Response deleteRecord (String recordInfo) throws SQLException, Exception  {
		
		JSONObject userJSON = new JSONObject (recordInfo);
		String tableName = userJSON.getString("tableName");
		String primaryKey = userJSON.getString("PrimaryKey");
		
	   	Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();	 
		
		if (tableName == "admin") {
			sqlStatement.executeUpdate("DELETE FROM " + tableName + " WHERE userID = \"" + primaryKey + "\"" );
		}
		if (tableName == "user") {
			sqlStatement.executeUpdate("DELETE FROM " + tableName + " WHERE userID = \"" + primaryKey + "\"" );
		}
		if (tableName == "resident") {
			sqlStatement.executeUpdate("DELETE FROM " + tableName + " WHERE userID = \"" + primaryKey + "\"" );
		}
		if (tableName == "associatedResident") {
			sqlStatement.executeUpdate("DELETE FROM " + tableName + " WHERE userID = \"" + primaryKey + "\"" );
		}
		if (tableName == "sensorInfo") {
			sqlStatement.executeUpdate("DELETE FROM " + tableName + " WHERE sensorID = \"" + primaryKey + "\"" );
		}
		if (tableName == "sensor") {
			sqlStatement.executeUpdate("DELETE FROM " + tableName + " WHERE locationRFID = \"" + primaryKey + "\"" );
		}
		if (tableName == "locationInfo") {
			sqlStatement.executeUpdate("DELETE FROM " + tableName + " WHERE alternative_name = \"" + primaryKey + "\"" );
		}
		if (tableName == "prescriptionDB") {
			sqlStatement.executeUpdate("DELETE FROM " + tableName + " WHERE userID = \"" + primaryKey + "\"" );
		}
		if (tableName == "medicationDB") {
			sqlStatement.executeUpdate("DELETE FROM " + tableName + " WHERE medicationID = \"" + primaryKey + "\"" );
		}
		if (tableName == "nutritionDB") {
			sqlStatement.executeUpdate("DELETE FROM " + tableName + " WHERE userID = \"" + primaryKey + "\"" );
		}
		if (tableName == "foodDB") {
			sqlStatement.executeUpdate("DELETE FROM " + tableName + " WHERE foodID = \"" + primaryKey + "\"" );
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
}
