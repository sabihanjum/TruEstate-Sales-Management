# Architecture Documentation

## Overview
The TruEstate Retail Sales Management System is built using a modern decoupled architecture with clear separation between frontend and backend. The frontend is developed in React (Vite) for fast development and optimal performance, while the backend is powered by Django REST Framework for robust API services. This architecture ensures maintainability, scalability, and clean separation of concerns.

## Backend Architecture

### Technology Stack
- **Framework**: Django 6.0 + Django REST Framework 3.16
- **Database**: SQLite (Development)
- **Key Libraries**: django-filter, django-cors-headers, pandas

### Architecture Pattern
The backend follows a layered architecture pattern:

1. **API Layer** (`views.py`)
   - `TransactionListView`: Generic list view handling GET requests
   - Integrates DRF filter backends for search, filtering, and ordering
   - Returns paginated JSON responses

2. **Data Layer** (`models.py`)
   - `Transaction` model: Single denormalized table for optimal read performance
   - Contains all customer, product, transaction, and store fields
   - Indexed for efficient querying

3. **Serialization Layer** (`serializers.py`)
   - `TransactionSerializer`: Converts model instances to JSON
   - Handles all field transformations and validations

4. **Filter Layer** (`filters.py`)
   - `TransactionFilter`: Custom filter class using django-filter
   - Implements multi-select filters (BaseInFilter)
   - Implements range filters for age and date
   - Supports case-insensitive tag search

### API Design
RESTful API following Django REST Framework conventions:
- **Endpoint**: `GET /api/sales/`
- **Query Parameters**: search, filters, ordering, page
- **Response Format**: JSON with pagination metadata
- **Status Codes**: 200 (success), 400 (bad request), 500 (server error)

### Database Schema
Single `Transaction` table with 24 fields organized into logical groups:
- Customer fields (7): ID, name, phone, gender, age, region, type
- Product fields (5): ID, name, brand, category, tags
- Transaction fields (7): quantity, prices, discounts, amounts, date
- Operational fields (5): payment, status, delivery, store, employee

## Frontend Architecture

### Technology Stack
- **Framework**: React 19.2 with Vite 7.2
- **Routing**: React Router DOM 7.10
- **HTTP Client**: Axios 1.13
- **Styling**: Vanilla CSS (modular approach)
- **Icons**: Lucide React

### Architecture Pattern
The frontend follows a component-based architecture with custom hooks for state management:

1. **Component Layer** (`src/components/`)
   - `Header`: Application branding and title
   - `SearchBar`: Search input with debouncing
   - `FilterPanel`: Multi-select and range filters
   - `TransactionTable`: Data grid with sorting
   - `Pagination`: Page navigation controls

2. **Hook Layer** (`src/hooks/`)
   - `useSales`: Custom hook managing API calls and state
   - Handles loading, error, and data states
   - Constructs query parameters from filters

3. **Service Layer** (`src/services/`)
   - `api.js`: Axios instance with base configuration
   - Centralized API endpoint definitions
   - Error handling and response transformation

4. **State Management**
   - Local component state using `useState`
   - Centralized data fetching in `useSales` hook
   - Props drilling for filter and sort state
   - No external state management library needed

### Component Hierarchy
```
App
├── Header
├── FilterPanel
│   ├── Date Range Inputs
│   ├── Multi-select Dropdowns
│   └── Age Range Inputs
└── Main Content
    ├── SearchBar
    ├── TransactionTable
    │   ├── Table Header (with sort controls)
    │   └── Table Rows
    └── Pagination
```

## Data Flow

### Request Flow
1. User interacts with UI (search, filter, sort, or paginate)
2. React state updates in `App.jsx`
3. State change triggers `useSales` hook re-execution
4. Hook constructs query parameters from current state
5. Axios sends GET request to Django API
6. Django processes request through filter backends
7. Database query executed with filters, search, and ordering
8. Results serialized and paginated
9. JSON response returned to frontend
10. Hook updates data state
11. React re-renders components with new data

### State Management Flow
```
User Action → Component State → useSales Hook → API Call → Response → State Update → UI Re-render
```

### Error Handling Flow
- Frontend: Try-catch in useSales hook, error state displayed in UI
- Backend: DRF exception handling, appropriate HTTP status codes
- Network errors: Caught by Axios interceptors

## Folder Structure

