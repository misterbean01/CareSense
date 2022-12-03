package controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;



@Path("/holiday")
public class externalHoliday {

	@Path("")
	@GET
	@Produces("application/json")
	public Response getPublicHolidays () throws IOException, JSONException, ParseException {
		
		String url1 = "https://date.nager.at/api/v3/PublicHolidays/2022/US";

		URL obj1 = new URL(url1);
		HttpURLConnection con1 = (HttpURLConnection) obj1.openConnection();
		con1.setRequestMethod("GET");
		con1.setRequestProperty("User-Agent", "Mozilla/5.0");
		
		int responseCode = con1.getResponseCode();
		
		System.out.println("\nSending 'GET' request to URL : " + url1);
		System.out.println("Response Code : " + responseCode);
		
		BufferedReader in = new BufferedReader(
				new InputStreamReader(con1.getInputStream()));
		String inputLine;
		StringBuffer responseURL1 = new StringBuffer();
		
		while ((inputLine = in.readLine()) != null) {
			responseURL1.append(inputLine);
		}
		in.close();
		
		JSONArray holidayResponse = new JSONArray();
		
		JSONArray responseArray = new JSONArray(responseURL1.toString());
		for (int i = 0; i < responseArray.length(); i++) {
			JSONObject holiday = responseArray.getJSONObject(i);
			JSONObject item = new JSONObject();
			item.put("date", holiday.getString("date"));
			item.put("name", holiday.getString("name"));
			holidayResponse.put(item);
		}
				
		System.out.println(holidayResponse);
		
		return Response
				.status(Response.Status.OK)
				.header("holidayCount", responseArray.length()) // custom header attribute
				.entity(holidayResponse.toString())
				.build();
	}
}
