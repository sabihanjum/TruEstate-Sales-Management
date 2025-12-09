from rest_framework import generics, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from sales.models import Transaction
from sales.serializers import TransactionSerializer
from sales.filters import TransactionFilter

@api_view(['GET'])
def api_root(request):
    return Response({
        'message': 'TruEstate Sales Management API',
        'endpoints': {
            'sales': '/api/sales/',
            'admin': '/admin/',
        },
        'status': 'online'
    })

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
