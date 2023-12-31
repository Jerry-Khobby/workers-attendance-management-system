from rest_framework import routers
from django.urls import path, include


from .viewset import UserListCreateView,UserRetrieveCardView,UserLoginDetail

app_name='members'

router=routers.DefaultRouter()

router.register(r'users',UserListCreateView,basename='user-list-create')
router.register(r'usercard', UserRetrieveCardView, basename='user-retrieve-card')
router.register(r'userlogin',UserLoginDetail,basename='user-login')



urlpatterns = [
    path('api/', include(router.urls)),
    # Add other URL patterns if needed
]
