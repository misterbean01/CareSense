package controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.json.JSONException;
import org.json.JSONObject;

@Path("/clock")
public class externalClock {
	public String timezone = "America/Los_Angeles"; // WA PST
	
	@Path("")
	@GET
	@Produces("application/json")
	public Response getWorldClockAPI () throws IOException, JSONException, ParseException {
		
		String url1 = "https://worldtimeapi.org/api/timezone/" + timezone;

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
		
		JSONObject externalWorldClockAPIResponse = new JSONObject(responseURL1.toString());
		String dateString = externalWorldClockAPIResponse.getString("datetime").toString();
		
		OffsetDateTime odt = OffsetDateTime.parse(dateString) ; 
		int month = odt.getMonthValue();
		int day = odt.getDayOfMonth();
		int year = odt.getYear();
		int hour = odt.getHour();
		int min = odt.getMinute();
		int sec = odt.getSecond();
		
		JSONObject clockResponse = new JSONObject();
		clockResponse.put("datetime", dateString);
		clockResponse.put("Month", month);
		clockResponse.put("Day", day);
		clockResponse.put("Year", year);
		clockResponse.put("Hours", hour);
		clockResponse.put("Minutes", min);
		clockResponse.put("Seconds", sec);
		
		return Response
				.status(Response.Status.OK)
				.header("Month", month) // custom header attribute
				.header("Day", day)
				.header("Year", year)
				.header("Hours", hour)
				.header("Minutes", min)
				.header("Seconds", sec)
				.entity(clockResponse.toString())
				.build();
	}
}
