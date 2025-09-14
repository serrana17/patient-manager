# Patient Management System - Light IT Challenge

A modern React application for patient data management with bilingual interface (English/Spanish), complete functionality, and professional design.

## Main Features

### Patient Management
- **Patient Visualization**: Displays patients in elegant cards with summarized information
- **Detail Expansion**: Each card can be expanded to show complete information
- **Real-time Search**: Filters patients by name or description
- **Edit Modal**: Allows adding new patients and editing existing ones
- **Form Validation**: Robust validation with clear error messages
- **Notifications**: Animated notification system for success and errors
- **Deletion Confirmation**: Custom dialog for deletion confirmation

### Internationalization (i18n)
- **Bilingual Support**: English (default) and Spanish
- **Dynamic Switching**: Button to change language in real-time
- **Automatic Detection**: Detects browser language
- **Persistence**: Saves user preference in localStorage
- **Localized Dates**: Date format according to selected language

### Design and UX
- **Responsive Design**: Optimized for mobile and desktop devices
- **Smooth Animations**: Transitions and animations for better experience
- **Custom Theme**: Consistent colors and styles
- **Accessibility**: Adequate contrast and keyboard navigation

## Technologies Used

### Frontend Core
- **React 19** - Main framework with modern hooks
- **TypeScript** - Static typing for greater robustness
- **Vite** - Fast build tool

### Styles and UI
- **TailwindCSS 4** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **CSS Custom Properties** - Custom CSS variables

### Forms and Validation
- **React Hook Form** - Efficient form handling
- **Yup** - Schema validation with translated messages
- **@hookform/resolvers** - Integration between React Hook Form and Yup

### Internationalization
- **react-i18next** - Internationalization framework for React
- **i18next** - Main i18n library
- **i18next-browser-languagedetector** - Automatic language detection

### HTTP and APIs
- **Axios** - HTTP client with error handling
- **MockAPI** - External API for patient data

## Installation and Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd light-it-challenge
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run in Development Mode
```bash
npm run dev
```

### 4. Open in Browser
```
http://localhost:5173
```

## Production Build

```bash
npm run build
```

Production files will be generated in the `dist/` folder.

## Project Structure

```
src/
├── components/              # React Components
│   ├── Avatar.tsx          # Avatar component with SVG fallback
│   ├── ConfirmDialog.tsx   # Custom confirmation dialog
│   ├── LanguageSwitcher.tsx # Language selector
│   ├── Notification.tsx    # Animated notification system
│   ├── PatientCard.tsx     # Individual patient card
│   ├── PatientModal.tsx    # Modal for adding/editing patients
│   └── PatientManager.tsx  # Main management component
├── hooks/                  # Custom hooks
│   └── useTranslation.ts   # Translation hook
├── i18n/                   # Internationalization configuration
│   ├── index.ts           # Main i18n configuration
│   └── locales/           # Translation files
│       ├── en.json        # English translations
│       └── es.json        # Spanish translations
├── services/              # API services
│   └── patientService.ts  # Service for handling patient API
├── types/                 # TypeScript type definitions
│   └── patient.ts         # Patient-related types
├── utils/                 # Utilities
│   ├── helpers.ts        # Helper functions (date formatting, avatars)
│   └── validation.ts     # Validation schemas with translations
├── App.tsx               # Root component
├── main.tsx              # Entry point with i18n configuration
└── index.css             # Global styles with TailwindCSS
```

## Internationalization System

The application supports both English and Spanish languages with automatic detection and persistence of user preferences.

### Configuration
- **Automatic Detection**: Detects browser language
- **Fallback**: English as default language
- **Persistence**: Saves preference in localStorage
- **Dynamic Switching**: No page reload required

### Translation Structure
```json
{
  "app": {
    "title": "Patient Management System",
    "loading": "Loading...",
    "search": "Search"
  },
  "patient": {
    "title": "Patients",
    "addNew": "Add New Patient",
    "editPatient": "Edit Patient"
  },
  "validation": {
    "nameRequired": "Name is required",
    "nameMinLength": "Name must be at least 2 characters"
  }
}
```

