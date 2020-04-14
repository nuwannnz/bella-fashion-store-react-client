import { createLogger, format, transports } from "winston";
const { combine, colorize, prettyPrint } = format;


const logger = createLogger({
    format: combine(
        format.json(),
        colorize(),
        prettyPrint()
    ),

});

if (process.env.NODE_ENV !== 'production') {
    // if we are not in production mode, print to the console
    logger.add(new transports.Console({ format: format.simple() }))
}

export default logger;

