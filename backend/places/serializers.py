from rest_framework import serializers, validators
from .models import Place, Booking, PlaceItems


class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'


class PlaceItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceItems
        fields = '__all__'
