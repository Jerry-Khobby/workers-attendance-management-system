from rest_framework import routers


from .viewset import UserListCreateView

app_name='members'

router=routers.SimpleRouter()

router.register(r'users',UserListCreateView)

