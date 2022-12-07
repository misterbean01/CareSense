package controllers;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URI;
import java.sql.*;
import java.util.Map;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.json.JSONArray;
import org.json.JSONObject;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

@Path("/login")
public class login {
	// connect to database
	main careSense = new main();
	String connectStr = careSense.serverConnect();
	
	
	@Path("")
	@POST
	@Produces("application/xml")
	public Response PostRecord(String loginXML) throws ParserConfigurationException, SAXException, IOException, ClassNotFoundException, SQLException  {
		System.out.println(loginXML);
	    
	    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder(); // parse XML file
        StringBuilder xmlStringBuilder = new StringBuilder();
        xmlStringBuilder.append(loginXML);
        ByteArrayInputStream input = new ByteArrayInputStream(
           xmlStringBuilder.toString().getBytes("UTF-8"));
        Document doc = db.parse(input);
        doc.getDocumentElement().normalize();
        //System.out.println("Root Element :" + doc.getDocumentElement().getNodeName());
        Node nodeItem = doc.getDocumentElement();
        Element eNodeItem = (Element) nodeItem;
//        System.out.println(eQuery.getElementsByTagName("username").item(0).getTextContent());
//        System.out.println(eQuery.getElementsByTagName("password").item(0).getTextContent());
//        System.out.println("Root End");
        String username = eNodeItem.getElementsByTagName("username").item(0).getTextContent();
        String password = eNodeItem.getElementsByTagName("password").item(0).getTextContent();
        
        // Check if they are an admin via username
        String adminUserID = checkAdminUser(username, password);
        System.out.println(adminUserID);
        if (adminUserID != null && adminUserID != "") {
        	
        	String XMLoutput = "<?xml version='1.0'?><loggedUser>" + 
					"<userID>" + adminUserID + "</userID>" +
					"<firstName>" + "Admin" + "</firstName>" +
					"<lastName>" + "Admin" + "</lastName>" +
					"<userType>" + "admin" + "</userType>" +
					"<gender>" + "Admin" + "</gender>" +
					"<birthday>" + "Admin" + "</birthday>" +
					"<phoneNumber>" + "Admin" + "</phoneNumber>" +
					"</loggedUser>";
        	
        	 return Response
 					.status(Response.Status.OK)
 					.header("loginStatus", "User found")
 					.header("Access-Control-Allow-Origin", "*") // always include this 2 header to access the JSON
 					.header("Access-Control-Allow-Headers", 
 							"Origin, X-Requested-With, Content-Type, Accept") // always include this 2 header to access the JSON
 					.header("Access-Control-Allow-Methods", 
 							"Origin, X-Requested-With, GET,POST,OPTIONS,DELETE,PUT")
 					.entity(XMLoutput)
 					.build();
        }
        
        
		Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();
		String query = "SELECT * "
				+ "FROM user WHERE username = '" + username + "' AND password = '" + password + "'";
		//System.out.println(query);
		ResultSet rs = sqlStatement.executeQuery(query);
		String userID = "", userType = "", firstName = "", 
				lastName = "", birthday = "", gender = "", phoneNumber = "";
		while (rs.next())
		{
			userID = rs.getString("userID");
			userType = rs.getString("userType");
			firstName = rs.getString("firstName");
			lastName = rs.getString("lastName");
			gender = rs.getString("gender");
			birthday = rs.getString("birthday");
			phoneNumber = rs.getString("phoneNumber");

		}
		System.out.println(userID + " >> login");
		if (userID != "" && userID != null) {
			
			String XMLoutput = "<?xml version='1.0'?><loggedUser>" + 
					"<userID>" + userID + "</userID>" +
					"<firstName>" + firstName + "</firstName>" +
					"<lastName>" + lastName + "</lastName>" +
					"<userType>" + userType + "</userType>" +
					"<gender>" + gender + "</gender>" +
					"<birthday>" + birthday + "</birthday>" +
					"<phoneNumber>" + phoneNumber + "</phoneNumber>" +
					"</loggedUser>";
					
			System.out.println(XMLoutput);
		    return Response
					.status(Response.Status.OK)
					.header("loginStatus", "User found")
					.header("Access-Control-Allow-Origin", "*") // always include this 2 header to access the JSON
					.header("Access-Control-Allow-Headers", 
							"Origin, X-Requested-With, Content-Type, Accept") // always include this 2 header to access the JSON
					.header("Access-Control-Allow-Methods", 
							"Origin, X-Requested-With, GET,POST,OPTIONS,DELETE,PUT")
					.entity(XMLoutput)
					.build();
		} else {
		    return Response
					.status(Response.Status.BAD_REQUEST)
					.header("loginStatus", "No User/Wrong Password")
					.header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Headers", 
							"Origin, X-Requested-With, Content-Type, Accept")
					.header("Access-Control-Allow-Methods", 
							"Origin, X-Requested-With, GET,POST,OPTIONS,DELETE,PUT")
					.build();
		}    
	}
	
	public String checkAdminUser(String username, String password) throws SQLException, ClassNotFoundException {
		Class.forName("com.mysql.cj.jdbc.Driver");
    	Connection connection = DriverManager.getConnection(connectStr); 
		Statement sqlStatement = connection.createStatement();
		String query = "SELECT * "
				+ "FROM admin WHERE username = '" + username + "' AND password = '" + password + "'";
		//System.out.println(query);
		ResultSet rs = sqlStatement.executeQuery(query);
		String userID = "";
		while (rs.next())
		{
			userID = rs.getString("userID");
		}
		
		return userID;
	}

}
