# CareMate — Agentic AI Nurse

## Abstract

CareMate is a frontend prototype for an agentic chronic-care management and remote patient-monitoring platform. It is designed to connect patients and clinicians through a shared health workspace where patients can record vital signs, track medications, review appointments, receive health alerts, and communicate with an AI nurse assistant, while doctors can monitor patient risk, inspect recent vitals, write clinical notes, and initiate patient conversations.

The project demonstrates the product experience and interaction model of an AI-assisted healthcare portal. It uses React, TypeScript, Vite, Tailwind CSS, Recharts, and the React Context API. The current implementation is intentionally self-contained: demo data is stored in source files, application state is held in memory, and authentication is simulated with a browser-generated JWT-like token stored in `localStorage`. No production backend, database, external AI model, telehealth service, or EHR integration is currently connected.

> **Important:** This is a demonstration/prototype application. It is not suitable for storing real patient information or providing real medical advice without substantial security, clinical-safety, compliance, backend, and infrastructure work.

## 1. Project Overview

CareMate addresses a common chronic-care problem: patients often need to monitor multiple health signals while clinicians need a concise way to identify abnormal readings and prioritize follow-up. The interface models a continuous-care workflow rather than a one-time appointment workflow.

The application supports two primary user roles:

- **Patients** monitor their own health information, log vitals, track prescriptions, book consultations, and ask the AI nurse questions.
- **Doctors/clinicians** inspect a patient roster, filter patients by risk, review current measurements, write notes, and move into patient chat.

The product experience is organized around five connected care activities:

1. **Observe** — collect blood pressure, glucose, heart rate, SpO2, temperature, symptoms, and notes.
2. **Interpret** — classify new readings as normal, warning, or critical and produce simulated AI guidance.
3. **Alert** — create health alerts for abnormal blood pressure and glucose readings.
4. **Coordinate** — manage medications, appointments, and physician notes.
5. **Communicate** — provide an AI nurse chat and a doctor-chat-style interface.

## 2. Product Goals

The prototype is intended to demonstrate:

- A modern chronic-care dashboard
- Role-specific patient and doctor portals
- Vital-sign trend visualization
- Early detection of abnormal readings
- Medication adherence tracking
- Appointment coordination
- AI-assisted health guidance
- A printable patient health report
- A visually consistent healthcare design system

## 3. System Architecture

### 3.1 Current architecture

The current application is a single-page client-side React application:

```text
Browser
  |
  v
React + TypeScript application
  |
  ├── AuthContext
  │     └── Browser-generated JWT-like session token
  |
  ├── HealthContext
  │     └── In-memory patients, vitals, medications, appointments,
  │         alerts, and chat messages
  |
  ├── Pages
  │     ├── Patient dashboard
  │     ├── Doctor dashboard
  │     ├── Vitals analytics
  │     ├── Medications
  │     ├── Appointments
  │     ├── Chat
  │     └── Settings
  |
  └── Reusable components
        ├── Navbar
        ├── Sidebar
        └── Action modals
```

There is currently no server-side application. The browser is responsible for rendering the UI, managing state, generating demo tokens, running threshold checks, and simulating AI responses.

### 3.2 Application bootstrap

The runtime begins in `src/main.tsx`:

1. React creates a root from the `#root` element in `index.html`.
2. `App` is rendered inside `StrictMode`.
3. `src/index.css` loads Tailwind layers and global styles.
4. `App` creates the `AuthProvider` and `HealthProvider`.
5. `AppContent` selects the current page based on authentication, role, and the active tab.

### 3.3 Application shell

`src/App.tsx` is the main composition point. It provides:

- Authentication context
- Health-data context
- Global navbar
- Role-aware sidebar
- Active page content
- Global vitals, health-report, and appointment modals

The application uses manual tab-based navigation. Although `react-router-dom` is installed, the current code does not define a router or URL-based route configuration.

## 4. Main User Workflow

### 4.1 Startup workflow

1. The browser loads `index.html`.
2. Vite serves the React entry point.
3. `AuthContext` checks `localStorage` for `caremate_jwt_token`.
4. If no valid token exists, a default Robert Vance patient session is generated.
5. `HealthContext` initializes its collections from `src/data/mockData.ts`.
6. The patient dashboard is shown by default.

### 4.2 Authentication workflow

`src/pages/AuthPage.tsx` supports login, signup, and demo access.

#### Login

1. The user selects Patient or Doctor.
2. The user submits an email and password.
3. The password is collected but is not validated by a server.
4. `AuthContext.login()` selects a demo patient or doctor identity.
5. `generateToken()` creates a browser-side token-like string.
6. The token is stored in React state and `localStorage`.
7. The user is redirected into the main portal.

