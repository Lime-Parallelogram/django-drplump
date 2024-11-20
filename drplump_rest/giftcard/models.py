from django.db import models

from users.models import User

# Create your models here.
class GiftCard(models.Model):
    card_code = models.TextField(max_length=16, primary_key=True)
    remaining_value = models.FloatField()

    purchased_by = models.ForeignKey(User, models.CASCADE)
    purchased_on = models.DateField()
    valid_until = models.DateField()
