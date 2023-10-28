from rest_framework import viewsets
from knox.auth import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Place, Booking, PlaceItems
from .serializers import PlaceSerializer, BookingSerializer, PlaceItemsSerializer
from rest_framework import status


# # Create your views here.
# class PlacesViewSet(viewsets.ReadOnlyModelViewSet):
#     serializer_class = PlaceSerializer
#
#     def get_queryset(self):
#         queryset = Place.objects.all()
#
#         return queryset
#
#
# # Create your views here.
# class BookingViewSet(viewsets.ModelViewSet):
#     serializer_class = BookingSerializer
#
#     def get_queryset(self):
#         queryset = Booking.objects.filter()
#
#         return queryset
#
#
# # Create your views here.
# class PlaceItemsViewSet(viewsets.ModelViewSet):
#     serializer_class = PlaceItemsSerializer
#
#     def get_queryset(self):
#         queryset = PlaceItems.objects.all()
#
#         return queryset


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def bookings_api(request, user_id=None):
    if user_id:
        filtered_bookings = Booking.objects.filter(user_id=user_id)
        serializer = BookingSerializer(filtered_bookings, many=True)
    else:
        not_filtered_bookings = Booking.objects.all()
        serializer = BookingSerializer(not_filtered_bookings, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_booking(request):
    if request.method == 'POST':
        print(request.data)
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def places_api(request, place_name=None):
    if place_name:
        filtered_places = Place.objects.filter(place_name__icontains=place_name)
        serializer = PlaceSerializer(filtered_places, many=True)
    else:
        not_filtered_places = Place.objects.all()
        serializer = PlaceSerializer(not_filtered_places, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def place_items_api(request, place_name):
    print(place_name)
    filtered_items = PlaceItems.objects.filter(place=place_name)
    serializer = PlaceItemsSerializer(filtered_items, many=True)
    return Response(serializer.data)
