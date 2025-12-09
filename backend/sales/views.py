from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from sales.models import Transaction
from sales.serializers import TransactionSerializer
from sales.filters import TransactionFilter

class TransactionListView(generics.ListAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]
    filterset_class = TransactionFilter
    search_fields = ['customer_name', 'phone_number', 'product_name']
    ordering_fields = ['date', 'quantity', 'customer_name', 'total_amount']
    ordering = ['-date']

