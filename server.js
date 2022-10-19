const express = require('express');
const app = express();
const port = 3500;
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
require('./middleware/passport')(passport);

const routes = require('./settings/routes');
routes(app);

const corsOptions = {
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200,
};

app.get('/', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for only http://localhost:3000/'});
});

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
