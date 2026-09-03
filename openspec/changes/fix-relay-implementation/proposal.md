## Why

Prytaneum's React Relay integration currently suffers from critical bugs, anti-patterns, and memory leaks. The Relay Environment reset fails to trigger React re-renders on logout, cross-origin fetch requests omit authentication cookies, non-JSON server errors crash the runtime, route changes fail to load fresh event queries due to stale query ref guards, Suspense boundaries reference their own suspending components as fallbacks, and connection handler updaters rely on brittle string concatenation rather than Relay's standard filter APIs. Fixing these issues is critical for application reliability, security, real-time consistency, and user experience.

## What Changes

- **Relay Environment & Network Layer**:
  - Update `makeFetchFunction` to send `credentials: 'include'` for cross-origin authentication cookies.
  - Add safe HTTP response handling to inspect `response.ok` and content-type before parsing JSON.
  - Refactor `useEnvironment` to maintain the active Relay Environment in React state so `resetEnv()` triggers full re-renders and properly purges cached data on logout.
  - Add cleanup and teardown logic for the subscription client singleton when environments reset.
- **Authentication & User State Synchronization**:
  - Synchronize `UserContext` directly with the Relay store so login mutations and logout actions reactively propagate throughout the app without page reloads.
- **Query Loading & Route Navigation**:
  - Fix `useEffect` query loader guards in event views (`PreloadedEventLive`, `PreloadedEventPost`, `PreloadedEventLiveModeratorView`) to reload queries when route parameters (`eventId`, `lang`, `token`) change.
  - Fix self-referential Suspense fallbacks in `EventPre.tsx` and `EventPost.tsx` to render appropriate loaders instead of re-rendering suspending containers.
  - Eliminate redundant double fetching between `fetchQuery` and `loadQuery` in `Dashboard.tsx`.
- **Relay Store Updaters & Connections**:
  - Replace manual string concatenation (`connection + '(topic:"...")'`) in question updaters and buttons with Relay's standard `ConnectionHandler.getConnectionID(parentId, key, { topic })` / `ConnectionHandler.getConnection(parentRecord, key, { topic })`.
  - Add safe null checks when traversing linked records in subscription updaters (`useQuestionCreatedByTopic`).
  - Fix pagination refresh handlers in `useDashboardEvents` and `useBroadcastMessageList` to fetch from the start of lists rather than querying beyond `endCursor`.
  - Fix synchronous clearing of `isRefreshing` and memoize interval callbacks in `useRefresh`.

## Capabilities

### New Capabilities
- `client/relay-network-and-state`: Covers Relay Environment lifecycle, fetch and subscription network transport, authentication cookie propagation, connection handlers, and reactive query loading.

### Modified Capabilities
<!-- None: openspec/specs/ is currently empty. -->

## Impact

- **Affected Code**: `app/client/src/core/relay.ts`, `app/client/src/features/accounts/`, `app/client/src/features/events/`, `app/client/src/features/dashboard/`, `app/client/src/core/useRefresh.tsx`.
- **Dependencies**: Resolves lifecycle issues with `subscriptions-transport-ws` and aligns Relay runtime usage.
