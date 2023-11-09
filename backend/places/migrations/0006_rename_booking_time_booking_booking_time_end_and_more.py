# Generated by Django 4.2.6 on 2023-11-05 14:14

import datetime
from django.db import migrations, models
import places.models


class Migration(migrations.Migration):

    dependencies = [
        ('places', '0005_alter_place_additional_info'),
    ]

    operations = [
        migrations.RenameField(
            model_name='booking',
            old_name='booking_time',
            new_name='booking_time_end',
        ),
        migrations.RenameField(
            model_name='place',
            old_name='item_picture',
            new_name='place_picture',
        ),
        migrations.AddField(
            model_name='booking',
            name='booking_time_start',
            field=models.DateTimeField(default=datetime.datetime(2023, 11, 5, 14, 14, 32, 254755, tzinfo=datetime.timezone.utc), validators=[places.models.start_datetime_validator]),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='place',
            name='map_url',
            field=models.URLField(null=True),
        ),
    ]
