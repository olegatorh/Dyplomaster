# Generated by Django 4.2.6 on 2023-10-28 13:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('places', '0004_rename_tables_place_seats_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='additional_info',
            field=models.TextField(),
        ),
    ]