from django.contrib import admin
from .models import Transaction

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer_name', 'product_name', 'amount_display', 'date', 'order_status')
    list_filter = ('order_status', 'date', 'customer_region', 'product_category')
    search_fields = ('customer_name', 'phone_number', 'product_name')
    readonly_fields = ('date',)

    def amount_display(self, obj):
        return f"${obj.total_amount}"
    amount_display.short_description = 'Total Amount'
