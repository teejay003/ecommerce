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



# User credential by JWT with an Access Token for New Users
class UserWithRefreshToken(UserProfileSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email',
                  "name", "is_admin", 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)



# Product serializer
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


# Shipping Serializer
class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippinAddress
        fields = "__all__"


# Product serializer
class OrderItemSeriailizer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"




# Order serializer
class OrderSerilizer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()
    shipping = serializers.SerializerMethodField()
    user = UserProfileSerializer(many= False)
    class Meta:
        model = Order
        fields = "__all__" 

    def get_order_items(self, obj):
        order_items =  obj.orderItems.all()
        serializer = OrderItemSeriailizer(order_items, many= True)
        return serializer.data

    def get_shipping(self, obj):
        shipping = obj.shipping
        serializer = ShippingSerializer(shipping, many= False)
        return serializer.data
        
