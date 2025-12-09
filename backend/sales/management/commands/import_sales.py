from django.core.management.base import BaseCommand
import pandas as pd
from sales.models import Transaction
from datetime import datetime

class Command(BaseCommand):
    help = 'Import sales data from CSV'

    def handle(self, *args, **kwargs):
        file_path = 'backend/data/Sales_Data.csv'
        try:
            df = pd.read_csv(file_path)
            transactions = []
            for _, row in df.iterrows():
                try:
                    date_obj = pd.to_datetime(row['Date']).date()
                except:
                    continue
                
                transactions.append(Transaction(
                    customer_id=row['Customer ID'],
                    customer_name=row['Customer Name'],
                    phone_number=str(row['Phone Number']),
                    gender=row['Gender'],
                    age=row['Age'],
                    customer_region=row['Customer Region'],
                    customer_type=row['Customer Type'],
                    product_id=row['Product ID'],
                    product_name=row['Product Name'],
                    brand=row['Brand'],
                    product_category=row['Product Category'],
                    tags=row['Tags'],
                    quantity=row['Quantity'],
                    price_per_unit=row['Price per Unit'],
                    discount_percentage=row['Discount Percentage'],
                    total_amount=row['Total Amount'],
                    final_amount=row['Final Amount'],
                    date=date_obj,
                    payment_method=row['Payment Method'],
                    order_status=row['Order Status'],
                    delivery_type=row['Delivery Type'],
                    store_id=row['Store ID'],
                    store_location=row['Store Location'],
                    salesperson_id=row['Salesperson ID'],
                    employee_name=row['Employee Name']
                ))
            
            Transaction.objects.bulk_create(transactions)
            self.stdout.write(self.style.SUCCESS(f'Successfully imported {len(transactions)} transactions'))
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'File not found: {file_path}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error: {str(e)}'))
