import express from "express";
import cors from "cors";
const MAXIMO_TWEETS = 10;

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
    const tweetsComAvatar = [];

    for(let i = tweets.length -1; i >= 0; i--){
        let avatarTweet;
        for(let j = 0; j < users.length; j++){
            if(tweets[i].username === users[j].username){
                avatarTweet = users[j].avatar;
                break;
            }
        }
        tweetsComAvatar.push({
            username: tweets[i].username,
            avatar: avatarTweet,
            tweet: tweets[i].tweet
        })
    }

    if(tweets.length < 10){     
        response.send(tweetsComAvatar);
    }else{
        
        const tweetsResponse = [];
        for(let i = 0; i < MAXIMO_TWEETS; i++){
            tweetsResponse.push(tweetsComAvatar[i]);
        }
        response.send(tweetsResponse);
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