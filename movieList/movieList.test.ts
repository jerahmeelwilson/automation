import { hasUncaughtExceptionCaptureCallback } from "process";
import { emitKeypressEvents } from "readline";
import { testEnvironment } from "./jest.config";

const { Builder, Capabilities, By } = require("selenium-webdriver");

require("chromedriver");

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
  await (await driver).get("http://127.0.0.1:5500/movieList/index.html");
});

afterAll(async () => {
  await (await driver).quit();
});

test("Add movie test", async () => {
  let movieTitle = "Movie 1";
  await driver.findElement(By.tagName("input")).sendKeys(`${movieTitle}\n`);
  let movieButton = await driver.findElement(
    By.xpath("/html/body/main/ul/li[1]/button")
  );
  let title = await movieButton.getAttribute("id");
  expect(title).toBe(movieTitle.replace(/\s/g, ""));
});
