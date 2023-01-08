# directLendingAssessment
This is an assessment for internship application from Direct Lending

To use the project, 
1. Make sure to install the all dependencies: 'npm install'
2. Start the development server: 'node app.js'
3. Open a web browser and navigate to localhost:3000
4. Make sure to connect to mongodb by open terminal and run 'mongod' then open new tab and run 'mongo'.

Note that in app.js, in order to make the form submit the data to the database, ou have to uncomment the 'postcode.save()' and 'customer.save()' on line 83 and 91 respectively inside the 'app.post("/", function(req, res) { ...'.

Also in index.html on line 59, use your own API Key in order to call the API.