### Usage in Components
```typescript
import { useTranslation } from '../hooks/useTranslation';

const MyComponent = () => {
  const { t, currentLanguage, changeLanguage } = useTranslation();
  
  return (
    <div>
      <h1>{t('app.title')}</h1>
      <button onClick={() => changeLanguage('es')}>
        {t('language.switchTo')}
      </button>
    </div>
  );
};
```

## Design Decisions

### Architecture
- **Functional Components**: Use of React hooks for state management
- **Separation of Concerns**: Services, components, and utilities separated
- **Strong Typing**: TypeScript to prevent errors at development time
- **Custom Hooks**: Encapsulation of reusable logic

### UI/UX
- **Clean Design**: Minimalist interface with soft colors
- **Accessibility**: Adequate contrast and keyboard navigation
- **Responsive Design**: Adaptable to different screen sizes
- **Visual Feedback**: Animations and loading states
- **Consistency**: Uniform color system and spacing

### Validation
- **Real-time Validation**: Errors shown while user types
- **Reusable Schemas**: Centralized validation with Yup
- **Translated Messages**: Descriptive errors in both languages
- **Dynamic Validation**: Schemas that adapt to current language

## API and Services

### MockAPI Integration
- **Base URL**: `https://63bedcf7f5cfc0949b634fc8.mockapi.io/users`
- **Endpoints**:
  - `GET /` - Get all patients (ordered by creation date)
  - `GET /:id` - Get patient by ID
  - `POST /` - Create new patient
  - `PUT /:id` - Update patient
  - `DELETE /:id` - Delete patient

### Patient Service
```typescript
// Example service usage
import { patientService } from './services/patientService';

// Get patients
const patients = await patientService.getPatients();

// Create patient
const newPatient = await patientService.createPatient(patientData);

// Update patient
const updatedPatient = await patientService.updatePatient(id, patientData);

// Delete patient
await patientService.deletePatient(id);
```

## Available Scripts

- `npm run dev` - Development server with HMR
- `npm run build` - Optimized production build
- `npm run preview` - Preview of the build
- `npm run lint` - Run ESLint

## Implemented Features

### Main Requirements
- Get patient list from API
- Display patients in individual cards
- Button to expand/collapse details
- Modal for adding and editing patients
- Form validation
- Success/error notifications
- Responsive and interactive design

### Additional Features
- Real-time search
- Smooth animations and transitions
- Loading states with spinners
- Custom deletion confirmation
- Robust error handling
- Modern and professional design
- Avatar system with SVG fallback
- Sorting by creation date

### Internationalization
- Complete support for English and Spanish
- Real-time language switching
- Automatic browser language detection
- Language preference persistence
- Localized dates according to language
- Translated validations
- Variable interpolation in translations

## Technical Features

### TypeScript
- **Static Typing**: Error prevention at development time
- **Interfaces**: Clear definitions for patient data
- **Union Types**: Handling of optional fields and variants

### TailwindCSS 4
- **Modern Configuration**: Use of new TailwindCSS 4 syntax
- **CSS Variables**: Custom colors with CSS custom properties
- **Reusable Components**: Utility classes for buttons and forms
- **Responsive Design**: Mobile-first breakpoints

### React Hook Form
- **Performance**: Efficient validation without unnecessary re-renders
- **Integrated Validation**: Yup schemas with translated messages
- **Error Handling**: Clear and accessible error states

### Internationalization
- **react-i18next**: Robust framework for i18n
- **Automatic Detection**: Browser language detected automatically
- **Interpolation**: Dynamic variables in translations
- **Namespaces**: Clear organization of translations by functionality

## Error Handling

### API Errors
- **Retry Logic**: Automatic retries for failed requests
- **Error Boundaries**: React error capture
- **User Feedback**: Clear error notifications

### Validation Errors
- **Real-time**: Validation while user types
- **Clear Messages**: Descriptive and translated error messages
- **Field-level**: Specific errors per field

### Network Issues
- **Offline Handling**: Handling of offline states
- **Loading States**: Loading indicators during requests
- **Fallback UI**: Backup interfaces for errors

## License

This project is part of the Light IT Challenge and is intended solely for technical evaluation purposes.