//common Matchers
//toBe
//toEqual

const { expect } = require("expect");
const sum = require("./helper");
test("addition of 1 & 2", () => {
  expect(sum(1, 2)).toBe(3);
});

test("addition of 5 & 6", () => {
  expect(sum(5, 6)).toBe(11);
});

test("obj assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

let a;
let b = true;
let c = false;
let d = null;

//Matchers

//Truthiness

//toBeNull,toBeUndefined,toBeDefined,toBeTruthy,toBeFalsy

test("check undefined", () => {
  expect(a).toBeUndefined();
});

test("check truthiness", () => {
  expect(b).toBeTruthy();
});

test("check Falsy", () => {
  expect(c).toBeFalsy();
});

test("check null", () => {
  expect(d).toBeNull();
});

test("check non null", () => {
  expect(c).not.toBeTruthy();
});

//Matchers for numbers

//toBeGreaterThan,toBeGreaterThanOrEqual,toBeLessThan,toBeLessThanOrEqual

test("1+1", () => {
  expect(1 + 2).toBeGreaterThanOrEqual(3);
});

//Matchers for Floating point numbers

//toBeCloseTo
test("floating pint numbers", () => {
  const value = 0.1 + 0.3;
  expect(value).toBeCloseTo(0.4);
});

//String Matcher

//toMatch

test("There is no 'I' in fresco play", () => {
  expect("Freco Play").not.toMatch(/I/);
});

//Array Matcher

//toContain
var employees = ["Johns", "Martin"];
test("Check Array Element", () => {
  expect(employees).toContain("Johns");
});

//Exceptions

//toThrow

var employee = [];
function EmptyCheck() {
  if (employee.length === 0) {
    throw new Error("Empty Array");
  }
}

test("Empty Check", () => {
  expect(EmptyCheck).toThrow();
  expect(EmptyCheck).toThrow(Error);
  expect(EmptyCheck).toThrow("Empty Array");
  expect(EmptyCheck).toThrow(/Empty/);
});

// Sometimes while writing tests, you have some setup work that has to happen before tests run, and you have some finishing work that needs to happen after test run. Jest provides some helper functions to handle this. Some of them are,

// beforeEach and afterEach

// beforeAll and afterAll

// describe
let data;
describe("testing Setup & Teardown", () => {
  beforeEach(() => {
    data = { one: 1, two: 2 };
  });
  afterEach(() => {
    data = {};
  });

  test("data obj equal", () => {
    expect(data).toEqual({ one: 1, two: 2 });
  });

  test("data property equal", () => {
    expect(data.one).toBe(1);
  });
});

test("after describe block test", () => {
  expect();
});

//Mock Functions

const myFun = () => "myFunc called";

test("test my func", () => {
  mockedFn = jest.fn();
  mockedFn.mockImplementation(() => {
    return "myFunc Called!";
  });
  console.log(mockedFn());
});

//.mock property
test(".mock property", () => {
  const mockFn = jest.fn();
  const a = new mockFn();
  console.log(mockFn.mock.instances.length);
});

//more mock functions : mock.calls,mock.instances,mockClear(),mockReset(),mockRestore(),mockImplementation(fn),mockImplementationOnce(fn),
//mockReturnValue(val) and mockReturnValueOnce(val)

test(".mock property test", () => {
  const mockFn = jest.fn();
  const a = new mockFn();
  const b = new mockFn();
  console.log(mockFn.mock.instances[0] === a);
  console.log(mockFn.mock.instances[1] === b);
});

function real() {
  return "real";
}

test("mock implementation", () => {
  mocked = jest.fn();
  mocked.mockImplementation(() => {
    return "mocked";
  });

  mocked.mockImplementationOnce(() => {
    return "mocked once";
  });

  console.log(real());
  console.log(mocked());
  console.log(mocked(), mocked());
});

test("mock return value", () => {
  myMock = jest.fn();
  myMock.mockReturnValueOnce("only once:mocked return");
  myMock.mockReturnValue("mocked return");

  console.log(myMock());
  console.log(myMock());
  console.log(myMock());
});

//Testing asynchronous code

//callback functions
function fetchData(callback) {
  setTimeout(() => {
    callback({ status: "completed" });
  }, 2000);
}

test("fetch data returns completed status", (done) => {
  function callback(data) {
    expect(data.status).toBe("completed");
    done();
  }
  fetchData(callback);
});

//Promises
function first() {
  var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("first");
      resolve("first");
    }, 2000);
  });
  return promise;
}

function second() {
  var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("second");
      reject("second error");
    }, 2000);
  });
  return promise;
}

test("testinmg promises", async () => {
  await expect(first()).resolves.toBe("first");
});

test("multiple promises", async () => {
  await expect(second()).rejects.toBe("second error");
});
