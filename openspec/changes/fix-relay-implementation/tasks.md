## 1. Server CORS & Credentials (Test-First)

- [x] 1.1 (RED) Write unit test `app/server/src/core/plugins/cors.unit.test.ts` to assert that Fastify responds with `Access-Control-Allow-Credentials: true`, reflects request origin, and Mercurius context preserves CORS headers; verify test fails against current server implementation.
- [x] 1.2 (GREEN) Update `app/server/src/core/plugins/cors.ts` to enable `credentials: true` with origin reflection, and remove hardcoded wildcard `reply.header('Access-Control-Allow-Origin', '*')` in `mercurius.ts`; verify test passes.

## 2. Relay Network Layer & Environment (Test-First)

- [x] 2.1 (RED) Write unit tests `app/client/src/core/relay.test.ts` covering `makeFetchFunction` (`credentials: 'include'`, GraphQL error handling/throwing, success data unwrapping) and `makeServerFetchFunction` (`Authorization` header with SSR cookie); verify tests fail.
- [x] 2.2 (GREEN) Implement `credentials: 'include'` and GraphQL error handling in `makeFetchFunction` in `app/client/src/core/relay.ts`; verify tests pass.
- [x] 2.3 (RED) Write unit tests in `app/client/src/core/relay.test.ts` for `resetEnv()` to assert environment replacement and `SubscriptionClient` socket termination; verify tests fail.
- [x] 2.4 (GREEN) Refactor `useEnvironment` in `app/client/src/core/relay.ts` to manage environment instances in React state and terminate subscriptions upon environment reset; verify tests pass.

## 3. Connection Handlers & Mutation Updaters (Test-First)

- [x] 3.1 (RED) Write unit tests `app/client/src/features/events/ModeratorView/hooks/OnDeck/utils.test.ts` verifying that `ConnectionHandler.getConnection(..., { topic })` and `ConnectionHandler.getConnectionID(..., { topic })` correctly find and manipulate connection records with topic filters; verify tests fail.
- [x] 3.2 (GREEN) Refactor `useQuestionCreatedByTopic.ts`, `EnqueueQuestionButton.tsx`, `DequeueQuestionButton.tsx`, and `OnDeck/utils.ts` to use Relay `ConnectionHandler` filter arguments instead of string concatenation hacks; verify tests pass.

## 4. Pagination Refresh & Query Loaders (Test-First)

- [x] 4.1 (RED) Write tests asserting that pagination refresh handlers in `useDashboardEvents.ts` and `useBroadcastMessageList.tsx` refetch from the list start (empty/omitted cursor) and maintain `isRefreshing` state asynchronously; verify tests fail.
- [x] 4.2 (GREEN) Fix pagination refresh cursors in `useDashboardEvents.ts` and `useBroadcastMessageList.tsx`, and asynchronous `isRefreshing` tracking in `useRefresh.tsx`, `useEventsDashboard.ts`, and `useUsersDashboard.ts`; verify tests pass.
- [x] 4.3 Fix stale route query reloading in `PreloadedEventLive`, `PreloadedEventPost`, and `PreloadedEventLiveModeratorView` by reloading queries when route parameters change; verify navigation between events loads the correct event.
- [x] 4.4 Fix self-referential Suspense fallbacks in `EventPre.tsx` and `EventPost.tsx` to render `<Loader />` instead of their own containers; verify suspense loading behavior.
- [x] 4.5 Eliminate redundant duplicate fetch in `PreloadedDashboard` (`Dashboard.tsx`); verify single query execution.

## 5. Verification & Regression Testing

- [x] 5.1 Run all server unit tests: `yarn workspace @app/server test:unit`
- [x] 5.2 Run all client unit tests: `yarn workspace @app/client exec jest`
- [x] 5.3 Run Relay compiler: `yarn workspace @app/client relay-compiler`
- [x] 5.4 Run TypeScript checks: `yarn workspace @app/server typecheck` && `yarn workspace @app/client typecheck`

