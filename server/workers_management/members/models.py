from django.db import models
import random




# Function to generate random 10-digit ID
def generate_random_id():
    return random.randint(1000000000, 9999999999)  

# Get the current ID value
current_id = generate_random_id()

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
    id = models.IntegerField(primary_key=True, unique=True,default=current_id)




    def __str__(self):
        return f"{self.first_name} {self.last_name}"
