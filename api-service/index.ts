import express from "express";
import { Redis } from "ioredis";

const serverPort = 8080;

const app = express();
let redis: null | Redis = null;

app.get("/", (req, res, next) => {
  res.json({ msg: "Jai Gurudev" });
});

app.get("/posts", async (req, res, next) => {
  try {
    if (redis) {
      const postsData = await redis.get("posts");
      if (postsData) {
        res.json(JSON.parse(postsData));
        return;
      }
    }

    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    if (redis) {
      await redis.setex("posts", 3600, JSON.stringify(data));
    }

    res.json(data);
  } catch (err) {
    res.status(400).json({ msg: "redis not found" });
  }
});

app.get("/posts/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    if (redis) {
      const singlePostData = await redis.get(`post-${id}`);

      if (singlePostData) {
        res.json(JSON.parse(singlePostData));
        return;
      }
    }

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts" + "/" + id
    );
    const dataOfOnePost = await response.json();

    if (redis) {
      await redis.setex(`post-${id}`, 3600, JSON.stringify(dataOfOnePost));
    }

    res.json(dataOfOnePost);
  } catch (err) {
    res.status(500).json({ msg: "something went wrong" });
  }
});

async function init() {
  try {
    // Connect with redis
    redis = new Redis({
      host: process.env.REDIS_HOST,
      port: 6379,
    });

    // Start server
    app.listen(serverPort, () => {
      console.log("started api service @ port: ", serverPort);
    });
  } catch (err) {
    console.log("some error ocurred");
  }
}
init();
