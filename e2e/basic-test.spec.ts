import { test, expect } from "@playwright/test";

const VUE_PORT = 4951;
const REACT_PORT = 4950;

const testingFn = (app: "Vue" | "React") => {
  const port = app === "Vue" ? VUE_PORT : REACT_PORT;
  test.describe(`Shrek Adjective Changer - - - ${app} TEST`, () => {
    expect(true).toBeTruthy();
  });
};
testingFn("React");
testingFn("Vue");