#### Signup

1. The user enters identity and optional patient information.
2. `AuthContext.signup()` creates a new in-memory user.
3. A token is generated for that user.
4. The new user becomes the active session.

#### Demo users

- Patient: Robert Vance
- Doctor: Dr. Sarah Jenkins

### 4.3 Patient workflow

```text
Patient opens dashboard
        |
        ├── Reviews latest vitals and seven-day trends
        ├── Marks medication as taken
        ├── Logs new vitals
        │     ├── Reading is classified
        │     ├── Alerts may be generated
        │     └── AI response is simulated
        ├── Books an appointment
        ├── Opens a printable report
        └── Chats with the AI nurse
```

### 4.4 Doctor workflow

```text
Doctor opens command center
        |
        ├── Views total patient count
        ├── Views active alerts
        ├── Searches patients by name or condition
        ├── Filters by stable, attention, or critical risk
        ├── Selects a patient
        ├── Reviews current vitals
        ├── Updates physician notes
        └── Opens patient chat
```

## 5. Vitals and Triage Workflow

The vitals form is implemented in `src/components/VitalsFormModal.tsx`.

The user can enter:

- Systolic blood pressure
- Diastolic blood pressure
- Blood glucose
- Heart rate
- SpO2
- Temperature
- Optional symptoms or notes

The form assigns a status using local threshold rules:

```text
Warning:
  systolic >= 140
  diastolic >= 90
  glucose >= 160
  SpO2 < 95

Critical:
  systolic >= 160
  diastolic >= 100
  glucose >= 220
  SpO2 < 90
```

When the form is submitted:

1. A `VitalRecord` is created with a timestamp and generated ID.
2. The record is prepended to `vitalsHistory`.
3. High blood pressure may create a `High Blood Pressure` alert.
4. High glucose may create an `Elevated Glucose` alert.
5. A delayed AI nurse response is added to the chat history.
6. The modal closes.

The state logic is implemented in `HealthContext.addVitalRecord()`.

## 6. AI Nurse Workflow

The AI nurse interface is implemented in `src/pages/ChatPage.tsx` and the response logic is in `HealthContext.sendChatMessage()`.

The interface supports:

- AI Nurse tab
- Doctor Chat tab
- Quick prompts
- Message history
- Recommended actions
- Automatic scrolling to the newest message

The current AI behavior is a simulation based on keyword matching. The code checks for terms such as:

- `bp`
- `blood pressure`
- `headache`
- `sugar`
- `glucose`
- `diabetes`
- `doctor`
- `appointment`

The application then returns predefined responses after a short delay. There is no external language model, retrieval pipeline, prompt orchestration service, clinical knowledge base, or tool-calling system in the current repository.

## 7. Health Alerts

Alerts are represented by the `HealthAlert` interface in `src/types/index.ts`.

Supported alert categories include:

- High Blood Pressure
- Elevated Glucose
- Low SpO2
- Missed Medication
- Symptom Flag

Alerts have four severity levels:

- Low
- Medium
- High
- Critical

`Navbar.tsx` displays unread alerts in a notification dropdown. Selecting an alert marks it as read. `clearAllAlerts()` marks all alerts as read but does not delete them.

## 8. Feature Modules

### Patient Dashboard

File: `src/pages/PatientDashboard.tsx`

Provides:

- Welcome banner
- AI-agent status
- Blood-pressure summary
- Glucose summary
- Heart-rate summary
- SpO2 summary
- Seven-day Recharts visualization
- Medication adherence percentage
- Upcoming appointments
- AI consultation shortcut

### Doctor Dashboard

File: `src/pages/DoctorDashboard.tsx`

Provides:

- Patient roster
- Risk-level filters
- Search by name or diagnosis
- Patient detail view
- Current vitals breakdown
- Physician notes editor
- Static AI risk-analysis card
- Direct-chat navigation

### Vitals Analytics

File: `src/pages/VitalsPage.tsx`

Provides:

- Blood-pressure line chart
- Glucose bar chart
- Heart-rate line chart
- Historical vitals table
- Status labels
- Notes and timestamps

### Medications

File: `src/pages/MedicationsPage.tsx`

Provides:

- Medication cards
- Mark-as-taken behavior
- Add-medication form
- Dosage and frequency information
- Instructions
- Refill countdown

### Appointments

Files: `src/pages/AppointmentsPage.tsx` and `src/components/AppointmentModal.tsx`

Provides:

