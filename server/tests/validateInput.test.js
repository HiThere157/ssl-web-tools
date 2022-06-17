const {
  validateHostname,
  validateIp,
  validateInt,
  validateBool,
} = require("../utils/validateInput");

test("validate Hostname Input", () => {
  expect(validateHostname("")).toBe(false);
  expect(validateHostname("", true)).toBe(true);

  expect(validateHostname("google")).toBe(true);
  expect(validateHostname("google.com")).toBe(true);
  expect(validateHostname("www.google.com")).toBe(true);

  expect(validateHostname("&& google.com")).toBe(false);
  expect(validateHostname("www.google.com &&")).toBe(false);
  expect(validateHostname("www.google.com //")).toBe(false);
});

test("validate IP Input", () => {
  expect(validateIp("")).toBe(false);
  expect(validateIp("", true)).toBe(true);

  expect(validateIp("192")).toBe(false);
  expect(validateIp("192.168")).toBe(false);
  expect(validateIp("192.168.178")).toBe(false);
  expect(validateIp("192.168.178.157")).toBe(true);

  expect(validateIp("abc.168.d.157")).toBe(false);
  expect(validateIp("500.168.329.157")).toBe(false);
  expect(validateIp("192.168.178.157.111")).toBe(false);

  expect(validateIp("2001:db8::")).toBe(true);
  expect(validateIp("::1234:5678")).toBe(true);
  expect(validateIp("2001:db8:::")).toBe(false);
  expect(validateIp("2001:db8::1234:5678")).toBe(true);
  expect(validateIp("2001:db8:3333:4444:5555:6666:7777")).toBe(false);
  expect(validateIp("2001:db8:3333:4444:5555:6666:7777:8888")).toBe(true);

  expect(validateIp("www.google.com")).toBe(false);
  expect(validateIp("192.168.178.157 &&")).toBe(false);
  expect(validateIp("192.168.178.157 //")).toBe(false);
});

test("validate Int Input", () => {
  expect(validateInt("", 0, 1)).toBe(false);
  expect(validateInt("0", 0, 1)).toBe(true);
  expect(validateInt("1", 0, 1)).toBe(true);

  expect(validateInt("2", 0, 1)).toBe(false);
  expect(validateInt("-1", 0, 1)).toBe(false);

  expect(validateInt("abc", 0, 1)).toBe(false);
});

test("validate Bool Input", () => {
  expect(validateBool("")).toBe(false);

  expect(validateBool(true)).toBe(true);
  expect(validateBool(false)).toBe(true);

  expect(validateBool("1")).toBe(false);
  expect(validateBool("true")).toBe(false);
});
