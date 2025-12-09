# Backend - TruEstate Sales Management System

## Overview
Django REST Framework backend providing RESTful APIs for sales data management with advanced filtering, search, sorting, and pagination capabilities.

## Tech Stack
- **Framework**: Django 6.0 + Django REST Framework 3.16
- **Database**: SQLite (Development)
- **Key Libraries**:
  - `django-filter` - Advanced filtering
  - `django-cors-headers` - CORS support
  - `pandas` - Data import utilities

## Project Structure
```
backend/
├── sales/                      # Main Django app
│   ├── management/
│   │   └── commands/          # Custom management commands
│   ├── migrations/            # Database migrations
│   ├── models.py              # Transaction data model
│   ├── serializers.py         # DRF serializers
│   ├── views.py               # API views
│   ├── filters.py             # Custom filter classes
│   └── urls.py                # API routes
├── truestate_backend/         # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py                  # Django management script
└── requirements.txt           # Python dependencies
```

## API Endpoints

### GET `/api/sales/`
Retrieve paginated sales transactions with optional filtering, search, and sorting.

**Query Parameters:**
- `search` - Search by customer name or phone number
- `customer_region` - Filter by region (comma-separated for multiple)
- `gender` - Filter by gender
- `age_min`, `age_max` - Age range filter
- `product_category` - Filter by category (comma-separated)
- `tags` - Filter by product tags
- `payment_method` - Filter by payment method (comma-separated)
- `date_after`, `date_before` - Date range filter (YYYY-MM-DD)
- `ordering` - Sort field (prefix with `-` for descending)
- `page` - Page number for pagination

**Example:**
```
GET /api/sales/?search=John&customer_region=North,South&ordering=-date&page=1
```

## Setup Instructions

1. **Create Virtual Environment:**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   source venv/bin/activate  # Mac/Linux
   ```

2. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run Migrations:**
   ```bash
   python manage.py migrate
   ```

4. **Generate Mock Data:**
   ```bash
   python manage.py generate_mock_data
   ```

5. **Start Development Server:**
   ```bash
   python manage.py runserver
   ```

Server will run at `http://127.0.0.1:8000/`

## Key Features

### 1. Advanced Filtering
- Multi-select filters using `BaseInFilter` for regions, categories, payment methods
- Range filters for age and date
- Case-insensitive tag search
- All filters work independently and in combination

### 2. Full-Text Search
- Searches across customer name, phone number, and product name
- Case-insensitive matching
- Works alongside filters and sorting

### 3. Flexible Sorting
- Sort by date, quantity, customer name, or total amount
- Ascending/descending order support
- Maintains active filters and search state

### 4. Pagination
- Server-side pagination (10 items per page)
- Efficient query performance for large datasets
- Returns total count for frontend pagination controls

## Data Model

### Transaction Model
Stores all sales transaction data with the following fields:

**Customer Information:**
- customer_id, customer_name, phone_number
- gender, age, customer_region, customer_type

**Product Information:**
- product_id, product_name, brand
- product_category, tags

**Transaction Details:**
- quantity, price_per_unit, discount_percentage
- total_amount, final_amount
- date, payment_method, order_status, delivery_type

**Store Information:**
- store_id, store_location
- salesperson_id, employee_name

## Development Notes

- CORS is enabled for all origins (development only)
- SQLite database for simplicity and portability
- Custom management command for generating test data
- RESTful API design following Django best practices
