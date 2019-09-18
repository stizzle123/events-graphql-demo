import "dotenv/config";
import express from "express";
import graphQLHTTP from "express-graphql";
import { buildSchema } from "graphql";
import mongoose from "mongoose";
import { dbconnect } from "./config/dbconn";
import { Event } from "./models/Event";
import { User } from "./models/User";
import bcryptjs from "bcryptjs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
dbconnect(mongoose);

const schema = buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        creator: String
        createdAt: String
        updatedAt: String
    }

    type User {
      _id: ID!
      email: String!
      password: String
      createdAt: String
      updatedAt: String
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        creator: String
        createdAt: String
        updatedAt: String
    }

    input UserInput {
      email: String!
      password: String!
      createdAt: String
      updatedAt: String
    }
    type RootQuery{
        events: [Event!]!
        users: [User!]!
    }
    type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
// Connect to GraphQL
app.use(
  "/graphql",
  graphQLHTTP({
    schema,
    rootValue: {
      events: async () => {
        try {
          const doc = await Event.find({});
          return doc.map(event => {
            return { ...event._doc };
          });
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
      createEvent: args => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          creator: "5d81ecc16065bf49b80b1ccf"
        });
        let createdEvent;
        return event
          .save()
          .then(result => {
            createdEvent = { ...result._doc };
            return User.findById("5d81ecc16065bf49b80b1ccf");
          })
          .then(user => {
            if (!user) {
              throw new Error("User not found");
            }
            user.createdEvents.push(event._id);
            return user.save();
          })
          .then(() => {
            return createdEvent;
          })
          .catch(err => {
            throw err;
          });
      },
      createUser: async args => {
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(args.userInput.password, salt);
        const user = new User({
          email: args.userInput.email,
          password: hash
        });
        try {
          const result = await user.save();
          // console.log(result);
          return { ...result._doc, password: null };
        } catch (err) {
          console.log({ Message: err.errmsg });
          throw new Error("User already exist");
        }
      }
    },
    graphiql: true
  })
);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`[Server] Listening on port ${PORT}`));
