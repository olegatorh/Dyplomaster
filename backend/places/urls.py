from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import bookings_api, places_api, place_items_api, create_booking, disable_booking, check_current_seats

router = DefaultRouter()
# router.register(r'places', PlacesViewSet, basename='place')
# router.register(r'booking', BookingViewSet, basename='booking')
# router.register(r'place_items', BookingViewSet, basename='items')

urlpatterns = [
                  path('bookings/<int:user_id>/', bookings_api, name='bookings_api_with_user_id'),
                  path('bookings/', bookings_api, name='bookings_api_with_user_id'),
                  path('bookings/create_booking/', create_booking, name='create_booking_api'),
                  path('bookings/disable_booking/', disable_booking, name='disable_booking_api'),
                  path('points/<str:place_name>/', places_api, name='filtered_place_api'),
                  path('available_seats/', check_current_seats, name='check_current_seats'),
                  path('points/', places_api, name='bookings_api_all'),  # No user_id in URL
                  path('items/<str:place_name>/', place_items_api, name='place_items_api'),  # No user_id in URL

              ] + router.urls
