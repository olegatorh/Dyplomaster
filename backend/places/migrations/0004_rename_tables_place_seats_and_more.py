# Generated by Django 4.2.6 on 2023-10-28 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('places', '0003_place_item_picture_alter_booking_place'),
    ]

    operations = [
        migrations.RenameField(
            model_name='place',
            old_name='tables',
            new_name='seats',
        ),
        migrations.AlterField(
            model_name='placeitems',
            name='additional_info',
            field=models.TextField(),
        ),
    ]
