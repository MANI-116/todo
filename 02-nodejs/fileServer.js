/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const filesPath = path.join(__dirname, './files/')
const app = express();

app.get('/files', getfiles);

app.get('/file/:filename', getContentOfFile);



app.use(middleWare)

function middleWare(req, res, next) {
  res.status(404).send("Route not found");
  next();
}



async function getContentOfFile(req, res) {
  console.log("hi ra ")

  const filePath = path.join(filesPath, req.params.filename)
  console.log(filePath)

  try {

    const data = await new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err)
          reject(err);

        resolve(data);
      })
    })
    res.send(data);

  } catch (error) {

    res.status(404).send("File not found");

  }




}







function getfiles(req, res) {


  let files;

  fs.readdir(filesPath, (err, data) => {

    files = data

    if (err) {
      res.status(500).send(err)
    }

    res.send(files);

  });

}


module.exports = app;





