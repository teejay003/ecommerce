from turtle import width
from django.db import models
from django.contrib.auth.models import User
from .img import image_resize
# Create your models here.

# Product categories
CHOICES = [
    ("CLOTHS", "CLOTHS"),
    ("SHOES", "SHOES"),
    ("BAGS", "BAGS"),
    ("WATCHES", "WATCHES"),
    ("ELECTRONICS", "ELECTRONICS"),
]


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True)
    image = models.ImageField(null=True, blank= True, )
    brand = models.CharField(max_length=200, blank=True)
    category = models.CharField(max_length=200, blank=True, choices=CHOICES)
    description = models.TextField(blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, default=0)
    number_reviews = models.IntegerField(blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    count_in_stock = models.IntegerField(blank=True, default=0)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.image:
            image_resize(self.image, 500, 500)
        super().save(*args, **kwargs)
       



class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True)
    rating = models.IntegerField(blank=True, default=0)
    comment = models.TextField(blank=True)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    payment_method = models.CharField(max_length=200, blank=True)
    tax_price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    shipping_price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    total_price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    is_paid = models.BooleanField(default=False)
    is_delivered = models.BooleanField(default=False)
    payment_date = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    delivery_date = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    created_date = models.DateTimeField(
        auto_now_add=True)

    def __str__(self):
        return str(self.created_date.strftime('%d %b, %Y - %H:%M%p'))


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, related_name= 'orderItems')
    name = models.CharField(max_length=200, blank=True)
    quantity = models.IntegerField(blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    image = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name


class ShippinAddress(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True, related_name= "shipping")
    address = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=200, blank=True)
    country = models.CharField(max_length=200, blank=True)
    postal_code = models.IntegerField(blank=True, default=0)
    shipping_price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.address
