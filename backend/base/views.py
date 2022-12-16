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
    UserWithAccessToken,
)

from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

@api_view(['POST'])
def register_user(request):
    data = request.data
    print(data)
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
        message = {"details": "badest request"}
        return Response(message, status= status.HTTP_400_BAD_REQUEST)


api_view(['POST'])
def login_user(request):
    TokenObtainSerializer()
    pass



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    print(user)
    serializer = UserProfileSerializer(user, many=False)
    return Response(serializer.data)

 
@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    users = User.objects.all()
    serializer = UserProfileSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, id):
    product = Product.objects.get(pk=id)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
