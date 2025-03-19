const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.static(__dirname)); 
app.use(express.urlencoded({ extended: true })); 

let contacts = []; 


app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Us</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
            }
            form {
                margin-bottom: 20px;
            }
            ul {
                list-style-type: none;
                padding: 0;
            }
            li {
                margin: 5px 0;
            }
            button {
                margin-left: 10px;
            }
        </style>
    </head>
    <body>
        <h1>Contact Us</h1>
        <form action="/add-contact" method="POST">
            <input type="text" name="name" placeholder="Name" required />
            <input type="text" name="phone" placeholder="Phone Number" required />
            <button type="submit">Add Contact</button>
        </form>
        <ul>
            ${contacts
              .map(
                (contact, index) => `
                <li>
                    ${contact.name} - ${contact.phone}
                    <form action="/delete-contact" method="POST" style="display:inline;">
                        <input type="hidden" name="index" value="${index}" />
                        <button type="submit">Delete</button>
                    </form>
                </li>
              `
              )
              .join("")}
        </ul>
    </body>
    </html>
  `);
});

// הוספת איש קשר
app.post("/add-contact", (req, res) => {
  const { name, phone } = req.body;
  contacts.push({ name, phone });
  res.redirect("/");
});

// מחיקת איש קשר
app.post("/delete-contact", (req, res) => {
  const { index } = req.body;
  contacts.splice(index, 1);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

