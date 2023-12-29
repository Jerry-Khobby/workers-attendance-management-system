from rest_framework import routers
from django.urls import path, include
from rest_framework.routers import DefaultRouter


from .viewset import UserListCreateView

app_name='members'

router=DefaultRouter()

router.register(r'users',UserListCreateView,basename='user-list-create')

