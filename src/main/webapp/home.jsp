<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Care Sense Home</title>
<jsp:include page="include.jsp" /> <!-- Contains the Bootstrap JSP -->
</head>

<body>
	<div class="container">
		<h2>Home Page</h2>
		<% 
			String hello = request.getParameter("messageHello");
			String world = request.getParameter("messageWorld");
		%>

		<% if (hello != null && world != null) { %>
			<div class="text-primary">Welcome to <%=hello %> <%=world %></div>
		<% } else { %>
			<div class="text-warning">EMPTY</div>
		<% } %>
	</div>
</body>
</html>