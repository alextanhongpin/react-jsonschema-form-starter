import { Router } from "express";
import app, { start } from "./infra/server/index.js";
import { createCountryFeature } from "./features/country/index.js";
import { createFormFeature } from "./features/form/index.js";
import { createUserFeature } from "./features/user/index.js";
import { createBookFeature } from "./features/book/index.js";
import { createDynamicFormFeature } from "./features/dynamic-form/index.js";
import { collection } from "./infra/db/index.js";

const book = createBookFeature(collection);
const country = createCountryFeature();
const form = createFormFeature(collection);
const user = createUserFeature(collection);
const dynamicForm = createDynamicFormFeature({
  bookUsecase: book.usecase,
  userUsecase: user.usecase,
  formUsecase: form.usecase,
});

// Seed data.
await Promise.allSettled([form.seed(), user.seed()]);

const v1 = new Router();
v1.use("/books", book.router);
v1.use("/countries", country.router);
v1.use("/dynamic-forms", dynamicForm.router);
v1.use("/forms", form.router);
v1.use("/users", user.router);

app.use("/api/v1", v1);

start(app);
