import django_filters
from sales.models import Transaction

class TransactionFilter(django_filters.FilterSet):
    customer_region = django_filters.BaseInFilter(field_name='customer_region')
    product_category = django_filters.BaseInFilter(field_name='product_category')
    payment_method = django_filters.BaseInFilter(field_name='payment_method')
    tags = django_filters.CharFilter(lookup_expr='icontains')
    
    # Date Range
    date_after = django_filters.DateFilter(field_name='date', lookup_expr='gte')
    date_before = django_filters.DateFilter(field_name='date', lookup_expr='lte')
    
    # Age Range
    age_min = django_filters.NumberFilter(field_name='age', lookup_expr='gte')
    age_max = django_filters.NumberFilter(field_name='age', lookup_expr='lte')

    class Meta:
        model = Transaction
        fields = ['gender', 'order_status', 'delivery_type']
