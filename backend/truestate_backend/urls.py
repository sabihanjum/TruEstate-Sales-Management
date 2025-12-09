from django.contrib import admin
from django.urls import path, include
from sales.views import api_root

urlpatterns = [
    path('', api_root, name='api-root'),
    path('admin/', admin.site.urls),
    path('api/', include('sales.urls')),
]
