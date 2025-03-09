## Scenario 1: Authorization Middleware Debugging (Breakpoint at Line 7)

- **Breakpoint Location:** `src/middleware/isAuthorized.ts:7`
- **Objective:** Investigate how the middleware extracts user roles and permissions.

### Debugger Observations

- **Variable States:**
  - `opts.hasRole`: `["admin", "moderator"]`
  - `res.locals.role`: `"user"`
  - `req.params.id`: `"123456"`

- **Call Stack:**
  - `isAuthorized(opts) -> middleware execution`
  - Called from `loanRoutes.ts` where admin access is required.

- **Behavior:**  
  - The `res.locals.role` was `"user"`, but the route required `"admin"`, leading to a **403 Forbidden** response.

### Analysis

- **Findings:**
  - The middleware correctly prevented unauthorized access.
  - The `role` property in `res.locals` is being correctly set by the authentication middleware before this function runs.
  
- **Areas for Improvement:**
  - Add more **descriptive error messages** for debugging.
  - Log the role and expected roles in the response for easier debugging.
  - Example enhancement:
    ```typescript
    if (!role) {
      return res.status(403).json({ message: "Access Denied: No role found in request" });
    }
    ```

---


## Scenario 2: Loan Application Route Debugging
Breakpoint Location: src/api/v1/controllers/loanController.ts:15
Objective: Debug the loan application retrieval process and ensure the API correctly returns loan data.

# Debugger Observations
Variable States:

req.method: "GET"
req.url: "/api/v1/loans"
req.headers.authorization: Present (valid Firebase token)
loans: [ { id: 1, amount: 5000, status: "pending" } ]

# Call Stack:

loanRoutes.ts -> getLoans() in loanController.ts
Middleware authenticateUser() executed before this function.

# Behavior:

The function executes successfully and returns a hardcoded loan array.
No database connection, so loan data is not dynamically retrieved.
If the user is unauthorized, the request is blocked before reaching the controller.

# Analysis
## Findings:

The function works but returns static data instead of querying the database.
Middleware successfully authenticates the request before hitting the controller.
No validation errors observed, but the function needs real database integration.

---

Scenario 3: Firebase Authentication Debugging
Breakpoint Location: src/middleware/authenticate.ts:6
Objective: Debug Firebase authentication middleware to verify that tokens are correctly extracted, validated, and attached to the request object.

## Debugger Observations
Variable States at Breakpoint (Line 6):

req.headers.authorization: Undefined (if token is missing)
token: Undefined (if no Bearer token is provided)
req.method: "GET" (for API requests)
req.url: "/api/v1/loans" (assuming this is a protected route)

## Call Stack:

authenticate() middleware in authMiddleware.ts
Called from protected route in loanRoutes.ts

# Behavior:

If req.headers.authorization is missing, the function immediately returns a 401 Unauthorized response.
If the token exists but is malformed or expired, the function reaches the catch block and logs an error.
If the token is valid, res.locals.uid and res.locals.role are correctly assigned, and the request proceeds.

# Analysis
## Findings:

Some API requests are made without an Authorization header, causing an early 401 error.
The res.locals.role value is undefined unless Firebase custom claims are properly set.
Expired or invalid tokens trigger an unhandled Firebase error message.