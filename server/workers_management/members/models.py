from django.db import models
import random
import string
from django.utils import timezone



# Function to generate random 10-digit ID
def generate_random_id():
    return ''.join(random.choices(string.digits, k=10))

class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True,null=False)
    telephone = models.CharField(max_length=10)
    password = models.CharField(max_length=128)
    image = models.TextField(blank=True,null=True)
    date_of_birth = models.DateField()
    age = models.PositiveIntegerField()
    place_of_stay = models.CharField(max_length=255)
    previous_experience = models.TextField()
    id = models.CharField(primary_key=True, unique=True, default=generate_random_id, max_length=10)
    registered_date=models.DateField(auto_now_add=True)

    def save(self, *args, **kwargs):
        
        if not self.id:
            self.registered_date=timezone.now().date()
        # Generate a new ID before saving
        if not self.id:
            self.id = generate_random_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    

class Attendance(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    check_in=models.DateTimeField(null=True,blank=True)
    check_out=models.DateTimeField(null=True, blank=True)
    
    
    def __str__(self):
        return f"Attendance for {self.user.first_name}"
    
    