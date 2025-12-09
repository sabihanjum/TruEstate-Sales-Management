from django.db import models

class Transaction(models.Model):
    customer_id = models.CharField(max_length=50)
    customer_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    gender = models.CharField(max_length=20)
    age = models.IntegerField()
    customer_region = models.CharField(max_length=100)
    customer_type = models.CharField(max_length=50)

    product_id = models.CharField(max_length=50)
    product_name = models.CharField(max_length=255)
    brand = models.CharField(max_length=100)
    product_category = models.CharField(max_length=100)
    tags = models.TextField(help_text="Comma-separated tags")

    quantity = models.IntegerField()
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    final_amount = models.DecimalField(max_digits=12, decimal_places=2)

    date = models.DateField()
    payment_method = models.CharField(max_length=50)
    order_status = models.CharField(max_length=50)
    delivery_type = models.CharField(max_length=50)
    
    store_id = models.CharField(max_length=50)
    store_location = models.CharField(max_length=100)
    salesperson_id = models.CharField(max_length=50)
    employee_name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.product_name} - {self.customer_name}"
