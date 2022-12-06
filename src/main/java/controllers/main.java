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
		h.add( home.class );
		
		// 4 WS custom header attribute (mostly JSON)
		
		// 1 WS using XML
		
		// 2 WS with method other than GET and POST
		
		// 2 WS with method other than PUT and DELETE
		
		// 2 Composite WS
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
		String mysql_ip = "34.173.51.210";
		String username = "jas";
		String password = "admin1";
	    String connectStr ="jdbc:mysql://" + mysql_ip + ":3306/database?user=" + username + "&password=" + password ;
	
	    return connectStr;
	}
}
