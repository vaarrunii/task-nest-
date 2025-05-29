from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('planner.urls')),  # 👈 this includes the actual task routes
]
