from django.shortcuts import render
from site_wide.models import Service

from .forms import BookForm

# Create your views here.
def home(request):
    services = Service.objects.all()
    return render(request, "bookings/index.html", {"services":services})

def makebooking(request):
    serviceID = request.GET["svcid"]
    selectedService = Service.objects.get(ID=serviceID)

    form = BookForm(initial={"serviceType": serviceID})

    return render(request, "bookings/makebooking.html", {"service": selectedService, "form":form})