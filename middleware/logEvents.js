console.log("testing!");

//npm node modules are thrid party modules

// npm i nodemon -g
// now just can write nodemon
// npm init
// for specific verion
// npm i uuid@5.6.2
// for updtae packages
// npm update
// remove package
// npm rm uuid
// npm rm nodemon -D
// npm rm nodemon -g

const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dataTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dataTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqlog.txt");
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logger, logEvents };
