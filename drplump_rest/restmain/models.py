from django.db import models

# Model for each of the services that Dr Plump Offers
class Service(models.Model):
    ID = models.IntegerField(primary_key=True)
    Name = models.CharField(max_length=50)
    Description = models.CharField(max_length=2000)
    Price = models.DecimalField(decimal_places=2,max_digits=6)
    ImageURL = models.URLField()
    
    def __str__(self):
        return self.Name