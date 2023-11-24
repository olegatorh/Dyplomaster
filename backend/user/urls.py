from django.urls import path

from .views import login_api, user_api, register_api, change_user_api, token_refresh_view

urlpatterns = [
    path('login/', login_api),
    path('user/', user_api),
    path('register/', register_api),
    path('change_user/<int:pk>/', change_user_api, name='change_user'),
    path('token-refresh/', token_refresh_view, name='token-refresh')
]