```
root/
├── backend/
│   ├── sales/                          # Django app
│   │   ├── management/
│   │   │   └── commands/              # Custom commands
│   │   │       └── generate_mock_data.py
│   │   ├── migrations/                # Database migrations
│   │   ├── models.py                  # Transaction model
│   │   ├── serializers.py             # DRF serializers
│   │   ├── views.py                   # API views
│   │   ├── filters.py                 # Filter classes
│   │   ├── urls.py                    # App routes
│   │   └── tests.py                   # Unit tests
│   ├── truestate_backend/             # Project config
│   │   ├── settings.py                # Django settings
│   │   ├── urls.py                    # Root URL config
│   │   └── wsgi.py                    # WSGI application
│   ├── manage.py                      # Django CLI
│   ├── requirements.txt               # Python dependencies
│   └── README.md                      # Backend documentation
│
├── frontend/
│   ├── src/
│   │   ├── components/                # React components
│   │   │   ├── Header.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── FilterPanel.jsx
│   │   │   ├── TransactionTable.jsx
│   │   │   └── Pagination.jsx
│   │   ├── hooks/                     # Custom hooks
│   │   │   └── useSales.js
│   │   ├── services/                  # API services
│   │   │   └── api.js
│   │   ├── assets/                    # Static assets
│   │   ├── App.jsx                    # Root component
│   │   ├── main.jsx                   # Entry point
│   │   └── index.css                  # Global styles
│   ├── public/                        # Public assets
│   ├── package.json                   # Node dependencies
│   ├── vite.config.js                 # Vite configuration
│   └── README.md                      # Frontend documentation
│
├── docs/
│   └── architecture.md                # This file
│
└── README.md                          # Project documentation
```

## Module Responsibilities

### Backend Modules

**sales/models.py**
- Defines Transaction model with all required fields
- Provides database schema and ORM interface
- Implements `__str__` method for admin interface

**sales/serializers.py**
- Converts Transaction model instances to JSON
- Handles field-level validation
- Manages nested data structures if needed

**sales/views.py**
- Implements TransactionListView API endpoint
- Configures filter, search, and ordering backends
- Manages pagination settings

**sales/filters.py**
- Defines TransactionFilter with custom filter logic
- Implements multi-select filters using BaseInFilter
- Implements range filters for age and date
- Provides tag search functionality

**sales/urls.py**
- Maps URL patterns to views
- Defines API endpoint structure

**truestate_backend/settings.py**
- Django project configuration
- Database settings
- CORS configuration
- REST framework settings
- Installed apps and middleware

### Frontend Modules

**App.jsx**
- Root component managing application state
- Coordinates child components
- Handles state updates from user interactions
- Passes props to child components

**components/Header.jsx**
- Displays application branding
- Shows developer name and title
- Provides visual identity

**components/SearchBar.jsx**
- Renders search input field
- Handles user input
- Triggers search callback on change

**components/FilterPanel.jsx**
- Renders all filter controls
- Manages filter state
- Provides multi-select dropdowns
- Implements date and age range inputs
- Triggers filter callback on change

**components/TransactionTable.jsx**
- Displays transaction data in table format
- Implements sortable column headers
- Handles sort callback
- Renders transaction rows

**components/Pagination.jsx**
- Renders page navigation controls
- Displays current page information
- Handles page change callback
- Manages next/previous buttons

**hooks/useSales.js**
- Custom hook for data fetching
- Manages loading, error, and data states
- Constructs API query parameters
- Handles API calls with Axios
- Returns data and metadata

**services/api.js**
- Configures Axios instance
- Sets base URL for API
- Provides centralized API client
- Handles request/response interceptors

## Performance Considerations

### Backend Optimizations
- Server-side filtering reduces data transfer
- Pagination limits response size
- Database indexing on frequently queried fields
- Denormalized schema for read optimization

### Frontend Optimizations
- Component-level rendering optimization
- Debouncing on search input (if implemented)
- Lazy loading of data through pagination
- Minimal re-renders through proper state management

## Security Considerations

### Backend
- CORS configured for development (should be restricted in production)
- Django's built-in SQL injection protection
- Input validation through DRF serializers
- CSRF protection enabled

### Frontend
- No sensitive data stored in client
- API calls over HTTPS (in production)
- Input sanitization before display
- No inline JavaScript execution

## Scalability Path

### Backend Scaling
- Switch to PostgreSQL for production
- Add database indexing for performance
- Implement caching layer (Redis)
- Add API rate limiting
- Deploy with Gunicorn + Nginx

### Frontend Scaling
- Implement code splitting
- Add service worker for offline support
- Optimize bundle size
- Implement virtual scrolling for large datasets
- Add CDN for static assets

This architecture provides a solid foundation for current requirements while allowing for future enhancements and scaling.
