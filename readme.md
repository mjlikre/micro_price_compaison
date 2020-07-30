Scrapping api for Glass Commerce. 


To run the api, you must have node and npm installed. 

Once you have those two installed, run 'npm install' in the main directory
once all the dependencies have been installed, run 'node server.js', and the server will be initiated. If you want to make changes, i suggest installing nodemon as well on your computer, and use 
'nodemon server.js' instead of 'node server.js' 

Data base connection is established in the data.js file in Models, the routes are declared in routes folder. All the functions that each route performs are declared in controller file, mainly in mainScrapeController.js file. 

Check our dev server database for data structure required for this api
This api scrapes from Amazon, Ebay, and Walmart, if another online store needs to be added, just follow the set up for the other three and set up the queries correctly. 
Since most of these online marketplaces have anti scraping in place, I've implemented a recursive function where if the scrape fails, it automatically runs the scrape again. 
Amazon fails the most

If you have any questions or need help, feel free to ask me! 



