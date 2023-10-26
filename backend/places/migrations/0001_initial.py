# Generated by Django 4.2.6 on 2023-10-18 10:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ItemGroups',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('place_name', models.CharField(max_length=100)),
                ('active', models.BooleanField(default=True)),
                ('tables', models.IntegerField()),
                ('additional_info', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='PlaceItems',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item_name', models.CharField(max_length=100)),
                ('item_price', models.CharField(max_length=100)),
                ('item_picture', models.ImageField(blank=True, null=True, upload_to='uploads/')),
                ('additional_info', models.CharField(max_length=100)),
                ('item_group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='places.itemgroups')),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='places.place')),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('booked_tables', models.IntegerField()),
                ('additional_info', models.CharField(max_length=100)),
                ('active', models.BooleanField(default=True)),
                ('created_time', models.DateTimeField(auto_now_add=True)),
                ('booking_time', models.DateTimeField()),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='places.place')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
