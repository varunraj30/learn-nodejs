const fs = require("fs");

// Create file Sync
fs.writeFileSync("./test.txt", "Hi from Sync");

// Create file Async
fs.writeFile("./test.txt", "Hi from Async", (err) => {});

// Read file Sync
const result = fs.readFileSync("contacts.txt", "utf-8");

console.log(result);

// Read file Async
fs.readFile("contacts.txt", "utf-8", (err, result) => {
  if (err) console.log(err);
  else {
    console.log(result);
  }
});

// Sync returns something , Async does not return something but expects callback

// Append content in a file
fs.appendFileSync("./contacts.txt", `\n${new Date().getDate().toString()}`);

// Copy and paste
fs.cpSync("source", "dest");

// Delete file
fs.unlinkSync("filename");

// Stats of a file
fs.statSync("./contacts.txt");

// Is it a file?
fs.statSync("./contacts.txt").isFile();

// Create a directory
fs.mkdirSync("proj");

// Create a directory inside another directory
fs.mkdirSync("proj/a", { recursive: true });
