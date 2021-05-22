const   express     = require('express'),
        cors        = require('cors'),
        morgan      = require('morgan'),
        sequelize   = require('sequelize'),
        helmet      = require('helmet'),
        compression = require('compression'),
        jwt         = require('jsonwebtoken'),
        ejs         = require('ejs'),
        flash       = require('express-flash-messages'),
        path        = require('path'),
        fileUpload  = require('express-fileupload'),
        session     = require('express-session'),
        routes      = require('./routes');

require('dotenv').config();
require('./models');

app = express();

app.use(cors());
app.use(helmet({ contentSecurityPolicy: false, }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false, }));
app.use(compression());

app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024, }, }));
app.use(flash());
app.use(session({
    secret: process.env.SECRET,
    cookie: { maxAge: 365 * 24 * 60 * 60 * 1000, },
    resave: false,   
    saveUninitialized: false,
}));
app.set('trust proxy', 1);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, '/public')));

app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
