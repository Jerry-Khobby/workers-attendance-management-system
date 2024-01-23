from rest_framework import viewsets
from .models import User,Attendance
from .serializers import UserSerializer,AttendanceSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.db.utils import IntegrityError
from django.contrib.auth.hashers import make_password,check_password
from rest_framework.authentication import TokenAuthentication
from rest_framework import permissions
from django.shortcuts import get_object_or_404
from datetime import datetime,time


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
        encoded_image = request.data.get('image',None)
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
        encoded_image=None
        if user.image:
            encoded_image=user.image
        user_info = {
            'Id_number': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'date_of_birth': user.date_of_birth,
            'decoded_image': encoded_image,
        }

        return Response(user_info, status=status.HTTP_200_OK)

class UserLoginDetail(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'])
    def login_user(self, request):
        email=request.data.get('email')
        password=request.data.get('password')
        user_id=request.data.get('user_id')
        if not email or not password or not user_id:
            return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
    #check if the a user with the the provided email,password and user ID exists 
        try:
            #I have to get the user by grabbing his email and Id at once and check if it is available 
            user=User.objects.get(id=user_id,email=email)
            # I will have to check the password, since I initially hashed pr make hash it , I will have to dehash it using the check method 
            if check_password(password,user.password):
                return Response({'status': 'Successfully logged in'}, status=status.HTTP_200_OK)
            else:
                return Response({'error':'Incorrect password'},status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            # User with the provided email and ID does not exist
            return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)



class CheckInViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    @action(detail=False, methods=['post'])
    def check_in(self, request):
        # Extract user_id from request data
        user_id = request.data.get('user_id')

        # Check if user_id is provided
        if not user_id:
            return Response({'error': 'User ID is required for check-in'}, status=status.HTTP_400_BAD_REQUEST)

        # Get the user using the user_id
        user = get_object_or_404(User, id=user_id)

        # Check if the user has already checked in today
        today = datetime.now().date()
        existing_attendance = Attendance.objects.filter(
            user=user,
            check_in__date=today
        ).first()

        if existing_attendance:
            return Response({'message': 'User already checked in'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            # Save the check-in time with date
            check_in_datetime = datetime.now()
            Attendance.objects.create(user=user, check_in=check_in_datetime)

            return Response({'status': 'Check-in successful'}, status=status.HTTP_200_OK)


#Writing the logic for the checkout
class CheckOutViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    @action(detail=False, methods=['post'])
    def check_out(self, request):
        # First, grab the user_id from the form filled
        user_id = request.data.get('user_id')
        # Check if the user id is provided
        if not user_id:
            return Response({'error': 'User ID is required for check-out'}, status=status.HTTP_400_BAD_REQUEST)

        # Search through the database to find the user
        user = get_object_or_404(User, id=user_id)
        # Check if the user has already checked in today
        today = datetime.now().date()
        existing_attendance = Attendance.objects.filter(
            user=user,
            check_in__date=today
        ).first()

        # If the user has not yet checked in
        if not existing_attendance:
            return Response({'message': 'User has not checked in today and cannot check-out unless checked in'},
                            status=status.HTTP_401_UNAUTHORIZED)

        # Check if the user has already checked out
        checked_out_already = Attendance.objects.filter(
            user=user,
            check_out__date=today
        )
        if checked_out_already:
            return Response({'message': 'User has already checked out today'}, status=status.HTTP_402_PAYMENT_REQUIRED)

        # Grab the time
        current_time = datetime.now().time()
        checkout_time_limit = time(4, 0)  # 4:00 PM

        # If the current time is before 4:00 PM, do not allow checkout
        print(current_time)
        print(checkout_time_limit)
        if current_time < checkout_time_limit:
            return Response({'message': 'Checkout is only allowed after 4:00 PM'}, status=status.HTTP_403_FORBIDDEN)

        # If the current time is 4:00 PM or later, proceed with checkout logic
        check_out_datetime = datetime.now()
        existing_attendance.check_out = check_out_datetime
        existing_attendance.save()

        return Response({'status': 'Check-out successful'}, status=status.HTTP_200_OK)
    
# the next viewset is the one that will produce the workers attendance record 

class WorkersAttendanceSheet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    @action(detail=False,methods=['post'])
    def attendance_sheet(self,request):
        #first grab the user's id from the form 
        user_id=request.data.get('user_id')
        # Check if the user id is provided
        if not user_id:
            return Response({'error': 'User ID is required for check-out'}, status=status.HTTP_400_BAD_REQUEST)
        # Search through the database to find the user
        user = get_object_or_404(User, id=user_id)
        #once the user enters his ID I want to present the user with his attendance sheet 
        attendance_sheet=Attendance.objects.filter(user=user)
        #serialize the attendance records 
        serializer=AttendanceSerializer(attendance_sheet,many=True)
        response_data = {
            'user_id': user.id,
            'user_name': f'{user.first_name} {user.last_name}',
            'attendance_records': serializer.data,
        }
        #the way to get the value of the of the response_data is to use the attendance record in the square bracket 
        #the way to loop through this attendance record on a react frontend is to catch the data on the frontend using your fetch and then 
        #using the data.attendance_record to get the data and using the map function to map through 
        
        return Response(response_data, status=status.HTTP_200_OK)
         
               
        
        
    
     
        
        



