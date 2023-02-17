from django.urls import path
from . import views
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
   
# )


urlpatterns = [
    # Authorization and Authentication path
    path('user/login/', views.MyTokenObtainPairView.as_view(), name='user-login'),
    path('user/register/', views.register_user),
    path('user/profile/', views.get_user_profile),
    path('user/profile/update/', views.update_user_profile),

    path('admin/users/', views.get_users,),
    path('admin/user/delete/<str:id>/', views.delete_user),
    path('admin/user/edit/<str:id>/', views.edit_user),
    path('admin/product/delete/<str:id>/', views.delete_product),
    path('admin/product/update/<str:id>/', views.update_product),
    path('admin/product/create/', views.create_product),
    path('admin/orders/', views.get_orders),
   
    path('checkout/place-order/', views.place_order),
    path('checkout/order/<str:id>/', views.get_order),

    path('products/', views.get_products),
    path('products/<int:id>/', views.get_product),
]
