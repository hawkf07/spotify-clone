// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { userInfo} from "./spotify/usersInfo";
import { token } from "./spotify/token";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("question.", protectedExampleRouter)
  .merge("spotify.", userInfo)
  .merge("token.",token)

// export type definition of API
export type AppRouter = typeof appRouter;
