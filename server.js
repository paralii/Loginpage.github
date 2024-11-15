const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const session = require('express-session');
const {v4:uuid4} = require('uuid');
const nocache = require('nocache');
const router = require('./router');

//port
const port = process.env.PORT || 4000;

//body parser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

// Set the view engine 
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

//load statics
app.use('/static',express.static(path.join(__dirname, 'public')));
app.use('/assets',express.static(path.join(__dirname, 'public/assets')));


//
app.use(session({
    secret:uuid4(),
    resave:false,
    saveUninitialized:true,
    cookie: { secure: false }
}));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});
app.use(nocache());
app.use('/route',router);

// Home route
app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/route/homepage');
    } else {
        const error = req.query.error || null;
        const logout = req.query.logout || null;
        res.render('base', { title: "Sign Up", error, logout });
    }
});


app.use('*', (req, res) => {
    res.status(404).render('error', {
        title: "Page Not Found",
        message: "Sorry, the page you're looking for doesn't exist.",
        errorCode: 404
    });
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
