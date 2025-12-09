import os
import django
import random
import uuid
from datetime import datetime, timedelta

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'truestate_backend.settings')
django.setup()

from sales.models import Transaction

def generate_data():
    if Transaction.objects.count() > 0:
        print("Data already exists. Skipping generation.")
        return

    regions = ['North', 'South', 'East', 'West']
    categories = ['Electronics', 'Clothing', 'Home & Garden', 'Beauty', 'Automotive']
    payment_methods = ['Credit Card', 'PayPal', 'Debit Card', 'Net Banking']
    statuses = ['Completed', 'Pending', 'Cancelled', 'Returned']
    genders = ['Male', 'Female', 'Other']
    
    transactions = []
    print("Generating 50 transactions...")
    for i in range(50):
        price = round(random.uniform(10.0, 500.0), 2)
        quantity = random.randint(1, 10)
        total = price * quantity
        
        date_obj = datetime.now().date() - timedelta(days=random.randint(0, 60))
        
        transactions.append(Transaction(
            customer_id=str(uuid.uuid4())[:8],
            customer_name=f"Customer {i}",
            phone_number=f"555-01{i:02d}",
            gender=random.choice(genders),
            age=random.randint(18, 70),
            customer_region=random.choice(regions),
            customer_type="Regular",
            product_id=str(uuid.uuid4())[:8],
            product_name=f"Product {random.choice(['A', 'B', 'C'])} - {i}",
            brand="BrandX",
            product_category=random.choice(categories),
            tags="Sale, New" if i % 2 == 0 else "Regular",
            quantity=quantity,
            price_per_unit=price,
            discount_percentage=0.0,
            total_amount=total,
            final_amount=total,
            date=date_obj,
            payment_method=random.choice(payment_methods),
            order_status=random.choice(statuses),
            delivery_type="Standard",
            store_id="ST001",
            store_location="Downtown",
            salesperson_id=f"SP{random.randint(1, 5)}",
            employee_name="John Doe"
        ))

    Transaction.objects.bulk_create(transactions)
    print(f"Successfully created {len(transactions)} transactions!")

if __name__ == '__main__':
    generate_data()
