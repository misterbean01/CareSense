package controllers;


import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileUtils;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Servlet implementation class assign4upload
 */
@WebServlet("/upload")
public class uploadFile extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String fileName = "";
	private Integer options = 0;
    private ServletFileUpload uploader = null;
    
	// connect to database
	main careSense = new main();
	String connectStr = careSense.serverConnect();
    
	@Override
	public void init() throws ServletException{
		DiskFileItemFactory fileFactory = new DiskFileItemFactory();
		File filesDir = (File) getServletContext().getAttribute("FILES_DIR_FILE");
		fileFactory.setRepository(filesDir);
		this.uploader = new ServletFileUpload(fileFactory);
	}
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public uploadFile() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if(!ServletFileUpload.isMultipartContent(request)){
			throw new ServletException("Content type is not multipart/form-data");
		}
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.write("<html><head></head><body>");
		
		try {
			List<FileItem> fileItemsList = uploader.parseRequest(request);
			Iterator<FileItem> fileItemsIterator = fileItemsList.iterator();
			while(fileItemsIterator.hasNext()){
				FileItem fileItem = fileItemsIterator.next();
				fileName = fileItem.getName();
				System.out.println("FieldName="+fileItem.getFieldName());
				System.out.println("FileName="+fileItem.getName());
				System.out.println("ContentType="+fileItem.getContentType());
				System.out.println("Size in bytes="+fileItem.getSize());
								
				File file = new File(request.getServletContext().getAttribute("FILES_DIR")+File.separator+fileItem.getName());
								
				System.out.println("Absolute Path at server="+file.getAbsolutePath());
				//getJsonToDb(file);
				
				fileItem.write(file);
				if(!file.exists()){
					throw new ServletException("File doesn't exists on server.");
				}
				
				// Convert string from JSON file to JSONObject
				String content = FileUtils.readFileToString(file, "utf-8");

				JSONObject fileJSON = new JSONObject(content);

				// Parse Rice JSON Object
				JSONArray jsonArray = fileJSON.getJSONArray("users");  
				//System.out.println(jsonArray);
			
				try {
					// Parse JSON Array and add them to the DB
					String SQL = "INSERT INTO user VALUES  ";
					int countInit = 0;
					for (Object item : jsonArray) {
						//System.out.println(item);
						if (countInit > 0) 
							SQL += ", ";
						JSONObject user = (JSONObject) item;
						//System.out.println(user);
						String firstName = user.getString("firstName");
						String lastName = user.getString("lastName");
						String gender = user.getString("gender");
						String birthday = user.getString("birthday");
						String username = user.getString("username");
						String password = user.getString("password");
						String userType = user.getString("userType");
						String userID = user.getString("userID");
						String phoneNumber = user.getString("phoneNumber");
						
						String insertSQL =  "(\"" + userID 	+ "\","
				        		+ "\"" + userType 	+ "\","
				        		+ "\"" + username 	+ "\"," 
				        		+ "\"" + password	+ "\","
				        		+ "\"" + firstName	+ "\","
				        		+ "\"" + lastName	+ "\","
				        		+ "\"" + birthday	+ "\","
				        		+ "\"" + gender		+ "\","
				        		+ "\"" + phoneNumber + "\")";
						
						SQL += insertSQL;
						countInit++;
					}
					SQL += ";";
					System.out.println(SQL);

			        Class.forName("com.mysql.cj.jdbc.Driver");
			    	Connection connection = DriverManager.getConnection(connectStr); 
					Statement sqlStatement = connection.createStatement();	 
					sqlStatement.executeUpdate(SQL);
					connection.close();

				} catch(Exception e) {
					System.out.println(e);
				}	
				
				// fileItem.write(file);
				out.write("File "+fileItem.getName()+ " uploaded successfully.");
				out.write("<br /><br />");
			}
		} catch (FileUploadException e) {
			out.write(e + "");
		} catch (Exception e) {
			out.write(e + "");
		}
		out.write("</body></html>");
		out.close();
	}
}
