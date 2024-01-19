from rest_framework import serializers
from .models import User,Attendance
from django.contrib.auth.hashers import make_password, check_password

class UserSerializer(serializers.ModelSerializer):
    image = serializers.CharField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        # Hash the password before storing it
        validated_data['password'] = make_password(validated_data['password'])

        # Check if 'image' key exists in validated_data and is not None
        if 'image' in validated_data and validated_data['image'] is not None:
            # Process the image data if provided
            image_data = validated_data['image']
            # You can perform additional processing here if needed
        else:
            # If image is not present or provided or empty 
            validated_data.pop('image', None)

        return super(UserSerializer, self).create(validated_data)

    def validate_password(self, value):
        user = self.instance
        if user and not check_password(value, user.password):
            raise serializers.ValidationError("Incorrect password")
        return value



#creating the seralization for the attendance 
class Attendance(serializers.ModelSerializer):
    class Meta :
        model=Attendance
        fields='__all__'
