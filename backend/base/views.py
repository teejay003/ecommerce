from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.db.models import Q
from .models import (
    Order,
    OrderItem,
    Product,
    ShippinAddress,
)
from .serializers import (
    OrderSerilizer,
    ProductSerializer,
    UserProfileSerializer,
    UserWithRefreshToken,
)
from django.core.paginator import Paginator, EmptyPage,  PageNotAnInteger

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.models import CHOICES


def index(requsest):
    return render(requsest, 'index.html')

# CREATE USER
@api_view(['POST'])
def register_user(request):
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
        message = {'userExist': True,
                   'message': f"The username \"{data['username']}\" has been taken."}
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


# DELETE USER
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_user(request, id):
    user = User.objects.get(pk=id)
    user.delete()
    users = User.objects.all()
    serializer = UserProfileSerializer(users, many=True)
    return Response(serializer.data)


# EDIT USER
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def edit_user(request, id):
    pass


# CREATE PRODUCT
@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request):
    data = request.data
    Product.objects.create(
        name=data['name'],
        brand=data['brand'],
        image=data['image'],
        category=data['category'],
        count_in_stock=data['stock'],
        description=data['description'],
        price=data['price']
    )
    products = Product.objects.all().order_by('-created_date')
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)



# GET ALL PRODUCTS
@api_view(['GET'])
def get_products(request):
    products = Product.objects.all().order_by('-created_date')
    serializer = ProductSerializer(products, many=True)
   
    category =[]
    for item in CHOICES:
       category.append(item[0])
    
    return Response({'products': serializer.data, 'categories': category})


# GET SINGLE PRODUCT
@api_view(['GET'])
def get_product(request, id):
    product = Product.objects.get(pk=id)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


# DELETE SINGLE PRODUCT
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request, id):
    product = Product.objects.get(pk=id)
    product.delete()
    products = Product.objects.all().order_by('-created_date')
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# UPDATE SINGLE PRODUCT
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_product(request, id):
    product = Product.objects.get(pk=id)

    data = request.data
    image = data['image']

    # Check if image is a file or path
    is_path = isinstance(image, str)
    if (not is_path):
        product.image = data['image']

    product.name = data['name']
    product.brand = data['brand']
    product.category = data['category']
    product.price = data['price']
    product.count_in_stock = data['stock']
    product.description = data['description']
    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


# PLACE ORDER
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):
    user = request.user
    data = request.data

    shipping = data['order']['checkout']['shipping']
    payment_method = data['order']['checkout']['paymentMethod']
    total_price = data['order']['totalPrice']
    cart_items = data['order']['cartItems']

    # Creating Order
    order = Order.objects.create(
        user=user,
        payment_method=payment_method,
        shipping_price=10,
        total_price=total_price,
        tax_price=0.08
    )

    # Creating Order items
    for item in cart_items:
        OrderItem.objects.create(
            product=Product.objects.get(id=item['id']),
            order=order,
            name=item['name'],
            quantity=item['quantity'],
            price=item['price'],
            image=item['image']

        )

    # Creating Shipping Address
    ShippinAddress.objects.create(
        order=order,
        address=shipping['address'],
        city=shipping['city'],
        country=shipping['country'],
        postal_code=shipping['postalCode'],
        shipping_price=10
    )

    serializer = OrderSerilizer(order, many=False)
    return Response(serializer.data)

# GET ORDER


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_order(request, id):
    order = Order.objects.get(pk=id) 
    serializer = OrderSerilizer(order, many=False)
    return Response(serializer.data)

# GET ORDERS


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_orders(request):
    orders = Order.objects.all()
    serializer = OrderSerilizer(orders, many=True)
    return Response(serializer.data)


# <input type="text" name="search" />

@api_view(['GET'])
def shop(request):
    page_num = request.query_params.get('page')
    search_keyword = request.query_params.get('search')


    if (search_keyword != None ): 

        products = Product.objects.filter(
            Q(name__icontains=search_keyword) |
            Q(category__icontains=search_keyword) |
            Q(brand__icontains=search_keyword) 
        ).order_by('-created_date')

        products_paginator = Paginator(products, 6)


    else:
        products = Product.objects.all().order_by('-created_date')
        products_paginator = Paginator(products, 6)

    try:
        page = products_paginator.page(page_num)
    except PageNotAnInteger:
        page = products_paginator.page(1)
    except EmptyPage:
        page = products_paginator.page(products_paginator.num_pages)
    serializer = ProductSerializer(page, many= True)
    return Response ({
        'products':serializer.data,
        'paginator': {
        'num_pages': products_paginator.num_pages,
        'has_next': page.has_next(),
        'has_prev': page.has_previous()
        },
    })
