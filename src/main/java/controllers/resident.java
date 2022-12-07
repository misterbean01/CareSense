package controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
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

@Path("/resident")
public class resident {
	// connect to database
	main careSense = new main();
	String connectStr = careSense.serverConnect();
	
	// get resident via userID
	@Path("{userID}")
	@GET
	public Response getResident (@PathParam("userID") String userID) throws Exception {
		// System.out.println(userInfo);

		JSONObject newRecord = new JSONObject ();
		
		Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();
		String query = "SELECT userID, userType, username, password, firstName, lastName, birthday, "
				+ "gender, phoneNumber FROM user WHERE userID = '" + userID + "'";
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
	@Path("{userInfo}")
	@DELETE
	public Response deleteResident (@PathParam("userInfo") String userInfo) throws SQLException, Exception  {
		
		JSONObject userJSON = new JSONObject (userInfo);
		String userID = userJSON.getString("userID");
		
	   	Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();	 

		sqlStatement.executeUpdate("DELETE FROM user WHERE userID = '" + userID + "'");
		
		
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
	public Response addResident ( String userJSONRequest) throws Exception {
		
		JSONObject userJSON = new JSONObject (userJSONRequest);
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
	@Path("{userInfo}")
	@PUT
	public Response updateResident (String userJSONRequest) throws Exception {
		
		JSONObject userJSON = new JSONObject (userJSONRequest);
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
	
	// get all resident
	@Path("all")
	@GET
	public Response getResidentAll() throws Exception {
		// System.out.println(userInfo);
		JSONArray listOfRecord = new JSONArray();
		

		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();
		String query = "SELECT userID, userType, username, password, firstName, lastName, birthday, "
				+ "gender, phoneNumber FROM user WHERE userType = 'resident'";
		ResultSet rs = sqlStatement.executeQuery(query);
		while (rs.next())
		{
			JSONObject newRecord = new JSONObject();
			newRecord.put("userID", rs.getString("userID"));
			newRecord.put("userType", rs.getString("userType"));
			newRecord.put("username", rs.getString("username"));
			newRecord.put("password", rs.getString("password"));
			newRecord.put("firstName", rs.getString("firstName"));
			newRecord.put("lastName", rs.getString("lastName"));
			newRecord.put("birthday", rs.getString("birthday"));
			newRecord.put("gender", rs.getString("gender"));
			newRecord.put("phoneNumber", rs.getString("phoneNumber"));
			listOfRecord.put(newRecord);
		}

		return Response
				.status(Response.Status.OK)
				.header("userCount", listOfRecord.length()) // custom header
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Headers",
						"Origin, X-Requested-With, Content-Type, Accept")
				.header("Access-Control-Allow-Methods",
						"Origin, X-Requested-With, GET,POST,OPTIONS,DELETE,PUT")
				.entity(listOfRecord.toString())
				.build();
	}
	
	// get resident information via userID
	@Path("details/{userID}")
	@GET
	public Response getResidentDetails (@PathParam("userID") String userID) throws Exception {
		
		// Get the Resident's location ID and sensor ID
		JSONObject newRecord = new JSONObject ();
		String locationID = "";
		String sensorID = "";

		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();
		String query = "SELECT userID, locationID, sensorID FROM resident WHERE userID = '" + userID + "'";
		ResultSet rs = sqlStatement.executeQuery(query);
		while (rs.next())
		{
			locationID = rs.getString("locationID");
			sensorID = rs.getString("sensorID");
		}
		
		// GET /location Response using location ID
		String url1 = "http://localhost:8080/CareSense/api/location/" + locationID;
		JSONObject locationResponse = new JSONObject(getResponse(url1)); // location info
		
		// GET /sensor Response using Sensor ID
		String url2 = "http://localhost:8080/CareSense/api/sensor/" + sensorID;
		JSONObject sensorResponse = new JSONObject(getResponse(url2)); // sensor info
		
		// GET /prescription/resident Response using user ID
		String url3 = "http://localhost:8080/CareSense/api/prescription/resident/" + userID;
		JSONArray prescriptionResponse = new JSONArray(getResponse(url3)); // prescription info
		
		// GET /associated Response using resident ID
		String url4 = "http://localhost:8080/CareSense/api/associated/" + userID;
		JSONArray associatedResponse = new JSONArray(getResponse(url4)); // associated info
		JSONArray associatedFamily = new JSONArray();
		JSONArray associatedDoctor = new JSONArray();
		JSONArray associatedCaretaker = new JSONArray();
		for (int i = 0; i < associatedResponse.length(); i++) {
			//System.out.println(associatedResponse.getJSONObject(i));
			String userIDString = associatedResponse.getJSONObject(i).getString("associatedUserID");
			String urlIN = "http://localhost:8080/CareSense/api/user/" + userIDString;
			JSONObject newObj = new JSONObject(getResponse(urlIN));
			
			if (userIDString.contains("fam")) {				
				associatedFamily.put(newObj);
			} else if (userIDString.contains("care")) {
				associatedCaretaker.put(newObj);
			} else if (userIDString.contains("doc")) {
				associatedDoctor.put(newObj);
			}
		}
		
		JSONObject residentFinalRespose = new JSONObject();
		residentFinalRespose.put("location", locationResponse);
		residentFinalRespose.put("sensor", sensorResponse);
		residentFinalRespose.put("prescription", prescriptionResponse);
		residentFinalRespose.put("familyMember", associatedFamily);
		residentFinalRespose.put("doctor", associatedDoctor);
		residentFinalRespose.put("caretaker", associatedCaretaker);
		
		return Response
				.status(Response.Status.OK)
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Headers",
						"Origin, X-Requested-With, Content-Type, Accept")
				.header("Access-Control-Allow-Methods",
						"Origin, X-Requested-With, GET,POST,OPTIONS,DELETE,PUT")
				.entity(residentFinalRespose.toString())
				.build();
	}
	
	public String getResponse(String link) throws IOException {
		URL obj1 = new URL(link);
		HttpURLConnection con1 = (HttpURLConnection) obj1.openConnection();
		con1.setRequestMethod("GET");
		con1.setRequestProperty("User-Agent", "Mozilla/5.0");
		int responseCode = con1.getResponseCode();
		if (responseCode != 404) {
			System.out.println("\nSending 'GET' request to URL : " + link);
			System.out.println("Response Code : " + responseCode);
			BufferedReader in = new BufferedReader(
					new InputStreamReader(con1.getInputStream()));
			String inputLine;
			StringBuffer responseURL1 = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
				responseURL1.append(inputLine);
			}
			in.close();
			return responseURL1.toString();	
		} else {
			return "{}";	
		}
	}
}
