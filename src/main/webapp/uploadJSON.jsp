<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Care Sense Upload JSON</title>
<jsp:include page="include.jsp" /> <!-- Contains the Bootstrap JSP -->
</head>

<body>
	<div class="container">
		<h2>Care Sense Upload JSON</h2>
		<p>
		This JSP page allows the admin to upload a list of Residents using a non-restful web service.
		</p>
		
		<form action="./upload" method="post" enctype="multipart/form-data">
 		
 		<div class="text-primary"> 
	       	<p>
	        Select a file : <input type="file" name="file" size="50" />
	       	</p>
	 
	       	<input type="submit" value="Upload It" />
	    	</form>
    	</div>
	</div>
</body>
</html>