- Appointment list
- Doctor selection
- Date selection
- Time selection
- Consultation type
- Notes
- Booking confirmation

The visible appointment page uses custom cards. FullCalendar packages are installed but are not used by the current page implementation.

### Health Report

File: `src/components/HealthReportModal.tsx`

Generates a browser-rendered report containing:

- Patient information
- Seven-day average blood pressure
- Average glucose
- Latest SpO2 and heart rate
- Active prescriptions
- Medication adherence
- AI assessment summary

The report can be printed using `window.print()`.

### Settings

File: `src/pages/SettingsPage.tsx`

Displays:

- User profile
- Role and email
- Chronic condition
- Age and gender
- Primary physician
- Emergency phone
- Alert preference checkboxes

The current settings controls are presentational and are not persisted.

## 9. Repository Structure

```text
.bolt/
  config.json              Bolt Vite React TypeScript template metadata
  prompt                   UI and design-generation guidance

src/
  App.tsx                  Application shell and view selection
  main.tsx                 React bootstrap entry point
  index.css                Tailwind layers and global styles

  components/
    Navbar.tsx             Header, role switcher, alerts, profile actions
    Sidebar.tsx            Role-specific navigation
    VitalsFormModal.tsx    New vitals form and threshold classification
    HealthReportModal.tsx  Printable health report
    AppointmentModal.tsx   Appointment booking form

  context/
    AuthContext.tsx        Session state and role management
    HealthContext.tsx      Shared clinical application state

  data/
    mockData.ts             Demo patients and health records

  pages/
    LandingPage.tsx         Product landing page
    AuthPage.tsx             Login, registration, and demo access
    PatientDashboard.tsx    Patient overview
    DoctorDashboard.tsx     Doctor triage workspace
    VitalsPage.tsx           Vital trends and history
    MedicationsPage.tsx      Medication adherence
    AppointmentsPage.tsx    Appointment list
    ChatPage.tsx             AI nurse and doctor chat UI
    SettingsPage.tsx         Profile and preferences

  types/
    index.ts                Domain interfaces and union types

  utils/
    jwt.ts                  JWT-like token generation and decoding

package.json                Scripts and dependencies
vite.config.ts              Vite React configuration
tailwind.config.js          Custom Tailwind theme
postcss.config.js           Tailwind/PostCSS pipeline
tsconfig*.json               TypeScript project configuration
eslint.config.js            ESLint configuration
index.html                  HTML document shell
```

## 10. Technology Stack

### Frontend

- React 18.3.1
- TypeScript 5.5.3
- Vite 5.4.2
- React DOM

### State and interaction

- React Context API
- React hooks such as `useState`, `useEffect`, and `useContext`
- Manual active-tab navigation

### UI and styling

- Tailwind CSS 3.4.1
- PostCSS
- Autoprefixer
- Inter font from Google Fonts
- Lucide React icons

### Data visualization and scheduling

- Recharts for charts
- FullCalendar dependencies are installed for potential calendar functionality
- `date-fns` is installed for date utilities

### Quality tooling

- ESLint
- TypeScript strict mode
- React Hooks linting
- React Refresh linting

## 11. Data Model

The central interfaces are declared in `src/types/index.ts`.

### User

Represents a patient, doctor, or guest account.

### Patient

Represents a monitored patient and includes demographics, condition, current readings, risk level, assigned doctor, and notes.

### VitalRecord

Represents one timestamped health measurement containing blood pressure, glucose, heart rate, SpO2, temperature, status, and notes.

### Medication

Represents a medication, dosage, frequency, schedule, adherence state, instructions, and refill duration.

### Appointment

Represents a consultation with a doctor, date, time, type, status, and notes.

### ChatMessage

Represents a user, AI, or doctor message with optional category and recommended action.

### HealthAlert

Represents an alert associated with a patient and includes type, severity, timestamp, read state, and message.

### CarePlan

A `CarePlan` type exists, but it is not currently integrated into the application workflow.

## 12. Authentication and Security Notes

The authentication implementation is located in `src/utils/jwt.ts` and `src/context/AuthContext.tsx`.

The application creates a token-like value containing:

- Header
- Base64URL-encoded payload
- Base64URL-encoded signature-like string

The token contains user identity and expiration claims. The token is stored in `localStorage` under:

```text
caremate_jwt_token
```

The implementation is not production authentication because:

- Passwords are not validated.
- Tokens are generated by the client.
- The signature is not a real HMAC signature.
- Signature verification is not performed.
- User records are not server-side.
- There is no authorization middleware.
- There is no refresh-token flow.
- Sensitive health information is handled in browser state.

