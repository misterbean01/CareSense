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
		// 10 Web Service
		h.add( home.class );
		
		// 4 External API
		h.add( externalWeather.class );
		return h;
	}
}
