from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status 
from rest_framework.decorators import action
from django.db.utils import IntegrityError
import bcrypt
import hashlib

class UserListCreateView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['post'])
    def action_post(self, request):
        # Check if the email already exists
        print("create_user method is called.")
        email_exists = User.objects.filter(email=request.data.get('email')).exists()
        if email_exists:
            return Response({'error': 'Email already exists, please try logging in'}, status=status.HTTP_401_UNAUTHORIZED)
        
        password = request.data.get('password')
        print("Original Password:", password)

        # Hash the password using bcrypt
        password = request.data.get('password')
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        print("Hashed Password:", hashed_password)

        # Optionally hash the image using hashlib
        if 'image' in request.data:
            hashed_image = hashlib.sha256(request.data['image'].encode('utf-8')).hexdigest()
        else:
            hashed_image = None

        # Create a user instance with hashed password and image
        user = User.objects.create(
            first_name=request.data.get('first_name'),
            last_name=request.data.get('last_name'),
            email=request.data.get('email'),
            password=hashed_password,
            telephone=request.data.get('telephone'),
            image=hashed_image,
            age=request.data.get('age'),
            previous_experience=request.data.get('previous_experience'),
            date_of_birth=request.data.get('date_of_birth'),
            place_of_stay=request.data.get('place_of_stay'),
        )

        try:
            # Save the user instance
            user.save()
            print("The user has been created")
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

        except IntegrityError as e:
            if 'unique constraint' in str(e).lower():
                return Response({'error': 'User with the same email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'An error occurred while processing your request.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
