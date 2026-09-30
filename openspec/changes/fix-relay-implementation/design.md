## Context

See `proposal.md` for background and motivation. The Relay integration currently binds the environment to an unreactive `useMemo` reference in `_app.tsx`, lacks `credentials: 'include'` on the network layer fetcher, relies on manual string concatenation for Relay connection IDs, and has query loading bugs where components fail to respond to route transitions.

## Goals / Non-Goals

**Goals:**
- Provide a robust, reactive Relay Environment lifecycle that cleans up cached records and subscriptions on reset.
- Ensure cross-origin HTTP requests transmit authentication cookies and gracefully handle non-JSON error payloads.
- Ensure components using `useQueryLoader` re-fetch data when route parameters change.
- Fix all self-referential Suspense fallbacks.
- Migrate manual string concatenation for filtered connection IDs to Relay's standard `ConnectionHandler` filter API.
- Fix pagination refetch logic to properly reload from the start of connections.

**Non-Goals:**
- Migrating from `subscriptions-transport-ws` to `graphql-ws` across both server and client (that requires full server WebSocket protocol migration and will be handled in a separate change).
- Rewriting all preloaded queries into `useLazyLoadQuery` across every screen (we preserve the current preloaded query architecture while fixing its lifecycle and route parameter dependencies).

## Decisions

### 1. Reactive Relay Environment Hook
- **Decision**: Update `useEnvironment(initialRecords)` in `app/client/src/core/relay.ts` to store `env` in a `useState` state hook. Expose `resetEnv` which calls `clearEnvironment()` and calls `setEnv(initEnvironment(initialRecords))`.
- **Alternatives Considered**:
  - `window.location.reload()`: Disruptive, causes screen flicker, loses client navigation state.
  - Full Redux/Zustand store: Unnecessary overhead since Relay already has its own store and Next.js can pass the new instance down via `RelayEnvironmentProvider`.

### 2. Network Fetch Security & Error Handling
- **Decision**: Add `credentials: 'include'` to `makeFetchFunction` in `app/client/src/core/relay.ts`. Inspect `response.ok` and content-type before invoking `response.json()`. If not ok, throw an Error with the HTTP status and statusText.
- **Alternatives Considered**:
  - Passing manual Authorization headers: Requires saving tokens to localStorage, violating httpOnly cookie security best practices.

### 3. Connection Handler Filters
- **Decision**: Update `ConnectionHandler.getConnectionID(parentId, key, { topic })` and `ConnectionHandler.getConnection(parentRecord, key, { topic })` instead of appending `+ '(topic:"...")'`.
- **Alternatives Considered**:
  - Keeping string concatenation with fixes: Brittle, vulnerable to future Relay internal key serialization changes.

### 4. Query Loader Route Parameter Synchronization
- **Decision**: In `PreloadedEventLive`, `PreloadedEventPost`, `PreloadedEventLiveModeratorView`, and `PreloadedActionsPanels`, track current route arguments (e.g. `eventId`) using a ref or by triggering `loadQuery` when `eventId` changes, without being blocked by `if (!queryRef)`.
- **Alternatives Considered**:
  - Keying components with `<PreloadedEventLive key={eventId} />` in Next.js page components: Works, but fixing the hook guard ensures resilience even if used without a changing key.

## Risks / Trade-offs

- **[Risk] State reset unmounts active components**: Resetting the Relay environment triggers a tree re-render.
  - *Mitigation*: This only happens on explicit logout or session termination, where complete cache invalidation is the intended behavior.
- **[Risk] Connection key mismatch in existing tests**: Existing mocks or tests might assume string keys.
  - *Mitigation*: Run Relay compiler and existing test suites to ensure contract compatibility.
