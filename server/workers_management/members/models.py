from django.db import models
from django.utils.crypto import get_random_string

class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    telephone = models.CharField(max_length=15)
    password = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/')
    date_of_birth = models.DateField()
    age = models.PositiveIntegerField()
    place_of_stay = models.CharField(max_length=255)
    previous_experience = models.TextField()
    id = models.IntegerField(primary_key=True, unique=True)




    def save(self, *args, **kwargs):
        # You can generate a random 10-digit number for id here if needed
        if not self.id:
             self.id = int(get_random_string(10, '0123456789'))
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
