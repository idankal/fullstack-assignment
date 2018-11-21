var express = require('express'),
    fs = require('fs'),
    cors = require('cors'),
    morgan = require('morgan'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    path = require('path'),
    io = require('./utils/socket.js'),
    app = express(),
    router = express.Router(),
    db = require('./utils/db.js').init(),
    port = process.env.PORT || 4000,
    appRouter = require('./utils/api.js')(router);

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
app.disable('x-powered-by');

app.use('/api', appRouter);

app.get('/', (req,res) => {
  const HTML_FILE = fs.createReadStream(path.join(__dirname, 'index.html'));
  res.writeHead(200, {'Content-Type': 'text/html'});
  HTML_FILE.pipe(res);
})

io(app.listen(port, () => {
  console.log(`Connected to port: ${port}`);
}));
