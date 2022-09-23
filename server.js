const express = require('express');
const app = express();
const port = process.env.PORT || 3500;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

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
