from django.shortcuts import render
from django.http import HttpResponse
from site_wide.models import Service

def home(request):
    services = Service.objects.all()
    return render(request, "infosite/index.html",{"services":services})

def about(request):
    return render(request, "infosite/about.html")