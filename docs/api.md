# REST API

The base URL is `http://localhost:8080/api/v1` in local development. Requests and responses use JSON. Successful controller responses use this envelope:

```json
{
  "success": true,
  "message": "Human-readable result",
  "data": {},
  "timestamp": "2026-09-26T12:00:00"
}
```

Protected endpoints require `Authorization: Bearer <token>`. A successful login returns the JWT in `data.token` and `data.type` is `Bearer`. The backend uses HTTP `401` for missing/invalid authentication and `403` for insufficient roles. Validation and provider errors are returned as HTTP errors, not successful fallback data.

## Authentication

| Method | Path | Access | Request |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Public | `{"username":"traveler","email":"traveler@example.com","password":"at-least-8-characters","fullName":"Traveler Name"}` |
| `POST` | `/auth/login` | Public | `{"username":"traveler","password":"your-password"}` |

Registration also accepts `/auth/signup`. Legacy `/api/auth/...` aliases remain available. Username length is 3–50 characters, email is validated, password length is 8–72 characters, and `fullName` is optional (maximum 100 characters). Duplicate usernames/emails return HTTP `409`. Passwords are BCrypt-hashed before persistence.

Login response data:

```json
{
  "token": "<JWT>",
  "type": "Bearer",
  "id": 1,
  "username": "traveler",
  "email": "traveler@example.com",
  "roles": ["ROLE_USER"]
}
```

## Public reads

| Method | Path | Query parameters |
| --- | --- | --- |
| `GET` | `/beaches` | Optional `search` |
| `GET` | `/beaches/{id}` | — |
| `GET` | `/temples` | Optional `search` |
| `GET` | `/temples/{id}` | — |
| `GET` | `/foods` | Optional `category` (`VEG`, `NON_VEG`, `FISH`, `SWEET`) |
| `GET` | `/foods/{id}` | — |
| `GET` | `/culture/traditions` | — |
| `GET` | `/culture/traditions/{id}` | — |
| `GET` | `/culture/events` | — |
| `GET` | `/reviews` | Optional `itemName`, or `targetType` with `targetId` |

## Authenticated user endpoints

| Method | Path | Request/notes |
| --- | --- | --- |
| `GET` | `/trips` | Lists the authenticated user's trips |
| `POST` | `/trips` | Create a trip itinerary; duration must be 1–30 days |
| `GET` | `/trips/{id}` | Retrieves a trip owned by the authenticated user |
| `DELETE` | `/trips/{id}` | Deletes a trip owned by the authenticated user |
| `GET` | `/favorites` | Lists the authenticated user's favorites |
| `POST` | `/favorites` | `{"itemName":"Panambur Beach","itemType":"BEACH"}`; type is `BEACH`, `TEMPLE`, `FOOD`, or `EVENT` |
| `DELETE` | `/favorites?itemName={name}` | Removes a favorite for the authenticated user |
| `POST` | `/reviews` | Add a review; send `itemName`, `rating` (1–5), and applicable target fields. The author is derived from the authenticated user |
| `POST` | `/ai/chat` | `{"message":"Plan a three-day coastal tour"}`; message length is 1–4000 characters |

Trip and favorite ownership is derived from the signed-in principal, not a client-supplied user ID. Gemini quota is managed by Google AI Studio for the configured model/project.

## Administrator endpoints

These routes require the `ROLE_ADMIN` authority:

| Method | Path |
| --- | --- |
| `GET` | `/admin/users` |
| `GET` | `/admin/reviews` |
| `DELETE` | `/admin/reviews/{id}` |
| `POST`, `PUT`, `DELETE` | `/admin/beaches`, `/admin/beaches/{id}` |
| `POST` | `/admin/temples` |
| `POST` | `/admin/food` |
| `POST` | `/admin/culture` |
| `POST` | `/admin/events` |

The actuator health endpoint is public at `GET http://localhost:8080/actuator/health`.

## Postman

1. Set `baseUrl` to `http://localhost:8080/api/v1`.
2. Call `POST {{baseUrl}}/auth/login` with the login JSON above.
3. Copy `data.token` from the response into a Postman environment variable named `token`.
4. Set Bearer Token authorization to `{{token}}` for protected requests. Do not save real passwords or tokens in shared collections.
