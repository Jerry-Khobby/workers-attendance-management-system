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
    def create_user(self, request):
        serializer = UserSerializer(data=request.data)
        email=User.objects.filter(email=request.data['email'])
        password=User.objects.filter(password=request.data['password'])
        _id=User.objects.filter(id=request.data['id'])
        images=User.objects.filter(image=request.data['image'])
        first_name=User.objects.filter(first_name=request.data['first_name'])
        last_name=User.objects.filter(last_name=request.data['last_name'])
        age=User.objects.filter(age=request.data['age'])
        previous_experience=User.objects.filter(previous_experience=request.data['previous_experience'])
        place_of_stay=User.objects.filter(place_of_stay=request.data['place_of_stay'])
        date_of_birth=User.objects.filter(date_of_birth=request.data['date_of_birth'])
        telephone=User.objects.filter(telephone=request.data['telephone'])
        #I want to harsh the password 
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        hashed_password=password

        # Optionally hash the image using hashlib
        if 'image' in request.data:
            hashed_image = hashlib.sha256(request.data['image'].encode('utf-8')).hexdigest()
            images=hashed_image

        serializer = UserSerializer(data=request.data)


        try:
            if email.exists():
                return Response({'error':'Email already exists, please try loggin'},status=status.HTTP_401_UNAUTHORIZED)
            elif _id.exists():
                return Response({'error':'There is an ID of this sort already present'},status=status.HTTP_402_PAYMENT_REQUIRED)
            else:
                #I want to create a user over here 
                user=User.objects.create({
                    first_name,
                    last_name,
                    email,
                    hashed_password,
                    telephone,
                    images,
                    age,
                    previous_experience,
                    date_of_birth,
                    place_of_stay,
                })
                #now create and save the user 
                print("The user has been created")
                return Response(UserSerializer(user).data,status=status.HTTP_201_CREATED)




        except IntegrityError as e:
            if 'unique constraint' in str(e).lower():
                return Response({'error': 'User with the same email or id already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'An error occurred while processing your request.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        



        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



"""  if User.objects.filter(email=request.data['email']).exist(): """