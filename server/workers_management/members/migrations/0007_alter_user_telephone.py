# Generated by Django 5.0 on 2023-12-31 00:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0006_alter_user_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='telephone',
            field=models.CharField(max_length=10),
        ),
    ]