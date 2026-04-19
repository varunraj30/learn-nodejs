const express = require("express");
const users = require("./data.json");
const fs = require("fs");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}: ${req.method} ${req.path}`,
    (err, data) => next(),
  );
});

app.get("/api/users", (req, res) => {
  res.setHeader("X-myName", "Neo");
  return res.json(users);
});

// HTML Rendering
app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  return res.send(html);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id == Number(id));
    return res.send(user);
  })
  .patch((req, res) => {
    const { id } = req.params;
    const body = req.body;
    const user = users.findIndex((user) => user.id == Number(id));
    users[user] = {
      ...users[user],
      ...body,
      id,
    };

    fs.writeFile("./data.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "Updated" });
    });
  })
  .delete((req, res) => {
    const { id } = req.params;
    const user = users.filter((user) => user.id !== Number(id));
    fs.writeFile("./data.json", JSON.stringify(user), (err, data) => {
      return res.json({ status: "Deleted" });
    });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./data.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
});

app.listen(8000, () => {
  console.log(`Server started!!`);
});
1;
