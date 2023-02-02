from django.urls import path
from . import views
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
   
# )


urlpatterns = [
    # Authorization and Authentication path
    path('user/login/', views.MyTokenObtainPairView.as_view(), name='user-login'),
    path('user/register/', views.register_user, name='user-register'),
    path('user/profile/', views.get_user_profile, name = 'user-profile'),
    path('user/profile/update/', views.update_user_profile, name = 'user-profile-update'),
    path('users/', views.get_users, name = 'users'),
   


    path('products/', views.get_products, name= 'products'),
    path('products/<int:id>/', views.get_product, name= 'product'),
]
