from rest_framework import routers
from django.urls import path, include


from .viewset import UserListCreateView

app_name='members'

router=routers.DefaultRouter()

router.register(r'users',UserListCreateView,basename='user-list-create')



urlpatterns = [
    path('api/', include(router.urls)),
    # Add other URL patterns if needed
]
