import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.onError((err,c)=>{
  if(err instanceof HTTPException){
    const errResponse = 
    err.res ?? 
    c.json
  }
})

export default app;
