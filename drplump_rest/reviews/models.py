from django.db import models

from users.models import User
from restmain.models import Service

# Create your models here.
class Review(models.Model):
    review_id = models.AutoField(primary_key=True)

    user_id = models.ForeignKey(User, models.CASCADE)
    rating = models.IntegerField()
    title = models.TextField(max_length=100)
    content = models.TextField(max_length=2000)
    date = models.DateField()
    treatment_type = models.ForeignKey(Service, models.CASCADE)