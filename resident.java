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
	
	// get resident via userID
	@Path("resident/{userInfo}")
	@GET
	public Response getResident (@PathParam("userInfo") String userInfo) throws Exception {
		
		JSONObject userJSON = new JSONObject (userInfo);
		String userID = userJSON.getString("userID");
		JSONObject newRecord = new JSONObject ();
		
		Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();
		String query = "SELECT userID, userType, username, password, firstName, lastName, birthday, gender, phoneNumber FROM user WHERE userID = " + userID;
		ResultSet rs = sqlStatement.executeQuery(query);
		while (rs.next())
		{
			newRecord.put("userID", userID);
			newRecord.put("userType", rs.getString("userType"));
			newRecord.put("username", rs.getString("username"));
			newRecord.put("password", rs.getString("password"));
			newRecord.put("firstName", rs.getString("firstName"));
			newRecord.put("lastName", rs.getString("lastName"));
			newRecord.put("birthday", rs.getString("birthday"));
			newRecord.put("gender", rs.getString("gender"));
			newRecord.put("phoneNumber", rs.getString("phoneNumber"));
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
	
	// Delete a resident
	@Path("resident/{userInfo}")
	@DELETE
	public Response deleteResident (@PathParam("userInfo") String userInfo) throws SQLException, Exception  {
		
		JSONObject userJSON = new JSONObject (userInfo);
		String userID = userJSON.getString("userID");
		
	   	Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();	 

		sqlStatement.executeUpdate("DELETE FROM user WHERE userID = " + userID);
		
		
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
	@Path("resident/{userInfo}")
	@POST
	public Response addResident (@PathParam("userInfo") String userInfo) throws Exception {
		
		JSONObject userJSON = new JSONObject (userInfo);
		JSONObject newRecord = new JSONObject ();
					
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
	@Path("resident/{userInfo}")
	@PUT
	public Response updateResident (@PathParam("userInfo") String userInfo) throws Exception {
		
		JSONObject userJSON = new JSONObject (userInfo);
		JSONObject newRecord = new JSONObject ();
					
		String userID = "userID = \"" 		+ userJSON.getString("userID") 		+ "\"";
		String userType = "userType = \"" 	+ userJSON.getString("userType") 	+ "\"";
		String username = "username = \"" 	+ userJSON.getString("username") 	+ "\"";
		String password = "password = \"" 	+ userJSON.getString("password") 	+ "\"";
		String firstName = "firstName = \"" + userJSON.getString("firstName") 	+ "\"";
		String lastName = "lastName = \"" 	+ userJSON.getString("lastName") 	+ "\"";
		String birthday = "birthday = \"" 	+ userJSON.getString("birthday") 	+ "\"";
		String gender = "gender = \"" 		+ userJSON.getString("gender") 		+ "\"";
		String phoneNumber = "phoneNumber = \"" + userJSON.getString("phoneNumber") + "\"";
			
		newRecord.put("userID", userID);
		newRecord.put("userType", userType);
		newRecord.put("username", username);
		newRecord.put("password", password);
		newRecord.put("firstName", firstName);
		newRecord.put("lastName", lastName);
		newRecord.put("birthday", birthday);
		newRecord.put("gender", gender);
		newRecord.put("phoneNumber", phoneNumber);
					
        String SQL = "UPDATE user SET " 
        		+ userID 		+ ", " 
        		+ userType 		+ ", " 
        		+ username		+ ", " 
        		+ password		+ ", " 
        		+ firstName		+ ", " 
        		+ lastName		+ ", " 
        		+ birthday		+ ", " 
        		+ gender		+ ", " 
        		+ phoneNumber   
        		+ "WHERE userID = " + userID;
	        
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