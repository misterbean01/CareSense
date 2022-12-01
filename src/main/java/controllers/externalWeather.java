package controllers;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
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

import org.json.JSONArray;
import org.json.JSONObject;

@Path("/weather")
public class externalWeather {
	public double latitude = 47.751076; // WA latitude
	public double longitude = -120.740135; // WA longitude
	
		@Path("")
		@GET
		@Produces("application/json")
		public Response getExternalWeatherAPI () throws IOException {
			
			String url1 = "https://api.open-meteo.com/v1/forecast"
					+ "?latitude=" + latitude + "&"  + "longitude=" + longitude
					+ "&daily=weathercode,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit"
					+ "&timezone=America%2FLos_Angeles";
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
			
			JSONObject externalWeatherAPIResponse = new JSONObject(responseURL1.toString());
			JSONObject dailyWeather = externalWeatherAPIResponse.getJSONObject("daily");
			JSONArray dailyWeatherCode = dailyWeather.getJSONArray("weathercode");
			JSONArray dailyTempMax= dailyWeather.getJSONArray("temperature_2m_max");
			JSONArray dailyTempMin = dailyWeather.getJSONArray("temperature_2m_min");
			
			int todayWeatherCode = dailyWeatherCode.getInt(1);
			
			JSONObject weatherResponse = new JSONObject();
			weatherResponse.put("todayWeather", convertWeatherCode(todayWeatherCode));
			weatherResponse.put("todayTempMax", dailyTempMax.getDouble(1));
			weatherResponse.put("todayTempMin", dailyTempMin.getDouble(1));
						
			return Response
					.status(Response.Status.OK)
					.header("todayWeather", convertWeatherCode(todayWeatherCode))
					.header("todayTempMax", dailyTempMax.getDouble(1))
					.header("todayTempMin", dailyTempMin.getDouble(1))
					.entity(weatherResponse.toString())
					.build();
		}
		
		public String convertWeatherCode(int code) {
			
			switch (code) {
			  case 0:
				  return "Clear sky";
			  case 1:
				  return "Mainly clear";
			  case 2:
				  return "Partly cloudy";
			  case 3:
				  return "Overcast";
			  case 45:
				  return "Fog";
			  case 48:
				  return "Depositing rime fog";
			  case 51:
				  return "Light drizzle";
			  case 53:
				  return "Moderate drizzle";
			  case 55:
				  return "Dense intensity drizzle";
			  case 56:
				  return "Light freezing drizzle";
			  case 57:
				  return "Dense intensity freezing drizzle";
			  case 61:
				  return "Slight rain";
			  case 63:
				  return "Moderate rain";
			  case 65:
				  return "Heavy rain";
			  case 66:
				  return "Slight freezing rain";
			  case 67:
				  return "Heavy freezing rain";
			  case 71:
				  return "Slight snow fall";
			  case 73:
				  return "Moderate snow fall";
			  case 75:
				  return "Heavy snow fall";
			  case 77:
				  return "Snow grains";
			  case 80:
				  return "Slight rain showers";
			  case 81:
				  return "Moderate rain showers";
			  case 82:
				  return "Violent rain showers";
			  case 85:
				  return "Slight snow showers";
			  case 86:
				  return "Heavy snow showers";
			  case 95:
				  return "Thunderstorm";
			  case 96:
				  return "Thunderstorm with slight hail";
			  case 99:
				  return "Thunderstorm with heavy hail";
			}
			
			return "Undefined Weather Code";
		}
	
}
