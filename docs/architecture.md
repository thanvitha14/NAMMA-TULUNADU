# Architecture

## Component view

```mermaid
flowchart TB
    subgraph client["Browser client"]
        ui["React + JSX UI"]
        router["React Router DOM"]
        clientState["Authentication context"]
        api["Axios REST client"]
        ui --> router
        ui --> clientState
        clientState --> api
        router --> api
    end

    subgraph backend["Java 21 Spring Boot application"]
        filter["Spring Security filter chain<br/>JWT validation"]
        controllers["Spring MVC controllers"]
        dtos["Validated auth/AI request DTOs<br/>JWT response DTO + ApiResponse"]
        services["Service layer"]
        repositories["Spring Data JPA repositories"]
        entities["JPA entity mappings<br/>Hibernate"]
        filter --> controllers
        controllers --> dtos
        controllers --> services
        services --> repositories
        repositories --> entities
    end

    database[("MySQL")]
    gemini["Google Gemini API<br/>configured Gemini Flash model"]
    api -->|"HTTPS/JSON + Bearer token"| filter
    entities --> database
    services -->|"server-side API call<br/>key stays on backend"| gemini
```

The backend is a layered Spring Boot application, not a set of independently deployed services. Spring dependency injection supplies services and repositories to the controllers. Spring Data JPA/Hibernate maps entity operations to MySQL.

Authentication and AI input use validated request DTOs; login uses a JWT response DTO, and successful responses share the `ApiResponse` envelope. Some existing catalog and administration responses (and a few request bodies) still use entity objects within that envelope; new endpoints should use dedicated DTOs, and further entity/DTO separation should be introduced without changing the established API contract unintentionally.

## Request flows

### Registration and login

```mermaid
sequenceDiagram
    participant Browser as React browser
    participant Security as Spring Security
    participant Controller as AuthController
    participant Service as Auth/domain logic
    participant Repository as Spring Data JPA
    participant DB as MySQL

    Browser->>Security: POST /api/v1/auth/register or /login
    Security->>Controller: Public auth route
    Controller->>Repository: Lookup user / role
    Repository->>DB: JPA query
    DB-->>Repository: User or no match
    Repository-->>Controller: Domain entity
    Controller->>Service: BCrypt password verification/encoding
    Service-->>Controller: Authentication result
    Controller-->>Browser: ApiResponse + JWT on successful login
    Browser->>Security: Protected request with Authorization: Bearer JWT
    Security->>Controller: Authenticated principal
```

Password hashes are stored with BCrypt. JWT validation is stateless; authorization and user ownership are enforced by the backend.

### Gemini request

```mermaid
sequenceDiagram
    participant Browser as React + Axios
    participant Controller as GeminiAiController
    participant Service as GeminiAiService
    participant Gemini as Google Gemini API
    participant DB as MySQL chat history

    Browser->>Controller: POST /api/v1/ai/chat + Bearer JWT
    Controller->>Service: Authenticated username + validated prompt
    Service->>Gemini: Server-side generate-content request
    Gemini-->>Service: Generated response or provider error
    Service->>DB: Save successful prompt/response
    Service-->>Controller: Reply
    Controller-->>Browser: ApiResponse with reply
```

Gemini API keys are loaded only by Spring Boot. Quota/rate limits are provider-side and are reported as request errors rather than fabricated responses.

## Code boundaries

| Package | Responsibility |
| --- | --- |
| `controller` | Spring MVC routes, HTTP status, request/response orchestration |
| `dto` | Validated API requests and response envelopes |
| `service` | Application rules, authorization ownership checks, external Gemini calls |
| `repository` | Spring Data JPA persistence interfaces |
| `model` | Hibernate/JPA entity mappings |
| `security` | JWT filter, token utilities, and authenticated user details |
| `config` | Spring Security, CORS, and application configuration |

The React app talks only to the versioned Spring REST API. Vite serves the frontend during development and produces static files for production; it is not an application API server.
