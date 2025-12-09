from django.urls import path
from sales.views import TransactionListView

urlpatterns = [
    path('sales/', TransactionListView.as_view(), name='sale-list'),
]
