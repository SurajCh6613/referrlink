const winston = require("winston");

const transports = [
  new winston.transports.Console(), // always log to console
];

// Only add file transport if not in production (i.e., local dev)
if (process.env.NODE_ENV !== "production") {
  transports.push(
    new winston.transports.File({ filename: "./Logger/ReferrLink.logs" })
  );
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // fixed mm vs MM
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] : ${message}`;
    })
  ),
  transports,
});

module.exports = logger;
