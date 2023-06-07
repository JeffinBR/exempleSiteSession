const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const passwordSession =  Math.random().toString(16).slice(2)
const port = "3000"
const publicPath = path.join(__dirname, 'public');
const pathPages = path.join(publicPath, 'pages');

app.use(session({ secret: passwordSession, resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));
app.set('view engine', 'ejs')

const renderPages = {
    login: (res, values={}) => res.render(path.join(pathPages, "login"), values),
    home: (res, values={}) => res.render(path.join(pathPages, "home"), values),
};

app.post('/login', (req, res) => {
  if (!req.session.login) req.session.login = req.body.login;
  res.redirect("/")
});

app.get('/login', (req, res) => {
  if(req.session.login) { res.redirect("/") } else renderPages.login(res);
});

app.get("/", (req, res) => {
if(req.session.login)  {renderPages.home(res, {login: req.session.login})} else res.redirect("/login")
});

app.listen(port, () => console.log("Online!"));
