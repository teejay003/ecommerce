from pyexpat import model
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from .models import *


# User credentials by Json web token(JWT)
class UserProfileSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', "name", 'is_admin']

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name

    def get_is_admin(self, obj):
        is_admin = obj.is_staff

        return is_admin

# User credential by JWT with a refresh Token for New Users
class UserWithRefreshToken(UserProfileSerializer):
    refresh_token = serializers.SerializerMethodField(read_only=True)

    class Meta:
      model = User
      fields = ['id', 'username', 'email', "name", "is_admin", 'refresh_token']

    def get_refresh_token(self, obj):
        refresh_token = RefreshToken.for_user(obj)
        return str(refresh_token)

# User credential by JWT with a access Token for Login Users
class UserWithAccessToken(UserProfileSerializer):
    access_token = serializers.SerializerMethodField(read_only=True)

    class Meta:
      model = User
      fields = ['id', 'username', 'email', "name", "is_admin" ,'access_token']

    def get_refresh_token(self, obj):
        access_token = AccessToken.for_user(obj)
        return str(access_token)

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
