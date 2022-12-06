package controllers;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

// ***********************************************************************
// define a base URI for which all of the resource
// URI will point to this application default path
// we will use "/api".
// you can have a structure for API versioning
// using this technique. For example:
// "/v1" for supporting version 1 release
// "/v2" for supporting version 2 release
// "/v2.1" for supporting version 2.1 release
// ***********************************************************************
//more details can be found on this link:
//https://docs.oracle.com/javaee/7/api/javax/ws/rs/ApplicationPath.html

@ApplicationPath("/caresense")
// This main java class will be used to declare a root
// resource for our application as well as other
// provider classes
public class caresense_app extends Application{
	
	// This method returns a collection (non-empty) with
	// specific classes to provide support for which are
	// going to be handled when published our JAX-RS application
	@Override
	public Set<Class<?>> getClasses() 
	{
		Set<Class<?>> resources = new HashSet<Class<?>>();
		//add classes that you wish to be supported by application
		resources.add( build.class ); 
		resources.add( crud.class) ; 
		resources.add( resident.class );
		resources.add( sensor.class );
		resources.add( location.class );
		resources.add( prescription.class );
		return resources;
	}
	public String serverConnect() {
		String mysql_ip = "XX.173.51.210";
		String username = "admin";
		String password = "admin1";
	    String connectStr ="jdbc:mysql://" + mysql_ip + ":3306/database?user=" + username + "&password=" + password ;

	    return connectStr;
	}
}