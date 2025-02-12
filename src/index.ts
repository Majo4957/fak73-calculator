import { Hono } from "hono";

const app = new Hono();

app.get("/stateless-add", (c) => {
  const x = +(c.req.query("x") || 0);
  if (isNaN(x)) {
    return c.text("Invalid x");
  }
  const y = +(c.req.query("y") || 0);
  if (isNaN(y)) {
    return c.text("Invalid y");
  }

  const result = x + y;
  return c.json({ result });
});

let state = 0;

app.get("/add", (c) => {
  const y = +(c.req.query("y") || 0);
  if (isNaN(y)) {
    return c.text("Invalid y");
  }

  state += 2;
  const result = state;
  return c.json({ result });
});

app.get("/reset", (c) => {
  state = 0;
  return c.json({ message: "State has been reset to 0" });
});

app.get("/crash", (c) => {
  process.exit(1);
});

app.get("/stress", (c) => {
  while (true) {
    Math.sqrt(Math.random());
  }
});


app.get("/", (c) => {
  return c.text("Hello Homo!");
});

export default {
  fetch: app.fetch,
  port: 8080
}
