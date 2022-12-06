package controllers;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

import javax.ws.rs.DELETE;
import javax.ws.rs.POST;

import javax.ws.rs.Produces;

@Path("/build")
public class build {
	//database connection information
	
	main careSense = new main();
	String connectStr = careSense.serverConnect();
	
 // CREATE ALL TABLES
 	@Path("/createTables")
 	@POST
 	@Produces("text/html")
 	public Response createTables ()  {
 		String admin = "CREATE TABLE admin ("
 	    		+ "userID VARCHAR(20) NOT NULL,"
 	    		+ "username VARCHAR(20),"
 	    		+ "password VARCHAR(20),"
 	    		+ "PRIMARY KEY (userID))";

 	    String user = "CREATE TABLE user ("
 	    		+ "userID VARCHAR(20)NOT NULL,"
 	    		+ "userType VARCHAR(20),"
 	    		+ "username VARCHAR(20),"
 	    		+ "password VARCHAR(20),"
 	    		+ "firstName VARCHAR(20),"
 	    		+ "lastName VARCHAR(20),"
 	    		+ "birthday VARCHAR(20),"
 	    		+ "gender VARCHAR(20),"
 	    		+ "phoneNumber VARCHAR(20),"
 	    		+ "PRIMARY KEY (userID))";
 	    
 	    String resident = "CREATE TABLE resident ("
 	    		+ "userID VARCHAR(20) NOT NULL,"
 	    		+ "locationID VARCHAR(20),"
 	    		+ "sensorID VARCHAR(20),"
 	    		+ "PRIMARY KEY (userID))";
 	    
 	    String associatedResident = "CREATE TABLE associatedResident ("
	    		+ "uniqueID VARCHAR(20) NOT NULL,"
	    		+ "userID VARCHAR(20),"
	    		+ "associatedUserID VARCHAR(20),"
	    		+ "PRIMARY KEY (uniqueID))";
 	   
 	   String location = "CREATE TABLE location ("
	    		+ "locationID VARCHAR(20) NOT NULL,"
	    		+ "latitude VARCHAR(20),"
	    		+ "longitude VARCHAR(20),"
	    		+ "timestamp VARCHAR(20),"
	    		+ "PRIMARY KEY (locationID))";
 	   
 	   String sensor = "CREATE TABLE sensor ("
	    		+ "sensorID VARCHAR(20) NOT NULL,"
	    		+ "bloodPressure VARCHAR(20),"
	    		+ "temperature VARCHAR(20),"
	    		+ "heartrate VARCHAR(20),"
	    		+ "glucose VARCHAR(20),"
	    		+ "spO2 VARCHAR(20),"
	    		+ "timestamp VARCHAR(20),"
	    		+ "PRIMARY KEY (sensorID))";
 	   
 	    String prescription = "CREATE TABLE prescription ("
 	    		+ "prescriptionID VARCHAR(20) NOT NULL,"
 	    		+ "userID VARCHAR(20),"
	    		+ "medicationName VARCHAR(40),"
	    		+ "dose VARCHAR(20),"
	    		+ "frequency VARCHAR(20),"
	    		+ "intendedUse VARCHAR(40),"
	    		+ "instructions VARCHAR(40),"
	    		+ "PRIMARY KEY (prescriptionID))";

 		try { 
 	        	Class.forName("com.mysql.cj.jdbc.Driver");
 	        	Connection connection = DriverManager.getConnection(connectStr); 
 	        	Statement sqlStatement = connection.createStatement();
 	        	sqlStatement.executeUpdate(admin);
 	        	sqlStatement.executeUpdate(user);
 	        	sqlStatement.executeUpdate(resident);
 	        	sqlStatement.executeUpdate(associatedResident);
 	        	sqlStatement.executeUpdate(location);
 	        	sqlStatement.executeUpdate(sensor);
 	        	sqlStatement.executeUpdate(prescription);

 	        	String message="7 new tables were created in the database";

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
	    String location = "DROP TABLE location";
	    String sensor = "DROP TABLE sensor";
	    String prescription = "DROP TABLE prescription";
     	
		try { 
	        	Class.forName("com.mysql.cj.jdbc.Driver");
	        	Connection connection = DriverManager.getConnection(connectStr); 
	        	Statement sqlStatement = connection.createStatement();
	         	sqlStatement.executeUpdate(admin);
	         	sqlStatement.executeUpdate(user);
	         	sqlStatement.executeUpdate(resident);
	         	sqlStatement.executeUpdate(associatedResident);
	         	sqlStatement.executeUpdate(location);
	         	sqlStatement.executeUpdate(sensor);
	         	sqlStatement.executeUpdate(prescription);

	        	
	        	String message1="7 tables were deleted from database";

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
	

	@Path ("fillTables")
	@POST
	public Response fillTables () throws Exception {
		// create users
		String admin = "INSERT INTO admin VALUES ("
        		+ "\"" + "admin001" 	+ "\","
        		+ "\"" + "admin" 		+ "\","
        		+ "\"" + "password" 	+ "\")";
        
		String res1 = "INSERT INTO user VALUES ("
        		+ "\"" + "res001" 	+ "\","
        		+ "\"" + "resident" 	+ "\","
        		+ "\"" + "resident01" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "John"	+ "\","
        		+ "\"" + "Smith"	+ "\","
        		+ "\"" + "01/23/1950"	+ "\","
        		+ "\"" + "Male"		+ "\","
        		+ "\"" + "312-543-5837" + "\")";
		
		String res2 = "INSERT INTO user VALUES ("
        		+ "\"" + "res002" 	+ "\","
        		+ "\"" + "resident" 	+ "\","
        		+ "\"" + "resident02" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Mary"	+ "\","
        		+ "\"" + "Sanders"	+ "\","
        		+ "\"" + "05/23/45"	+ "\","
        		+ "\"" + "Female"		+ "\","
        		+ "\"" + "435-654-2345" + "\")";
		
		String res3 = "INSERT INTO user VALUES ("
        		+ "\"" + "res003" 	+ "\","
        		+ "\"" + "resident" 	+ "\","
        		+ "\"" + "resident03" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Jacob"	+ "\","
        		+ "\"" + "Franks"	+ "\","
        		+ "\"" + "02/28/34"	+ "\","
        		+ "\"" + "Male"		+ "\","
        		+ "\"" + "123-453-6534" + "\")";
		
		String res4 = "INSERT INTO user VALUES ("
        		+ "\"" + "res004" 	+ "\","
        		+ "\"" + "resident" 	+ "\","
        		+ "\"" + "resident04" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Connie"	+ "\","
        		+ "\"" + "deGrom"	+ "\","
        		+ "\"" + "06/11/57"	+ "\","
        		+ "\"" + "Female"		+ "\","
        		+ "\"" + "867-543-5678" + "\")";
		
		String res5 = "INSERT INTO user VALUES ("
        		+ "\"" + "res005" 	+ "\","
        		+ "\"" + "resident" 	+ "\","
        		+ "\"" + "resident05" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Max"	+ "\","
        		+ "\"" + "Whitehair"	+ "\","
        		+ "\"" + "12/30/1967"	+ "\","
        		+ "\"" + "Male"		+ "\","
        		+ "\"" + "867-543-5678" + "\")";
		
		String res6 = "INSERT INTO user VALUES ("
        		+ "\"" + "res006" 	+ "\","
        		+ "\"" + "resident" 	+ "\","
        		+ "\"" + "resident06" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Sue"	+ "\","
        		+ "\"" + "Short"	+ "\","
        		+ "\"" + "11/04/1944"	+ "\","
        		+ "\"" + "Female"		+ "\","
        		+ "\"" + "654-321-0987" + "\")";
		
		String res7 = "INSERT INTO user VALUES ("
        		+ "\"" + "res007" 	+ "\","
        		+ "\"" + "resident" 	+ "\","
        		+ "\"" + "resident07" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Kevin"	+ "\","
        		+ "\"" + "Brown"	+ "\","
        		+ "\"" + "11/04/1943"	+ "\","
        		+ "\"" + "Male"		+ "\","
        		+ "\"" + "186-346-2365" + "\")";
		
		String res8 = "INSERT INTO user VALUES ("
        		+ "\"" + "res008" 	+ "\","
        		+ "\"" + "resident" 	+ "\","
        		+ "\"" + "resident08" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Julia"	+ "\","
        		+ "\"" + "Henry"	+ "\","
        		+ "\"" + "05/22/1943"	+ "\","
        		+ "\"" + "Female"		+ "\","
        		+ "\"" + "987-554-3371" + "\")";
		
		String care1 = "INSERT INTO user VALUES ("
        		+ "\"" + "care001" 	+ "\","
        		+ "\"" + "caretaker" 	+ "\","
        		+ "\"" + "caretaker01" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Holly"	+ "\","
        		+ "\"" + "Hauser"	+ "\","
        		+ "\"" + "07/04/1978"	+ "\","
        		+ "\"" + "Female"		+ "\","
        		+ "\"" + "312-345-0987" + "\")";
		
		String care2 = "INSERT INTO user VALUES ("
        		+ "\"" + "care002" 	+ "\","
        		+ "\"" + "caretaker" 	+ "\","
        		+ "\"" + "caretaker02" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Bonita"	+ "\","
        		+ "\"" + "Springs"	+ "\","
        		+ "\"" + "09/11/1987"	+ "\","
        		+ "\"" + "Female"		+ "\","
        		+ "\"" + "345-546-4832" + "\")";
		
		String care3 = "INSERT INTO user VALUES ("
        		+ "\"" + "care003" 	+ "\","
        		+ "\"" + "caretaker" 	+ "\","
        		+ "\"" + "caretaker03" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Julius"	+ "\","
        		+ "\"" + "Orange"	+ "\","
        		+ "\"" + "03/14/1980"	+ "\","
        		+ "\"" + "Male"		+ "\","
        		+ "\"" + "225-443-5847" + "\")";
		
		String care4 = "INSERT INTO user VALUES ("
        		+ "\"" + "care004" 	+ "\","
        		+ "\"" + "caretaker" 	+ "\","
        		+ "\"" + "caretaker04" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Brett"	+ "\","
        		+ "\"" + "Mucinoy"	+ "\","
        		+ "\"" + "06/19/55"	+ "\","
        		+ "\"" + "Male"		+ "\","
        		+ "\"" + "443-511-5648" + "\")";
		
		String care5 = "INSERT INTO user VALUES ("
        		+ "\"" + "care005" 	+ "\","
        		+ "\"" + "caretaker" 	+ "\","
        		+ "\"" + "caretaker05" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Walter"	+ "\","
        		+ "\"" + "Neusbaum"	+ "\","
        		+ "\"" + "12/01/1977"	+ "\","
        		+ "\"" + "Male"		+ "\","
        		+ "\"" + "267-533-1178" + "\")";
		
		String doc1 = "INSERT INTO user VALUES ("
        		+ "\"" + "doc001" 	+ "\","
        		+ "\"" + "doctor" 	+ "\","
        		+ "\"" + "doctor01" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Doogie"	+ "\","
        		+ "\"" + "McCutcheon"	+ "\","
        		+ "\"" + "01/24/1973"	+ "\","
        		+ "\"" + "Male"		+ "\","
        		+ "\"" + "313-854-1987" + "\")";
		
		String doc2 = "INSERT INTO user VALUES ("
        		+ "\"" + "doc002" 	+ "\","
        		+ "\"" + "doctor" 	+ "\","
        		+ "\"" + "doctor02" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Nancy"	+ "\","
        		+ "\"" + "Wilcox"	+ "\","
        		+ "\"" + "02/19/1970"	+ "\","
        		+ "\"" + "Female"		+ "\","
        		+ "\"" + "334-512-4800" + "\")";
		
		String doc3 = "INSERT INTO user VALUES ("
        		+ "\"" + "doc003" 	+ "\","
        		+ "\"" + "doctor" 	+ "\","
        		+ "\"" + "doctor03" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Molly"	+ "\","
        		+ "\"" + "Kreider"	+ "\","
        		+ "\"" + "09/23/1979"	+ "\","
        		+ "\"" + "Female"		+ "\","
        		+ "\"" + "998-451-6749" + "\")";
		
		String doc4 = "INSERT INTO user VALUES ("
        		+ "\"" + "doc004" 	+ "\","
        		+ "\"" + "doctor" 	+ "\","
        		+ "\"" + "doctor04" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Craig"	+ "\","
        		+ "\"" + "Pliney"	+ "\","
        		+ "\"" + "06/11/1969"	+ "\","
        		+ "\"" + "Male"		+ "\","
        		+ "\"" + "253-545-5128" + "\")";
		
		String doc5 = "INSERT INTO user VALUES ("
        		+ "\"" + "doc005" 	+ "\","
        		+ "\"" + "doctor" 	+ "\","
        		+ "\"" + "doctor05" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Priscilla"	+ "\","
        		+ "\"" + "Peach"	+ "\","
        		+ "\"" + "03/01/1968"	+ "\","
        		+ "\"" + "Female"		+ "\","
        		+ "\"" + "982-483-5948" + "\")";
		
		String fam1 = "INSERT INTO user VALUES ("
        		+ "\"" + "fam001" 	+ "\","
        		+ "\"" + "familyMember" 	+ "\","
        		+ "\"" + "family01" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Professor"	+ "\","
        		+ "\"" + "Dumbledor"	+ "\","
        		+ "\"" + "01/24/1923"	+ "\","
        		+ "\"" + "Male"		+ "\","
        		+ "\"" + "813-814-1985" + "\")";
		
		String fam2 = "INSERT INTO user VALUES ("
        		+ "\"" + "fam002" 	+ "\","
        		+ "\"" + "familyMember" 	+ "\","
        		+ "\"" + "family02" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Ralph"	+ "\","
        		+ "\"" + "Machio"	+ "\","
        		+ "\"" + "02/12/1967"	+ "\","
        		+ "\"" + "Male"		+ "\","
        		+ "\"" + "934-234-5678" + "\")";
		
		String fam3 = "INSERT INTO user VALUES ("
        		+ "\"" + "fam003" 	+ "\","
        		+ "\"" + "familyMember" 	+ "\","
        		+ "\"" + "family03" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Greta"	+ "\","
        		+ "\"" + "Kis"	+ "\","
        		+ "\"" + "02/12/1950"	+ "\","
        		+ "\"" + "Female"		+ "\","
        		+ "\"" + "798-423-6723" + "\")";
		
		String fam4 = "INSERT INTO user VALUES ("
        		+ "\"" + "fam004" 	+ "\","
        		+ "\"" + "familyMember" 	+ "\","
        		+ "\"" + "family04" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Bronny"	+ "\","
        		+ "\"" + "Moustachio"	+ "\","
        		+ "\"" + "01/18/1954"	+ "\","
        		+ "\"" + "Male"		+ "\","
        		+ "\"" + "153-544-5128" + "\")";
		
		String fam5 = "INSERT INTO user VALUES ("
        		+ "\"" + "fam005" 	+ "\","
        		+ "\"" + "familyMember" 	+ "\","
        		+ "\"" + "family05" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Laura"	+ "\","
        		+ "\"" + "Grosenbacher"	+ "\","
        		+ "\"" + "07/03/1950"	+ "\","
        		+ "\"" + "Female"		+ "\","
        		+ "\"" + "382-233-2348" + "\")";
		
		String fam6 = "INSERT INTO user VALUES ("
        		+ "\"" + "fam006" 	+ "\","
        		+ "\"" + "familyMember" 	+ "\","
        		+ "\"" + "family06" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Lonnie"	+ "\","
        		+ "\"" + "Trips"	+ "\","
        		+ "\"" + "03/03/1986"	+ "\","
        		+ "\"" + "Male"		+ "\","
        		+ "\"" + "672-223-2336" + "\")";
		
		String fam7 = "INSERT INTO user VALUES ("
        		+ "\"" + "fam007" 	+ "\","
        		+ "\"" + "familyMember" 	+ "\","
        		+ "\"" + "family07" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Abigail"	+ "\","
        		+ "\"" + "Marches"	+ "\","
        		+ "\"" + "12/25/1969"	+ "\","
        		+ "\"" + "Female"		+ "\","
        		+ "\"" + "252-113-2556" + "\")";
		
		String fam8 = "INSERT INTO user VALUES ("
        		+ "\"" + "fam008" 	+ "\","
        		+ "\"" + "familyMember" 	+ "\","
        		+ "\"" + "family08" 	+ "\"," 
        		+ "\"" + "password"	+ "\","
        		+ "\"" + "Allison"	+ "\","
        		+ "\"" + "Toomey"	+ "\","
        		+ "\"" + "05/12/1980"	+ "\","
        		+ "\"" + "Female"		+ "\","
        		+ "\"" + "632-115-2527" + "\")";
		
		// resident
		String resident1 = "INSERT INTO resident VALUES ("
        		+ "\"" + "res001" 	+ "\","
        		+ "\"" + "loc001" 	+ "\","
        		+ "\"" + "sensor001" + "\")";
		
		String resident2 = "INSERT INTO resident VALUES ("
        		+ "\"" + "res002" 	+ "\","
        		+ "\"" + "loc002" 	+ "\","
        		+ "\"" + "sensor002" + "\")";
		
		String resident3 = "INSERT INTO resident VALUES ("
        		+ "\"" + "res003" 	+ "\","
        		+ "\"" + "loc003" 	+ "\","
        		+ "\"" + "sensor003" + "\")";
		
		String resident4 = "INSERT INTO resident VALUES ("
        		+ "\"" + "res004" 	+ "\","
        		+ "\"" + "loc004" 	+ "\","
        		+ "\"" + "sensor004" + "\")";
		
		String resident5 = "INSERT INTO resident VALUES ("
        		+ "\"" + "res005" 	+ "\","
        		+ "\"" + "loc005" 	+ "\","
        		+ "\"" + "sensor005" + "\")";
		
		String resident6 = "INSERT INTO resident VALUES ("
        		+ "\"" + "res006" 	+ "\","
        		+ "\"" + "loc006" 	+ "\","
        		+ "\"" + "sensor006" + "\")";
		
		String resident7 = "INSERT INTO resident VALUES ("
        		+ "\"" + "res007" 	+ "\","
        		+ "\"" + "loc007" 	+ "\","
        		+ "\"" + "sensor007" + "\")";
		
		String resident8 = "INSERT INTO resident VALUES ("
        		+ "\"" + "res008" 	+ "\","
        		+ "\"" + "loc008" 	+ "\","
        		+ "\"" + "sensor008" + "\")";
		
		// associatedResident
		String assoc1a = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc001" 	+ "\","
				+ "\"" + "res001" 	+ "\","
        		+ "\"" + "fam001" + "\")";
		
		String assoc1b = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc002" 	+ "\","
				+ "\"" + "res001" 	+ "\","
        		+ "\"" + "care001" + "\")";
		
		String assoc1c = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc003" 	+ "\","
				+ "\"" + "res001" 	+ "\","
        		+ "\"" + "doc001" + "\")";
		
		String assoc2a = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc004" 	+ "\","
				+ "\"" + "res002" 	+ "\","
        		+ "\"" + "fam002" + "\")";
		
		String assoc2b = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc005" 	+ "\","
				+ "\"" + "res002" 	+ "\","
        		+ "\"" + "care001" + "\")";
		
		String assoc2c = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc006" 	+ "\","
				+ "\"" + "res002" 	+ "\","
        		+ "\"" + "doc001" + "\")";
		
		String assoc3a = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc007" 	+ "\","
				+ "\"" + "res003" 	+ "\","
        		+ "\"" + "fam003" + "\")";
		
		String assoc3b = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc008" 	+ "\","
				+ "\"" + "res003" 	+ "\","
        		+ "\"" + "care001" + "\")";
		
		String assoc3c = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc009" 	+ "\","
				+ "\"" + "res003" 	+ "\","
        		+ "\"" + "doc001" + "\")";
		
		String assoc4a = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc010" 	+ "\","
				+ "\"" + "res004" 	+ "\","
        		+ "\"" + "fam004" + "\")";
		
		String assoc4b = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc011" 	+ "\","
				+ "\"" + "res004" 	+ "\","
        		+ "\"" + "care002" + "\")";
		
		String assoc4c = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc012" 	+ "\","
				+ "\"" + "res004" 	+ "\","
        		+ "\"" + "doc002" + "\")";
		
		String assoc5a = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc013" 	+ "\","
				+ "\"" + "res005" 	+ "\","
        		+ "\"" + "fam005" + "\")";
		
		String assoc5b = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc014" 	+ "\","
				+ "\"" + "res005" 	+ "\","
        		+ "\"" + "care002" + "\")";
		
		String assoc5c = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc015" 	+ "\","
				+ "\"" + "res005" 	+ "\","
        		+ "\"" + "doc002" + "\")";
		
		String assoc6a = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc016" 	+ "\","
				+ "\"" + "res006" 	+ "\","
        		+ "\"" + "fam006" + "\")";
		
		String assoc6b = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc017" 	+ "\","
				+ "\"" + "res006" 	+ "\","
        		+ "\"" + "care002" + "\")";
		
		String assoc6c = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc018" 	+ "\","
				+ "\"" + "res006" 	+ "\","
        		+ "\"" + "doc002" + "\")";
		
		String assoc7a = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc019" 	+ "\","
				+ "\"" + "res007" 	+ "\","
        		+ "\"" + "fam007" + "\")";
		
		String assoc7b = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc020" 	+ "\","
				+ "\"" + "res007" 	+ "\","
        		+ "\"" + "care003" + "\")";
		
		String assoc7c = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc021" 	+ "\","
				+ "\"" + "res007" 	+ "\","
        		+ "\"" + "doc003" + "\")";
		
		String assoc8a = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc022" 	+ "\","
				+ "\"" + "res008" 	+ "\","
        		+ "\"" + "fam008" + "\")";
		
		String assoc8b = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc023" 	+ "\","
				+ "\"" + "res008" 	+ "\","
        		+ "\"" + "care004" + "\")";
		
		String assoc8c = "INSERT INTO associatedResident VALUES ("
				+ "\"" + "assoc024" 	+ "\","
				+ "\"" + "res008" 	+ "\","
        		+ "\"" + "doc004" + "\")";
		
		//sensor
		String sensor1 = "INSERT INTO sensor VALUES ("
        		+ "\"" + "sensor001" 	+ "\","
        		+ "\"" + "120/80" 	+ "\","
        		+ "\"" + "98.6" 	+ "\","
        		+ "\"" + "77" 	+ "\","
        		+ "\"" + "80" 	+ "\","
        		+ "\"" + "99" 	+ "\","
        		+ "\"" + "16:23:45" + "\")";
		
		String sensor2 = "INSERT INTO sensor VALUES ("
        		+ "\"" + "sensor002" 	+ "\","
        		+ "\"" + "120/80" 	+ "\","
        		+ "\"" + "98.6" 	+ "\","
        		+ "\"" + "77" 	+ "\","
        		+ "\"" + "80" 	+ "\","
        		+ "\"" + "99" 	+ "\","
        		+ "\"" + "17:23:45" + "\")";
		
		String sensor3 = "INSERT INTO sensor VALUES ("
        		+ "\"" + "sensor003" 	+ "\","
        		+ "\"" + "120/80" 	+ "\","
        		+ "\"" + "98.6" 	+ "\","
        		+ "\"" + "77" 	+ "\","
        		+ "\"" + "80" 	+ "\","
        		+ "\"" + "99" 	+ "\","
        		+ "\"" + "18:23:45" + "\")";
		
		String sensor4 = "INSERT INTO sensor VALUES ("
        		+ "\"" + "sensor004" 	+ "\","
        		+ "\"" + "120/80" 	+ "\","
        		+ "\"" + "98.6" 	+ "\","
        		+ "\"" + "77" 	+ "\","
        		+ "\"" + "80" 	+ "\","
        		+ "\"" + "99" 	+ "\","
        		+ "\"" + "19:23:45" + "\")";
		
		String sensor5 = "INSERT INTO sensor VALUES ("
        		+ "\"" + "sensor005" 	+ "\","
        		+ "\"" + "120/80" 	+ "\","
        		+ "\"" + "98.6" 	+ "\","
        		+ "\"" + "77" 	+ "\","
        		+ "\"" + "80" 	+ "\","
        		+ "\"" + "99" 	+ "\","
        		+ "\"" + "20:23:45" + "\")";
		
		String sensor6 = "INSERT INTO sensor VALUES ("
        		+ "\"" + "sensor006" 	+ "\","
        		+ "\"" + "120/80" 	+ "\","
        		+ "\"" + "98.6" 	+ "\","
        		+ "\"" + "77" 	+ "\","
        		+ "\"" + "80" 	+ "\","
        		+ "\"" + "99" 	+ "\","
        		+ "\"" + "21:23:45" + "\")";
		
		String sensor7 = "INSERT INTO sensor VALUES ("
        		+ "\"" + "sensor007" 	+ "\","
        		+ "\"" + "120/80" 	+ "\","
        		+ "\"" + "98.6" 	+ "\","
        		+ "\"" + "77" 	+ "\","
        		+ "\"" + "80" 	+ "\","
        		+ "\"" + "99" 	+ "\","
        		+ "\"" + "22:23:45" + "\")";
		
		String sensor8 = "INSERT INTO sensor VALUES ("
        		+ "\"" + "sensor008" 	+ "\","
        		+ "\"" + "120/80" 	+ "\","
        		+ "\"" + "98.6" 	+ "\","
        		+ "\"" + "77" 	+ "\","
        		+ "\"" + "80" 	+ "\","
        		+ "\"" + "99" 	+ "\","
        		+ "\"" + "23:23:45" + "\")";
		//location
		String loc1 = "INSERT INTO location VALUES ("
        		+ "\"" + "loc001" 	+ "\","
        		+ "\"" + "47.6062 N" 	+ "\","
        		+ "\"" + "122.3321 W" 	+ "\","
        		+ "\"" + "16:23:45" + "\")";
		
		String loc2 = "INSERT INTO location VALUES ("
        		+ "\"" + "loc002" 	+ "\","
        		+ "\"" + "46.6062 N" 	+ "\","
        		+ "\"" + "122.3321 W" 	+ "\","
        		+ "\"" + "16:23:45" + "\")";
		
		String loc3 = "INSERT INTO location VALUES ("
        		+ "\"" + "loc003" 	+ "\","
        		+ "\"" + "45.6062 N" 	+ "\","
        		+ "\"" + "122.3321 W" 	+ "\","
        		+ "\"" + "16:23:45" + "\")";
		
		String loc4 = "INSERT INTO location VALUES ("
        		+ "\"" + "loc004" 	+ "\","
        		+ "\"" + "44.6062 N" 	+ "\","
        		+ "\"" + "122.3321 W" 	+ "\","
        		+ "\"" + "16:23:45" + "\")";
		
		String loc5 = "INSERT INTO location VALUES ("
        		+ "\"" + "loc005" 	+ "\","
        		+ "\"" + "43.6062 N" 	+ "\","
        		+ "\"" + "122.3321 W" 	+ "\","
        		+ "\"" + "16:23:45" + "\")";
		
		String loc6 = "INSERT INTO location VALUES ("
        		+ "\"" + "loc006" 	+ "\","
        		+ "\"" + "42.6062 N" 	+ "\","
        		+ "\"" + "122.3321 W" 	+ "\","
        		+ "\"" + "16:23:45" + "\")";
		
		String loc7 = "INSERT INTO location VALUES ("
        		+ "\"" + "loc007" 	+ "\","
        		+ "\"" + "41.6062 N" 	+ "\","
        		+ "\"" + "122.3321 W" 	+ "\","
        		+ "\"" + "16:23:45" + "\")";
		
		String loc8 = "INSERT INTO location VALUES ("
        		+ "\"" + "loc008" 	+ "\","
        		+ "\"" + "40.6062 N" 	+ "\","
        		+ "\"" + "122.3321 W" 	+ "\","
        		+ "\"" + "16:23:45" + "\")";
		
		// prescription
		String pre01 = "INSERT INTO prescription VALUES ("
        		+ "\"" + "prescription001" 	+ "\","
        		+ "\"" + "res001" 	+ "\","
        		+ "\"" + "omeprazole" 	+ "\","
        		+ "\"" + "100mg" 	+ "\","
        		+ "\"" + "1x a day" 	+ "\","
        		+ "\"" + "treatment of heartburn" 	+ "\","
        		+ "\"" + "do not eat on empty stomach" + "\")";
		
		String pre02 = "INSERT INTO prescription VALUES ("
        		+ "\"" + "prescription002" 	+ "\","
        		+ "\"" + "res001" 	+ "\","
        		+ "\"" + "hydrochlorothiazide" 	+ "\","
        		+ "\"" + "250mg" 	+ "\","
        		+ "\"" + "2x a day" 	+ "\","
        		+ "\"" + "high blood pressure" 	+ "\","
        		+ "\"" + "drink with plenty of water" + "\")";
		
		String pre03 = "INSERT INTO prescription VALUES ("
        		+ "\"" + "prescription003" 	+ "\","
        		+ "\"" + "res002" 	+ "\","
        		+ "\"" + "lisinopril" 	+ "\","
        		+ "\"" + "500mg" 	+ "\","
        		+ "\"" + "1x a day" 	+ "\","
        		+ "\"" + "high blood pressure" 	+ "\","
        		+ "\"" + "dont mix with other medication" + "\")";
		
		String pre04 = "INSERT INTO prescription VALUES ("
        		+ "\"" + "prescription004" 	+ "\","
        		+ "\"" + "res003" 	+ "\","
        		+ "\"" + "proair" 	+ "\","
        		+ "\"" + "1 pump" 	+ "\","
        		+ "\"" + "as needed" 	+ "\","
        		+ "\"" + "asthma" 	+ "\","
        		+ "\"" + "use as needed to improve breathing" + "\")";
		
		String pre05 = "INSERT INTO prescription VALUES ("
        		+ "\"" + "prescription005" 	+ "\","
        		+ "\"" + "res004" 	+ "\","
        		+ "\"" + "metformin hydrochloride" 	+ "\","
        		+ "\"" + "50mg" 	+ "\","
        		+ "\"" + "3x a day" 	+ "\","
        		+ "\"" + "diabetes" 	+ "\","
        		+ "\"" + "do not eat sugar" + "\")";
		
		String pre06 = "INSERT INTO prescription VALUES ("
        		+ "\"" + "prescription006" 	+ "\","
        		+ "\"" + "res005" 	+ "\","
        		+ "\"" + "amoxicillin" 	+ "\","
        		+ "\"" + "1 tablet" 	+ "\","
        		+ "\"" + "3x a day" 	+ "\","
        		+ "\"" + "bacterial infection" 	+ "\","
        		+ "\"" + "drink with plenty of water" + "\")";
		
		String pre07 = "INSERT INTO prescription VALUES ("
        		+ "\"" + "prescription007" 	+ "\","
        		+ "\"" + "res006" 	+ "\","
        		+ "\"" + "levothyroxine sodium" 	+ "\","
        		+ "\"" + "100mg" 	+ "\","
        		+ "\"" + "3x a day" 	+ "\","
        		+ "\"" + "thyroid" 	+ "\","
        		+ "\"" + "take on empty stomach" + "\")";
		
		String pre08 = "INSERT INTO prescription VALUES ("
        		+ "\"" + "prescription008" 	+ "\","
        		+ "\"" + "res007" 	+ "\","
        		+ "\"" + "escitalopram oxalate" 	+ "\","
        		+ "\"" + "100mg" 	+ "\","
        		+ "\"" + "3x a day" 	+ "\","
        		+ "\"" + "depression" 	+ "\","
        		+ "\"" + "go outside and enjoy nature" + "\")";
		
		
		
        Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();	
		
		sqlStatement.executeUpdate(admin);
		sqlStatement.executeUpdate(res1);
		sqlStatement.executeUpdate(res2);
		sqlStatement.executeUpdate(res3);
		sqlStatement.executeUpdate(res4);
		sqlStatement.executeUpdate(res5);
		sqlStatement.executeUpdate(res6);
		sqlStatement.executeUpdate(res7);
		sqlStatement.executeUpdate(res8);
		sqlStatement.executeUpdate(doc1);
		sqlStatement.executeUpdate(doc2);
		sqlStatement.executeUpdate(doc3);
		sqlStatement.executeUpdate(doc4);
		sqlStatement.executeUpdate(doc5);
		sqlStatement.executeUpdate(care1);
		sqlStatement.executeUpdate(care2);
		sqlStatement.executeUpdate(care3);
		sqlStatement.executeUpdate(care4);
		sqlStatement.executeUpdate(care5);
		sqlStatement.executeUpdate(fam1);
		sqlStatement.executeUpdate(fam2);
		sqlStatement.executeUpdate(fam3);
		sqlStatement.executeUpdate(fam4);
		sqlStatement.executeUpdate(fam5);
		sqlStatement.executeUpdate(fam6);
		sqlStatement.executeUpdate(fam7);
		sqlStatement.executeUpdate(fam8);
		sqlStatement.executeUpdate(resident1);
		sqlStatement.executeUpdate(resident2);
		sqlStatement.executeUpdate(resident3);
		sqlStatement.executeUpdate(resident4);
		sqlStatement.executeUpdate(resident5);
		sqlStatement.executeUpdate(resident6);
		sqlStatement.executeUpdate(resident7);
		sqlStatement.executeUpdate(resident8);
		sqlStatement.executeUpdate(assoc1a);
		sqlStatement.executeUpdate(assoc1b);
		sqlStatement.executeUpdate(assoc1c);
		sqlStatement.executeUpdate(assoc2a);
		sqlStatement.executeUpdate(assoc2b);
		sqlStatement.executeUpdate(assoc2c);
		sqlStatement.executeUpdate(assoc3a);
		sqlStatement.executeUpdate(assoc3b);
		sqlStatement.executeUpdate(assoc3c);
		sqlStatement.executeUpdate(assoc4a);
		sqlStatement.executeUpdate(assoc4b);
		sqlStatement.executeUpdate(assoc4c);
		sqlStatement.executeUpdate(assoc5a);
		sqlStatement.executeUpdate(assoc5b);
		sqlStatement.executeUpdate(assoc5c);
		sqlStatement.executeUpdate(assoc6a);
		sqlStatement.executeUpdate(assoc6b);
		sqlStatement.executeUpdate(assoc6c);
		sqlStatement.executeUpdate(assoc7a);
		sqlStatement.executeUpdate(assoc7b);
		sqlStatement.executeUpdate(assoc7c);
		sqlStatement.executeUpdate(assoc8a);
		sqlStatement.executeUpdate(assoc8b);
		sqlStatement.executeUpdate(assoc8c);
		sqlStatement.executeUpdate(sensor1);
		sqlStatement.executeUpdate(sensor2);
		sqlStatement.executeUpdate(sensor3);
		sqlStatement.executeUpdate(sensor4);
		sqlStatement.executeUpdate(sensor5);
		sqlStatement.executeUpdate(sensor6);
		sqlStatement.executeUpdate(sensor7);
		sqlStatement.executeUpdate(sensor8);
		sqlStatement.executeUpdate(loc1);
		sqlStatement.executeUpdate(loc2);
		sqlStatement.executeUpdate(loc3);
		sqlStatement.executeUpdate(loc4);
		sqlStatement.executeUpdate(loc5);
		sqlStatement.executeUpdate(loc6);
		sqlStatement.executeUpdate(loc7);
		sqlStatement.executeUpdate(loc8);
		sqlStatement.executeUpdate(pre01);
		sqlStatement.executeUpdate(pre02);
		sqlStatement.executeUpdate(pre03);
		sqlStatement.executeUpdate(pre04);
		sqlStatement.executeUpdate(pre05);
		sqlStatement.executeUpdate(pre06);
		sqlStatement.executeUpdate(pre07);
		sqlStatement.executeUpdate(pre08);
		
		connection.close();
		
		return Response
      	      .status(Response.Status.OK)
      	      .entity("Filled Tables with initial dataset.")
      	      .build();
  }
}
