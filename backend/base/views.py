from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from .models import (
    Product,
)
from .serializers import (
    ProductSerializer,
    UserProfileSerializer,
    UserWithRefreshToken,
)

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# CREATE USER
@api_view(['POST'])
def register_user(request):
    print(request.data['username'])
    data = request.data

    # Check if username alredy taken
    users = User.objects.all()
    usernames = []
    for each_user in users:
        usernames.append(each_user.username.lower())

    if (data['username'] in usernames):
        message = {'userExist': True,
                   'message': f"The username \"{data['username']}\" has been taken."}
        return Response(message)

    # Register User
    try:
        user = User.objects.create(
            first_name=data['name'],
            email=data['email'],
            username=data['username'],
            password=make_password(data['password'])
        )

        serializer = UserWithRefreshToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {"details": "bad request"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# GET TOKEN FOR USER/ LOGIN USER
class MyTokenObtainSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserProfileSerializer(self.user, many=False).data
        for key, value in serializer.items():
            data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainSerializer


# GET SINGLE USER PROFILE
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    print(user)
    serializer = UserProfileSerializer(user, many=False)
    return Response(serializer.data)

# UPDATE  USER PROFILE


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    data = request.data

    # Check if username alredy taken
    users = User.objects.all()
    usernames = []
    for each_user in users:
        usernames.append(each_user.username.lower())

    if ((data['username'] == user.username) or (data['username'] not in usernames)):
        user.first_name = data['name']
        user.username = data['username']
        user.email = data['email']

        if (data['password'] != ''):
            user.password = make_password(data['password'])
        user.save()
    else:
        message = {'userExist': True,'message': f"The username \"{data['username']}\" has been taken."}
        return Response(message)

    serializer = UserWithRefreshToken(user, many=False)
    return Response(serializer.data)

# GET ALL USER PROFILE


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    users = User.objects.all()
    serializer = UserProfileSerializer(users, many=True)
    return Response(serializer.data)

# GET ALL PRODUCTS


@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# GET SINGLE PRODUCT
@api_view(['GET'])
def get_product(request, id):
    product = Product.objects.get(pk=id)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
