# Generated by Django 5.0 on 2024-01-06 00:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0008_alter_user_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.TextField(blank=True, null=True),
        ),
    ]