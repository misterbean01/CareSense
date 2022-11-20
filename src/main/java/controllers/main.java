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
		return h;
	}
}