The labels `JWT Secured` and `HIPAA Compliant Data Encryption Active` are product-demo labels, not evidence of implemented security or compliance controls.

## 13. Persistence and Backend Status

The current application does not include a backend or database.

### Persisted

- Authentication token in `localStorage`

### Not persisted

- Vitals
- Medications
- Appointments
- Chat messages
- Alerts
- Doctor notes
- Settings preferences

Refreshing the page resets health data to the mock values in `src/data/mockData.ts`.

## 14. Design System

The visual system is configured in `tailwind.config.js`.

It defines:

- Primary blue colors
- Secondary green colors
- Accent orange colors
- Success teal colors
- Warning yellow colors
- Error red colors
- Neutral gray colors
- Inter font family
- Custom font sizes
- Soft and card shadows
- Fade-in, slide-up, and pulse animations

`src/index.css` adds:

- Tailwind base, component, and utility layers
- Glassmorphism panels
- Gradient text
- Gradient backgrounds
- Custom scrollbar styling
- Global background and text colors

## 15. How to Run

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

No environment variables or API keys are currently required.

## 16. Strengths

- Clear organization into pages, components, contexts, data, types, and utilities
- Strong TypeScript domain definitions
- Good separation of patient and doctor workflows
- Consistent and polished Tailwind-based visual design
- Useful charts for chronic-care trends
- Centralized health state through `HealthContext`
- Reusable modal workflows
- Demonstration of threshold-based health alerts
- Demo data that makes triage states easy to inspect
- Responsive layouts for common desktop and mobile widths

## 17. Limitations and Production Gaps

### Backend

The project needs a backend API, database, authorization layer, audit logging, and persistent data storage.

### Authentication

The simulated browser-side JWT implementation must be replaced with server-issued, cryptographically signed tokens and real credential validation.

### Clinical safety

The AI nurse currently returns fixed text based on keywords. A production system would require clinician-reviewed protocols, explainable outputs, escalation rules, human oversight, and robust handling of emergencies.

### Data privacy

Real healthcare data would require encryption, access controls, audit trails, consent management, secure storage, retention policies, and a formal compliance program.

### Integrations

The project currently lacks:

- Real AI model integration
- EHR/FHIR integration
- Telehealth provider integration
- Email or SMS notification service
- Wearable or medical-device ingestion
- Push notifications
- Real calendar synchronization

### Incomplete UI behavior

- Appointment join and reschedule buttons do not perform backend actions.
- Settings checkboxes are not persisted.
- FullCalendar is installed but not rendered.
- `react-router-dom` is installed but not configured.
- `CarePlan` is defined but not used.
- Vitals and chat data reset after a refresh.
- Some patient and doctor values are hard-coded to demo identities.

## 18. Recommended Production Architecture

A production version could use the following architecture:

```text
React/Vite frontend
        |
        | HTTPS / WebSocket
        v
Backend API gateway
        |
        ├── Authentication and authorization service
        ├── Patient and provider service
        ├── Vitals ingestion service
        ├── Alert and triage service
        ├── Medication service
        ├── Appointment service
        ├── AI orchestration service
        └── Audit and compliance service
                |
                ├── PostgreSQL or compliant clinical database
                ├── Redis or message queue for alerts
                ├── AI model provider
                ├── Notification provider
                ├── Telehealth provider
                └── EHR/FHIR integration
```

A safer clinical workflow would be:

```text
Patient submits vitals or symptoms
        |
        v
Validate and normalize the input
        |
        v
Store an immutable clinical event
        |
        v
Run deterministic threshold checks
        |
        ├── Normal -> educational feedback
        ├── Warning -> notify patient and care team
        └── Critical -> escalation protocol and human review
```

The AI should assist with summarization, education, and prioritization while remaining inside clinically approved boundaries. It should not independently make emergency treatment decisions.

## 19. Overall Assessment

CareMate is a polished and visually complete frontend demonstration of an agentic chronic-care product. It successfully communicates the intended user experience: patients can monitor their health and communicate with an AI nurse, while clinicians can review patient risk and care notes.

The repository should currently be classified as a **prototype or product-demo frontend** rather than a deployable healthcare platform. Its next major development step is to introduce a secure backend with persistent data, real authentication, clinically governed AI workflows, auditability, integrations, automated tests, and operational monitoring.

## 20. Follow-up Development Questions

- How should `AuthContext` be replaced with secure server-side authentication?
- What database schema should support patients, vitals, alerts, medications, appointments, care plans, and audit events?
- How should the simulated AI nurse in `HealthContext.sendChatMessage()` be replaced with a safe, tool-enabled AI service?
