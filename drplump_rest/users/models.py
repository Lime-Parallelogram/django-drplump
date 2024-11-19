from django.db import models

# Create your models here.
class User(models.Model):
    user_id = models.AutoField(primary_key=True)

    name = models.TextField(max_length=100)
    email = models.EmailField(unique=True)
    password_hash = models.TextField(max_length=100)

