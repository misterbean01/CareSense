package controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.json.JSONArray;
import org.json.JSONObject;

@Path("/display")
public class display {
	
	@Path("")
	@GET
	@Produces("application/json")
	public Response getDisplayAll () throws IOException {
		
		String url1 = "http://localhost:8080/CareSense/api/weather";
		JSONObject weatherResponse = new JSONObject(getResponse(url1));
		
		String url2 = "http://localhost:8080/CareSense/api/holiday/";
		JSONArray holidayResponse = new JSONArray(getResponse(url2));
		
		String url3 = "http://localhost:8080/CareSense/api/clock/";
		JSONObject clockResponse = new JSONObject(getResponse(url3));
		
		JSONObject finalRespose = new JSONObject();
		finalRespose.put("weather", weatherResponse);
		finalRespose.put("holiday", holidayResponse);
		finalRespose.put("clock", clockResponse);
		
		return Response
				.status(Response.Status.OK)
				.header("weather", weatherResponse.getString("todayWeather")) // Custom Header
				.header("datetime", clockResponse.getString("datetime"))
				.header("holidayCount", holidayResponse.length())
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Headers",
						"Origin, X-Requested-With, Content-Type, Accept")
				.header("Access-Control-Allow-Methods",
						"Origin, X-Requested-With, GET,POST,OPTIONS,DELETE,PUT")
				.entity(finalRespose.toString())
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
