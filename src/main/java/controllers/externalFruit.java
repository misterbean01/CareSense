package controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.json.JSONObject;

@Path("/fruit")
public class externalFruit {
	
	@Path("")
	@POST
	@Produces("application/json")
	public Response postFruitInfo (String fruitJSON) throws IOException {
		
		JSONObject fruit = new JSONObject(fruitJSON); 
		System.out.println(fruit.getString("name"));
		
		String url1 = "https://www.fruityvice.com/api/fruit/" + fruit.getString("name");

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
		
		JSONObject externalFruitAPIResponse = new JSONObject(responseURL1.toString());
		JSONObject nutrition = externalFruitAPIResponse.getJSONObject("nutritions");
		
		JSONObject fruitResponse = new JSONObject();
		fruitResponse.put("name", externalFruitAPIResponse.getString("name"));
		fruitResponse.put("carbohydrates", nutrition.getDouble("carbohydrates"));
		fruitResponse.put("protein", nutrition.getDouble("protein"));
		fruitResponse.put("fat", nutrition.getDouble("fat"));
		fruitResponse.put("calories", nutrition.getDouble("calories"));
		fruitResponse.put("sugar", nutrition.getDouble("sugar"));
		
		
		return Response
				.status(Response.Status.OK)
				.header("fruit", externalFruitAPIResponse.getString("name")) // custom header attribute
				.entity(fruitResponse.toString())
				.build();
	}

}
