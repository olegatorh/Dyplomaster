from django.urls import path

from .views import login_api, user_api, register_api

urlpatterns = [
    path('login/', login_api),
    path('user/', user_api),
    path('register/', register_api)
]
