const Validator = require("../utils/validateInput");

function callFc(fcName, target, options = {}) {
  const validator = new Validator();
  options.message = "";

  validator[fcName](target, options);
  return validator.hasErrors();
}

test("validate Hostname Input", () => {
  // expect true
  expect(callFc("hostname", "")).toBe(true);
  expect(callFc("hostname", "www.google.com &&")).toBe(true);

  // expect false
  expect(callFc("hostname", "google")).toBe(false);
  expect(callFc("hostname", "google.com")).toBe(false);
  expect(callFc("hostname", "www.google.com")).toBe(false);
});

test("validate IP Input", () => {
  // expect true
  expect(callFc("ip", "")).toBe(true);

  expect(callFc("ip", "192")).toBe(true);
  expect(callFc("ip", "192.168")).toBe(true);
  expect(callFc("ip", "192.168.178")).toBe(true);
  expect(callFc("ip", "abc.168.d.157")).toBe(true);
  expect(callFc("ip", "500.168.329.157")).toBe(true);
  expect(callFc("ip", "192.168.178.157.111")).toBe(true);
  expect(callFc("ip", "192.168.178.157 &&")).toBe(true);

  expect(callFc("ip", "2001:db8:::")).toBe(true);
  expect(callFc("ip", "2001:db8:3333:4444:5555:6666:7777")).toBe(true);
  expect(callFc("ip", "2001:db8::1234:5678 &&")).toBe(true);

  // expect false
  expect(callFc("ip", "192.168.178.157")).toBe(false);
  expect(callFc("ip", "2001:db8::")).toBe(false);
  expect(callFc("ip", "::1234:5678")).toBe(false);
  expect(callFc("ip", "2001:db8::1234:5678")).toBe(false);
  expect(callFc("ip", "2001:db8:3333:4444:5555:6666:7777:8888")).toBe(false);
});

test("validate Int Input", () => {
  // expect true
  expect(callFc("int", "", { min: 0, max: 1 })).toBe(true);
  expect(callFc("int", 123, { min: 0, max: 1 })).toBe(true);
  expect(callFc("int", "2", { min: 0, max: 1 })).toBe(true);
  expect(callFc("int", "-1", { min: 0, max: 1 })).toBe(true);
  expect(callFc("int", "abc", { min: 0, max: 1 })).toBe(true);

  // expect false
  expect(callFc("int", 1, { min: 0, max: 1 })).toBe(false);
  expect(callFc("int", "0", { min: 0, max: 1 })).toBe(false);
  expect(callFc("int", "1", { min: 0, max: 1 })).toBe(false);
});

test("validate Selection Input", () => {
  // expect true
  expect(callFc("selection", "", { selections: ["a", "b", "c"] })).toBe(true);
  expect(callFc("selection", 1, { selections: ["a", "b", "c"] })).toBe(true);
  expect(callFc("selection", "d", { selections: ["a", "b", "c"] })).toBe(true);

  // expect false
  expect(callFc("selection", "a", { selections: ["a", "b", "c"] })).toBe(false);
});

test("validate Port Range Input", () => {
  // expect true
  expect(callFc("portRange", "")).toBe(true);
  expect(callFc("portRange", "65536")).toBe(true);
  expect(callFc("portRange", "-1")).toBe(true);
  expect(callFc("portRange", "abc")).toBe(true);
  expect(callFc("portRange", "1-75535")).toBe(true);
  expect(callFc("portRange", "1-100-1")).toBe(true);

  // expect false
  expect(callFc("portRange", "1-65535")).toBe(false);
  expect(callFc("portRange", "1-100")).toBe(false);
  expect(callFc("portRange", "100")).toBe(false);
  expect(callFc("portRange", "65535")).toBe(false);
});
