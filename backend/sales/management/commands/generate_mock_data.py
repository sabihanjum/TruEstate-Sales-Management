from django.core.management.base import BaseCommand
from sales.models import Transaction
import random
from datetime import datetime, timedelta
import uuid

class Command(BaseCommand):
    help = 'Generate fake sales data'

    def handle(self, *args, **kwargs):
        regions = ['North', 'South', 'East', 'West']
        categories = ['Electronics', 'Clothing', 'Home & Garden', 'Beauty', 'Automotive']
        payment_methods = ['Credit Card', 'PayPal', 'Debit Card', 'Net Banking']
        statuses = ['Completed', 'Pending', 'Cancelled', 'Returned']
        genders = ['Male', 'Female', 'Other']

        transactions = []
        for i in range(50):
            price = round(random.uniform(10.0, 500.0), 2)
            quantity = random.randint(1, 10)
            total = price * quantity
            
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
                date=datetime.now().date() - timedelta(days=random.randint(0, 60)),
                payment_method=random.choice(payment_methods),
                order_status=random.choice(statuses),
                delivery_type="Standard",
                store_id="ST001",
                store_location="Downtown",
                salesperson_id=f"SP{random.randint(1, 5)}",
                employee_name="John Doe"
            ))

        for transaction in transactions:
            transaction.save()
        self.stdout.write(self.style.SUCCESS(f'Successfully created {len(transactions)} fake transactions'))
