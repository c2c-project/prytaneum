## Purpose

Defines the network transport, authentication lifecycle, store consistency, and query loading behaviors for the React Relay client.

## ADDED Requirements

### Requirement: Cross-Origin Cookie Propagation
The Relay network fetch layer SHALL include credentials with all outgoing GraphQL requests so authentication cookies are sent across origins.

#### Scenario: Fetch request includes credentials
- **WHEN** the client initiates any GraphQL operation via the Relay network fetcher
- **THEN** the request configuration includes `credentials: 'include'` to ensure the session cookie is transmitted

### Requirement: Resilient HTTP Error Handling
The Relay network fetch layer SHALL validate HTTP status and response headers before attempting JSON deserialization.

#### Scenario: Server returns non-JSON error response
- **WHEN** the server returns an HTTP error status (such as 500, 502, or 504) with an HTML or text payload
- **THEN** the network layer rejects with a clear network error containing the HTTP status code instead of throwing a JSON parse error

### Requirement: Reactive Environment Reset
The Relay Environment provider SHALL reactively recreate and propagate a fresh Relay Environment instance upon logout or environment reset, clearing cached records from the component tree without requiring a window reload.

#### Scenario: User logs out or resets environment
- **WHEN** `resetEnv` or logout is executed
- **THEN** the root `RelayEnvironmentProvider` receives a newly instantiated Relay Environment, active subscriptions are closed, and existing cached queries are replaced across all mounted components

### Requirement: Route Parameter Query Reloading
Components utilizing Relay query loaders SHALL re-trigger query loading whenever route parameters (such as event ID or language) change.

#### Scenario: User navigates between events
- **WHEN** the user navigates from one event URL to another
- **THEN** the component reloads the query with the new event ID rather than reusing the existing preloaded query reference

### Requirement: Non-Suspending Fallbacks
Suspense boundaries wrapping preloaded queries SHALL use dedicated loading indicator components as fallbacks rather than referencing the suspending component itself.

#### Scenario: Preloaded query suspends
- **WHEN** a container component suspends while waiting for query data
- **THEN** the Suspense boundary renders a loader fallback without triggering secondary suspension

### Requirement: Filtered Connection Management
Relay connection record lookups and mutations SHALL pass filter arguments directly to Relay's ConnectionHandler APIs rather than manually appending serialized string keys.

#### Scenario: Topic-filtered question connection lookup
- **WHEN** a mutation or subscription updater queries or modifies a filtered connection (such as topic queue or topic questions)
- **THEN** the connection ID is retrieved using `ConnectionHandler.getConnectionID(parentID, key, { topic })` and nodes are safely inserted or removed without key mismatches

### Requirement: Correct List Refresh Pagination
Refreshing a paginated connection SHALL reset pagination cursors to fetch the latest elements from the start of the list.

#### Scenario: User or interval triggers list refresh
- **WHEN** a list refresh action executes
- **THEN** the refetch query does not pass `endCursor` as the `after` or `cursor` argument, ensuring items are fetched from the beginning
