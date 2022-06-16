import express from "express";
import cors from "cors";



const server = express();
server.use(cors());
server.use(
    express.urlencoded({
      extended: true,
    })
  );
server.use(express.json());



const users = [];
const tweets = [];

server.get("/tweets", (request, response) => {
    if(tweets.length < 10){
        response.send(tweets);
    }else{
        const last10 = [];
        for(let i = tweets.length-1; i >= tweets.length-10; i--){
            last10.push(tweets[i]);
        }
        response.send(last10);
    }
})

server.post("/sign-up", (request, response) => {

    const {username, avatar} = request.body;
    users.push({
        username,
        avatar
    })
    response.send("Ok");
})

server.post("/tweets", (request, response) => {
    const {username, tweet} = request.body;
    tweets.push({
        username,
        tweet
    });
    response.send("Ok");
})

server.listen(5000);