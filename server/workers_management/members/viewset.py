from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.db.utils import IntegrityError
from django.contrib.auth.hashers import make_password
import base64
from rest_framework.authentication import TokenAuthentication
from rest_framework import permissions


class UserListCreateView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'])
    def action_post(self, request):
        # Check if the email already exists
        email_exists = User.objects.filter(email=request.data.get('email')).exists()
        if email_exists:
            return Response({'error': 'Email already exists, please try logging in'}, status=status.HTTP_401_UNAUTHORIZED)

        # Hash the password using make_password
        password = request.data.get('password')
        hashed_password = make_password(password)

        # Optionally hash the image using base64 encoding
        encoded_image = None
        if 'image' in request.data and request.data['image']:
            image_data = request.data['image'].read()
            encoded_image = base64.b64encode(image_data).decode('utf-8')

        # Create a user instance with hashed password and image
        user = User.objects.create(
            first_name=request.data.get('first_name'),
            last_name=request.data.get('last_name'),
            email=request.data.get('email'),
            password=hashed_password,
            telephone=request.data.get('telephone'),
            image=encoded_image,
            age=request.data.get('age'),
            previous_experience=request.data.get('previous_experience'),
            date_of_birth=request.data.get('date_of_birth'),
            place_of_stay=request.data.get('place_of_stay'),
        )

        try:
            # Save the user instance
            user.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

        except IntegrityError as e:
            if 'unique constraint' in str(e).lower():
                return Response({'error': 'User with the same email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'An error occurred while processing your request.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
