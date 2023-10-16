import { Builder } from "@aloma.io/integration-sdk";

const builder = new Builder();

builder.config({
  fields: {
    type: {
      name: "Database Type",
      placeholder: "e.g. mysql2, pg, tedious",
      type: "line",
      plain: true,
    },
    host: {
      name: "Host",
      placeholder: "e.g. a.example.com",
      type: "line",
      plain: true,
    },
    port: {
      name: "Port",
      placeholder: "e.g. 3306",
      type: "line",
      plain: true,
    },
    database: {
      name: "Database",
      placeholder: "e.g. example",
      type: "line",
      plain: true,
      optional: true,
    },
    user: {
      name: "User",
      placeholder: "e.g. john",
      type: "line",
      plain: true,
      optional: true,
    },
    password: {
      name: "Password",
      placeholder: "e.g. x3gsadg",
      type: "line",
      optional: true,
    },
  },
});

const runtime = await builder.build();

await runtime.start();
