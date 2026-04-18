const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  if (req.url == "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;
  const myurl = url.parse(req.url, true);
  console.log(myurl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myurl.pathname) {
      case "/":
        if (req.method === "GET") return res.end("Home page");
        break;
      case "/about":
        const username = myurl.query.myname;
        res.end(`Hi ${username}`);
        break;

      default:
        res.end("404 Not found");
    }
  });
});

server.listen(8000, () => {
  console.log(`Server started!!`);
});
