# Generated by Django 5.0 on 2024-01-19 19:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0010_user_registered_date_attendance'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendance',
            name='check_in',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='attendance',
            name='check_out',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
