package controllers;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;


@ApplicationPath("/api")
public class main extends Application{
	
	@Override
	public Set<Class<?>> getClasses() {
		HashSet h = new HashSet<Class<?>>();
		
		// at least 4 WS custom header attribute (mostly JSON)
		h.add(associated.class);
		h.add( user.class); 
		h.add( residentTracker.class);
		
		// 1 WS using XML
		h.add( login.class );
		
		// 2 WS with method other than GET and POST and 2 WS with method other than PUT and DELETE
		h.add( sensor.class);
		h.add( location.class);
		h.add( prescription.class );
		
		// 2 Composite WS
		h.add( resident.class); // gets information from associated, sensor, location, and prescription
		h.add(display.class); // gets information from clock, holiday, and weather
		
		// Non-Restful WS
		h.add( uploadFile.class);
		
		// 4 External API
		h.add( externalWeather.class );
		h.add( externalClock.class );
		h.add( externalHoliday.class );
		h.add( externalFruit.class );
		
		// Database WS
		h.add( build.class );
		h.add( crud.class );
		
		return h;
	}
	
	public String serverConnect() {

	    String connectStr ="jdbc:mysql://" + mysql_ip + ":3306/database?user=" + username + "&password=" + password ;
	
	    return connectStr;
	}
}
