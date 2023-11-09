from datetime import datetime

from knox.auth import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Place, Booking, PlaceItems
from .serializers import PlaceSerializer, BookingSerializer, PlaceItemsSerializer, PostBookingSerializer
from rest_framework import status
from django.utils import timezone
import pytz
from rest_framework.exceptions import ValidationError


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def bookings_api(request, user_id=None):
    if user_id:
        filtered_bookings = Booking.objects.filter(user_id=user_id).order_by('booking_time_end')
        serializer = BookingSerializer(filtered_bookings, many=True)
        current_date_time = timezone.localtime(timezone.now())
        print(current_date_time)
        for i in filtered_bookings:
            if i.booking_time_end < current_date_time:
                i.active = False
                i.save()
    else:
        current_date_time = timezone.localtime(timezone.now())
        print(current_date_time)
        filtered_bookings_for_today = Booking.objects.filter(booking_time_end__date=current_date_time, active=True)
        bookings_now = []
        for i in filtered_bookings_for_today:
            if i.booking_time_start <= current_date_time <= i.booking_time_end:
                bookings_now.append(i)
            if i.booking_time_end < current_date_time:
                i.active = False
                i.save()
        serializer = BookingSerializer(bookings_now, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_booking(request):
    print(request.data)
    if request.method == 'POST':

        # Convert the string to a datetime object and make it timezone-aware
        iso_datetime_str = request.data['booking_time_start']
        iso_datetime = datetime.fromisoformat(iso_datetime_str.replace('Z', ''))
        iso_datetime = iso_datetime.replace(tzinfo=timezone.utc)  # Assuming it's in UTC, adjust accordingly

        filtered_bookings = Booking.objects.filter(
            place=request.data['place'],
            active=True,
            booking_time_start__date=iso_datetime.date()
        )
        place_seats = Place.objects.filter(id=request.data['place']).values('seats').first()
        people_number = int(request.data['people_number'])
        for i in filtered_bookings:
            if i.booking_time_start < iso_datetime < i.booking_time_end:
                people_number += i.people_number  # Access the attribute directly, not through subscripting
        print('people_number', people_number)
        print('place_seats', place_seats['seats'])
        if people_number > place_seats['seats']:
            raise ValidationError('Not enough seats available.')

        serializer = PostBookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def check_current_seats(request):
    if request.method == 'POST':
        print(request.data)
        original_datetime = datetime.fromisoformat(request.data['date_time'][:-1])
        original_datetime_utc = pytz.utc.localize(original_datetime)
        print('original', original_datetime_utc)
        filtered_objects = Booking.objects.filter(booking_time_start__date=original_datetime_utc, active=True,
                                                  place=request.data['place'])
        filtered_bookings = []
        for i in filtered_objects:
            if i.booking_time_start < original_datetime_utc < i.booking_time_end:
                print(i.place, i.booking_time_start, i.booking_time_end)
                filtered_bookings.append(i)
        print('filtered', filtered_bookings)
        serializer = BookingSerializer(filtered_bookings, many=True)
        seats_taked = 0
        for i in serializer.data:
            seats_taked += i['people_number']
        return Response({'seats_taked': seats_taked})


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def places_api(request, place_name=None):
    if place_name:
        print('name', place_name)
        place_name = place_name
        filtered_places = Place.objects.filter(place_name__iregex=place_name)
        serializer = PlaceSerializer(filtered_places, many=True)
    else:
        not_filtered_places = Place.objects.all()
        serializer = PlaceSerializer(not_filtered_places, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def place_items_api(request, place_name):
    filtered_items = PlaceItems.objects.filter(place=place_name)
    serializer = PlaceItemsSerializer(filtered_items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def disable_booking(request):
    if request.method == 'POST':
        booking_id = request.data.get('booking_id')  # Assuming you send the booking_id in the request data
        try:
            booking = Booking.objects.get(id=booking_id)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)
        booking.active = False
        booking.save()
        return Response({"message": "Booking is now disabled"}, status=status.HTTP_200_OK)
