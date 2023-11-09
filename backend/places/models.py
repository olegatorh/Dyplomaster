from django.utils import timezone
from django.db import models
from user.models import MyUser
from django.core.exceptions import ValidationError


def start_datetime_validator(booking_time_start):
    if booking_time_start and booking_time_start < timezone.localtime(timezone.now()):
        raise ValidationError("Date and time must be in the future.")


class Place(models.Model):
    place_name = models.CharField(max_length=100)
    active = models.BooleanField(default=True)
    seats = models.IntegerField()
    additional_info = models.TextField()
    place_picture = models.ImageField(upload_to='places/', blank=True, null=True)
    map_url = models.URLField(null=True)

    def __str__(self):
        return self.place_name


class Booking(models.Model):
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='bookings')
    people_number = models.IntegerField()
    additional_info = models.CharField(max_length=100)
    active = models.BooleanField(default=True)
    created_time = models.DateTimeField(auto_now_add=True)
    booking_time_start = models.DateTimeField(validators=[start_datetime_validator], )
    booking_time_end = models.DateTimeField()
    user = models.ForeignKey(MyUser, on_delete=models.SET_NULL, null=True)

    def clean(self):
        if self.booking_time_end <= self.booking_time_start:
            raise ValidationError("End time must be greater than the start time.")
        super(Booking, self).clean()
    

    def __str__(self):
        return f"Booking for {self.place.place_name}"


class ItemGroups(models.Model):
    group_name = models.CharField(max_length=100)
    place = models.ForeignKey(Place, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.group_name

    class Meta:
        verbose_name = 'Item group'
        verbose_name_plural = 'Item groups'


class PlaceItems(models.Model):
    item_name = models.CharField(max_length=100)
    item_group = models.ForeignKey(ItemGroups, on_delete=models.CASCADE)
    item_price = models.CharField(max_length=100)
    item_picture = models.ImageField(upload_to='uploads/', blank=True, null=True)
    additional_info = models.TextField()
    place = models.ForeignKey(Place, on_delete=models.CASCADE, to_field='id')

    def __str__(self):
        return self.item_name

    class Meta:
        verbose_name = 'Place item'
        verbose_name_plural = 'Place items'
