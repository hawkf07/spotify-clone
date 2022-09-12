import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter().query("hello", {
  input: z
    .object({
      text: z.string().nullish(),
    })
    .nullish(),
  resolve({ input }) {
    return {
      greeting: `Hello ${input?.text ?? "world"}`,
    };
  },
}).query("name", {
  input: z.object({
    text: z.string().nullish(),
    age:z.number().nullish(),

  })
    .nullish(),
  resolve({ input }) {
    return {
      greeting: `Hello Your name is  ${input?.text}`,
      age:`Hello your age is ${input?.age}`
    }
  }
})
  ;
