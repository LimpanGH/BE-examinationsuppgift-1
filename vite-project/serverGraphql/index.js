const env = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const db = require('./db/db');
const schema = require('./db/schema');

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 4000;

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     Schema: buildSchema(`
//         type RootQuery {
//             }
//             type RootMutation {
//             }
//                 schema {
//                 query: Query
//                 mutation: Mutation
//                 }
//     `),
//     rootvalue: {},
//     graphiql: true,
//   })
// );

app.listen(port, () => {
  console.log(`Running a GraphQl server on port http://localhost:${port}`);
});

//app.use("/graphql", require("./routes/graphql"));
