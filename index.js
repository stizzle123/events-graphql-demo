import "dotenv/config";
import express from "express";
import graphQLHTTP from "express-graphql";
import { buildSchema } from "graphql";
import mongoose from "mongoose";
import { dbconnect } from "./config/dbconn";
import { Event } from "./models/Event";

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
        createdAt: String
        updatedAt: String
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        createdAt: String
        updatedAt: String
    }
    type RootQuery{
        events: [Event!]!
    }
    type RootMutation {
        createEvent(eventInput: EventInput): Event
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
      createEvent: async args => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price
        });
        try {
          const result = await event.save();
          console.log(result);
          return { ...result._doc };
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
    },
    graphiql: true
  })
);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`[Server] Listening on port ${PORT}`));
