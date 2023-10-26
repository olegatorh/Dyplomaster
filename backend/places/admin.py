from django.contrib import admin


# Register your models here.
from .models import Place, Booking, ItemGroups, PlaceItems

# admin.site.register(Place, Booking)
admin.site.register(ItemGroups)
admin.site.register(Place)
admin.site.register(Booking)
admin.site.register(PlaceItems)

