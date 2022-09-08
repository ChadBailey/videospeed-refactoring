// import { jest } from "@jest/globals";

const Logger = require("./logger");

describe("Logging functionality", () => {
  let logger;
  beforeEach(() => {
    logger = new Logger();
    logger.verbosity = 6;
    console.log = jest.fn();
    console.trace = jest.fn();
  });
  it('Should log "ERROR:test" via console.log', () => {
    let level = 2;
    logger.log("test", level);
    expect(console.log.mock.calls[0][0]).toBe("ERROR:test");
  });
  it('Should log "WARNING:test" via console.log', () => {
    let level = 3;
    logger.log("test", level);
    expect(console.log.mock.calls[0][0]).toBe("WARNING:test");
  });
  it('Should log "INFO:test" via console.log', () => {
    let level = 4;
    logger.log("test", level);
    expect(console.log.mock.calls[0][0]).toBe("INFO:test");
  });
  it('Should log "DEBUG:test" via console.log', () => {
    let level = 5;
    logger.log("test", level);
    expect(console.log.mock.calls[0][0]).toBe("DEBUG:test");
  });
  it('Should log "DEBUG (VERBOSE):test" via console.log and console.trace should be called', () => {
    let level = 6;
    logger.log("test", level);
    expect(console.log.mock.calls[0][0]).toBe("DEBUG (VERBOSE):test");
    expect(console.trace).toHaveBeenCalled();
  });
  it('Should log "INFO:test" via console.log when no level is supplied', () => {
    logger.log("test");
    expect(console.log.mock.calls[0][0]).toBe("INFO:test");
  });
  it("Should not log anything when level is 4 and verbosity is 3", () => {
    logger.verbosity = 3;
    logger.log("test", 4);
    expect(console.log.mock).not.toHaveBeenCalled;
  });
  it("Should not log anything when no level is supplied and default log level is 4", () => {
    logger.verbosity = 3;
    logger.log("test");
    expect(console.log.mock).not.toHaveBeenCalled;
  });
  it("Should throw error when supplied level < 2", () => {
    expect(() => logger.log("test", 1)).toThrow("notImplemented");
  });
  it("Should do nothing when supplied level > 6", () => {
    logger.log("test", 7);
    expect(console.log.mock).not.toHaveBeenCalled;
  });
  it("Should give the same object when attempting to re-initialize (singleton)", () => {
    logger1 = logger;
    logger2 = new Logger();
    expect(logger1).toBe(logger2);
    logger1.test = "test";
    expect(logger2.test).toBe("test");
  });
});
