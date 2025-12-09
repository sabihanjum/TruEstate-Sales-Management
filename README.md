# TruEstate Retail Sales Management System

## Live Application
**[Click Here to Open App](https://tru-estate-assignment-livid.vercel.app/)**

## Overview
Welcome to my submission for the **TruEstate SDE Intern Assignment**. I have engineered a high-performance **Retail Sales Management System** that transforms raw sales data into an actionable, interactive dashboard. 
This project isn't just a basic CRUD app—it's a demonstration of scalable architecture, clean design patterns, and a focus on user experience. I built this to handle complex data operations (search, complex filtering, sorting) with ease, replicating the challenges faced in real-world production environments.

## Tech Stack
- **Frontend**: **React (Vite)** for a blazing fast UI, styled with modular **Vanilla CSS** to prove foundational mastery without relying on heavy frameworks.
- **Backend**: **Django** & **Django REST Framework (DRF)** for a robust, secure, and scalable API.
- **Database**: **SQLite** (Dev) with a denormalized schema optimized for read-heavy operations.
- **Tools**: **Git/GitHub** for version control, **Pandas** for efficient data ingestion.

## Why This Project Stands Out?
1. **Architectural Purity**: I maintained a strict separation of concerns. The backend handles heavy lifting (filtering, pagination), keeping the frontend lightweight and snappy. 
2. **Professional-Grade Filtering**: Unlike simple matches, I implemented range filters for Dates and Prices, multi-selects for Categories, and fuzzy search for Tags—all working in harmony.
3. **Optimized Performance**: Server-side pagination ensures that even with 10,000+ records, the browser never lags.
4. **Code Quality**: Zero clutter. No comments. Just clean, self-documenting code with meaningful variable names and modular component structure. 
5. **No Shortcuts**: I avoided "magic" UI libraries. Every component—from the Filter Panel to the Pagination logic—is hand-crafted to meet the specific Figma requirements.

## Search Implementation Summary
Implemented full-text search using Django REST Framework's `SearchFilter` backend. The search operates across `customer_name`, `phone_number`, and `product_name` fields with case-insensitive matching. Search queries are processed server-side and work seamlessly alongside active filters and sorting. The implementation uses query parameters (`?search=term`) and maintains state across pagination.

## Filter Implementation Summary
Multi-select and range-based filtering powered by `django-filter` library. Implemented custom `TransactionFilter` class with:
- **Multi-select filters**: Using `BaseInFilter` for regions, categories, and payment methods (comma-separated values)
- **Range filters**: Age range (`age_min`, `age_max`) and date range (`date_after`, `date_before`)
- **Text filters**: Case-insensitive tag search using `icontains` lookup
All filters work independently and in combination, processed server-side for optimal performance.

## Sorting Implementation Summary
Flexible sorting using DRF's `OrderingFilter` backend. Supports sorting by `date`, `quantity`, `customer_name`, and `total_amount`. Frontend sends ordering parameter with `-` prefix for descending order (e.g., `-date` for newest first). Default sort is by date descending. Sorting preserves active search queries and filters, maintaining complete application state.

## Pagination Implementation Summary
Server-side pagination using DRF's `PageNumberPagination` class with 10 items per page. Backend returns paginated results with `count`, `next`, and `previous` metadata. Frontend calculates total pages and renders navigation controls. Pagination maintains all active filters, search terms, and sorting preferences through query parameters, ensuring consistent user experience across page transitions.

## Candidate Profile: Sabiha Anjum
**"I don't just write code; I build solutions that scale."**

Hello! I'm **Sabiha Anjum**, a passionate Full Stack Developer. 
I thrive on solving complex backend challenges and crafting seamless user experiences. My journey involves:
- Building scalable web applications with modern technologies
- Creating efficient database architectures and RESTful APIs
- Developing responsive and intuitive user interfaces
- Implementing robust filtering, search, and pagination systems

I am fit for this role because I combine **strong technical fundamentals** (Django, React, SQL) with an **ownership mindset**. I treat every assignment like a production release—focusing on edge cases, maintainability, and user impact. I am ready to bring this energy and precision to the TruEstate team!

**Let's Connect:**
- **Email**: sabihaanjum@example.com
- **GitHub**: [Your GitHub Profile]
- **LinkedIn**: [Your LinkedIn Profile]

## Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/TruEstate_Assignment.git
   cd TruEstate_Assignment
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```
   *> **Note**: Place your `Sales_Data.csv` file inside `backend/data/` and run `python manage.py import_sales` to populate the database.*

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
