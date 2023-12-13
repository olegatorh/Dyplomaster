from rest_framework import serializers
from .models import Place, Booking, PlaceItems, ItemGroups
import pytz


class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'


class PostBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

    def validate(self, obj):
        if obj['booking_time_start'] >= obj['booking_time_end']:
            raise serializers.ValidationError("time start cannot be greater than time end")
        return obj


class BookingSerializer(serializers.ModelSerializer):
    place_name = serializers.SerializerMethodField()
    booking_time_start = serializers.SerializerMethodField()
    booking_time_end = serializers.SerializerMethodField()
    place_picture = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = '__all__'

    def get_place_name(self, obj):
        return obj.place.place_name

    def get_booking_time_start(self, obj):
        # Convert the booking time to the 'Europe/Kiev' timezone
        kiev_timezone = pytz.timezone('Europe/Kiev')
        booking_time_in_kiev = obj.booking_time_start.astimezone(kiev_timezone)

        # Format the time as a string
        formatted_time = booking_time_in_kiev.strftime('%Y-%m-%d %H:%M:%S')

        return formatted_time

    def get_booking_time_end(self, obj):
        # Convert the booking time to the 'Europe/Kiev' timezone
        kiev_timezone = pytz.timezone('Europe/Kiev')
        booking_time_in_kiev = obj.booking_time_end.astimezone(kiev_timezone)

        # Format the time as a string
        formatted_time = booking_time_in_kiev.strftime('%Y-%m-%d %H:%M:%S')

        return formatted_time

    def get_place_picture(self, obj):
        return f'{obj.place.place_picture}'


class BookingDisableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['active']
class PlaceGroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemGroups
        fields = '__all__'


class PlaceItemsSerializer(serializers.ModelSerializer):
    item_group_name = serializers.CharField(source='item_group.group_name', read_only=True)

    class Meta:
        model = PlaceItems
        fields = ['id', 'item_name', 'item_group', 'item_group_name', 'item_price', 'item_picture', 'additional_info',
                  'place']
