require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./connection");
const cookiesession = require("cookie-session");
const datum = require("dataformat");
const cron = require("cron").CronJob;
app.use(express.urlencoded({ extended: false }));
app.use(cookiesession({
    name: 'session',
    keys: [process.env.SN1, process.env.SN2],
    maxAge: 60 * 60 * 1000 // 1 hodina
}))

var count = 0;
var ips = [];
connection.connect(function (e) {
    if (e) throw e;
    console.log('Aplikace napojena na databázu!');
    setInterval(() => {
        connection.ping();
    }, 29 * 60 * 1000);
})

var job = new cron('0 0 * * *', function () {
    Update();
}, null, true, 'Europe/Prague');


Update();

function Update() {
    const date = datum(new Date(), "yyyy-mm-dd");
    connection.query(`INSERT INTO analytics (counter, date) VALUES ('${count}', '${date}')`);
    console.log("update");
    count = 0;
    ips = [];
}

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/panel", (req, res) => {
    if (req.session.login) {
        res.render("panel");
    } else {
        res.redirect("/");
    }
});
function Test(ind) {
    var log = true;
    ips.forEach((i) => {
        if (i === ind) {
            log = false
        }
    });
    return log;
}

app.post("/api/getdata", (req, res) => {
    connection.query(`SELECT * FROM analytics`, (e, data) => {
        res.json(data)
    });
});


app.post("/api/counter", (req, res) => {
    var ip = req.headers['x-forwarded-for']
    if (Test(ip)) {
        ips.push(ip);
        count += 1;
    } else {
        return false;
    }
});
app.post("/api/login", (req, res) => {
    const user = req.body.name;
    const pass = req.body.pass
    if (user === process.env.USERLOGIN && pass === process.env.USERPASS) {
        req.session.login = true;
        res.redirect("/panel");
    } else {
        res.redirect("/");
    }
});

app.get("/logout", (req, res) => {
    req.session = null
    res.redirect("/")
});


job.start();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT, () => {
    console.log("Aplikace běží na portu " + process.env.PORT);
});


