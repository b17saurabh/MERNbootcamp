const express = require("express");

const app = express();
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const port = 8000;

app.get("/signup", (req, res) => {
    return res.send("You're visiting signup route");
}
);
app.get("/", (req, res) => {
    return res.send("Home Page");
}
);

const admin = (req, res) => {
    return res.send("this is admin dashboard");
};

const isAdmin = (req, res, next) => {
    console.log("isAdmin is running");
    next();
};

const isLoggedIn = (req, res, next) => {
    console.log("isLoggedIn is running");
    next();
};




app.get("/admin", isLoggedIn, isAdmin, admin);

app.get("/seth", (req, res) => {
    return res.send("Seth uses Instagram");
}
);
app.get("/signout", (req, res) => {
    return res.send("you're signed out");
}
);

app.listen(port, () => {
    console.log("server is up and runnnig...");
});
