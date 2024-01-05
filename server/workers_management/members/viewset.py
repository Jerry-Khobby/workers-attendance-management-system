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
from django.shortcuts import get_object_or_404
from django.core.files.base import ContentFile
import binascii
import imghdr  # Added for detecting image format


class UserListCreateView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'])
    def action_post(self, request):
        # Check if the email already exists
        email_exists = User.objects.filter(email__iexact=request.data.get('email')).exists()
        if email_exists:
            return Response({'error': 'Email already exists, please try logging in'}, status=status.HTTP_400_BAD_REQUEST)


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
            


class UserRetrieveCardView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def retrieve_card_info(self, request):
        email = request.query_params.get('email')

        if not email:
            return Response({'error': 'Email parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(User, email__iexact=email)
        user_serializer = UserSerializer(user)
        raw_image_form = user_serializer.data['image'].replace("/media/", "")
        decode_image_form = None

        if raw_image_form:
            try:
                raw_image_form.replace("/n", "")
                image_64_decode = base64.b64decode(raw_image_form).decode('utf-8')
                decode_image_form = image_64_decode
                print(decode_image_form)
                
            except binascii.Error as e:
                return Response({'error': f'Error decoding base64: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        user_info = {
            'Id_number': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'date_of_birth': user.date_of_birth,
            'decoded_image': decode_image_form,
        }

        return Response(user_info, status=status.HTTP_200_OK)

           




