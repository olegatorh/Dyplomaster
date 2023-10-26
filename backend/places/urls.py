from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import bookings_api, places_api, place_items_api

router = DefaultRouter()
# router.register(r'places', PlacesViewSet, basename='place')
# router.register(r'booking', BookingViewSet, basename='booking')
# router.register(r'place_items', BookingViewSet, basename='items')

urlpatterns = [
                  path('bookings/<int:user_id>/', bookings_api, name='bookings_api_with_user_id'),
                  path('bookings/', bookings_api, name='bookings_api_with_user_id'),
                  path('points/<str:place_name>/', places_api, name='filtered_place_api'),
                  path('points/', places_api, name='bookings_api_all'),  # No user_id in URL
                  path('items/<str:place_name>/', place_items_api, name='place_items_api'),  # No user_id in URL

              ] + router.urls
