# Generated by Django 4.1.3 on 2023-02-02 11:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='shippinaddress',
            name='postal_code',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
