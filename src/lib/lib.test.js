const { defaultSettings } = require("./constants");
const { strip, Conf } = require("./lib");

describe("Conf Object", () => {
  let conf;
  beforeEach(() => {
    conf = new Conf();
  });
  // TODO: Check for existence, not equality
  it("Should have the static property stripRegEx", () => {
    expect(Conf.regexStrip).toStrictEqual(/^[\r\t\f\v ]+|[\r\t\f\v ]+$/gm);
  });
});

describe("Regex utilities", () => {
  it("Strip should return a string with no whitespace, only newlines", () => {
    input = "    test\n \t       ";
    expected_result = "test\n";
    expect(strip(input)).toStrictEqual(expected_result);
  });
});
