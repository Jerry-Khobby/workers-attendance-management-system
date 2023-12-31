import base64
from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password, check_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        # Hash the password before storing it
        validated_data['password'] = make_password(validated_data['password'])

        # Encode the image data in base64 before storing it
        if 'image' in validated_data and validated_data['image']:
            image_data = validated_data['image'].read()
            encoded_image = base64.b64encode(image_data).decode('utf-8')
            validated_data['image'] = encoded_image
        else:
            #If image is not present or provided or empty 
            validated_data['image']=None
        return super(UserSerializer, self).create(validated_data)

    def validate_password(self, value):
        user = self.instance
        if user and not check_password(value, user.password):
            raise serializers.ValidationError("Incorrect password")
        return value
