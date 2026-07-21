1. design the Next.js folder structure to handle dynamic subdomain layouts?
2. Do you want to write the Stripe webhook controller code logic next to handle multi-tenant subscription states?
3. Do you need a layout design for the Agent property upload dashboard UI?
4. Do you want the exact code implementation for a specific endpoint (like the presigned-url photo upload or the login route)?
5. Do you want to see the specific layout of the JSON payloads for the public property filtering system?
6. Should we outline the API Rate Limiting rule structure to prevent a single busy tenant from crashing your backend server?

Token Generation

1. Tenant & Platform Management APIs (Global / System Admin Only)
	GET /api/v1/admin/tenants
	GET /api/v1/admin/tenants/:tenant_id
	PATCH /api/v1/admin/tenants/:tenant_id/status
	GET /api/v1/admin/analytics

2. Tenant Provisioning & Subscription APIs (Public / Onboarding)
These endpoints handle new agency registrations and their subscription billing billing status.
	POST /api/v1/auth/register-tenant — Creates a new agency space, validates subdomain availability, and generates the Tenant Admin user.
	POST /api/v1/billing/checkout — Redirects the Tenant Admin to a Stripe billing page to purchase a subscription plan.
	POST /api/v1/billing/webhook — (Inbound from Stripe) Listens for successful or failed subscription renewals to update tenant access privileges.

3. Identity & Access Management (IAM) APIs
These handle logins, user sessions, and staff management within an agency's isolated workspace.
	POST /api/v1/auth/login — Authenticates users and returns a short-lived JWT token containing tenant_id and role.
	POST /api/v1/auth/refresh — Swaps a valid refresh token for a fresh access token without forcing a relogin.
	POST /api/v1/auth/logout — Invalidates the user's active session.
	GET /api/v1/tenant/users — Lists all staff members (Agents, Admins) belonging only to the calling agency.
	POST /api/v1/tenant/users/invite — Sends an email invitation to a new real estate agent to join the agency workspace.

4. Property Inventory Management APIs (Authenticated Agents/Admins)
Used internally by agents to build, update, and manage their real estate catalog.
	GET /api/v1/properties — Lists properties belonging to the agency (supports agent-specific filters).
	GET /api/v1/properties/:property_id — Fetches full schema details for a specific listing.
	POST /api/v1/properties — Creates a new property listing shell.
	PUT /api/v1/properties/:property_id — Overwrites/updates property attributes (price, status, description).
	DELETE /api/v1/properties/:property_id — Archives or permanently deletes a property listing.
	
5. Media & Asset Storage APIs
Handles image processing and secure upload delegation for high-resolution home photos.
	POST /api/v1/media/presigned-url — Generates a secure, temporary Amazon S3 upload URL. Allows the frontend to upload photos directly to the cloud without bottlenecking your API server.
	POST /api/v1/media/process — Tells the backend that an upload finished, triggering image optimization and associating the file path with a specific property_id.
	DELETE /api/v1/media/:media_id — Removes an image from a listing and deletes it from cloud storage.
	
6. Public Portal Marketplace APIs (Unauthenticated Public Traffic)
These power the customer-facing website layout hosted on each agency's unique subdomain. They do not require a login token but are strictly bound to the subdomain making the request.
	GET /api/v1/public/listings — Returns active properties for a specific subdomain (supports search keywords, price sliders, and map coordinates).
	GET /api/v1/public/listings/:slug_or_id — Fetches the public detail view for a specific home layout.
	POST /api/v1/public/listings/:property_id/inquire — Submits a buyer's contact lead form.

7. Lead & Customer Relationship Management (CRM) APIs
Captures buyer intent and presents consumer contact information to internal agents.
	GET /api/v1/leads — Fetches incoming property inquiries. Agents see only their assigned leads; Admins see all agency leads.
	PATCH /api/v1/leads/:lead_id/status — Updates lead status tracking markers (e.g., New, Contacted, Under Negotiation, Closed).

