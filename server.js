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

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
