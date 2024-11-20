"""drplump_rest URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

import restmain.views
import appointments.views
import users.views
import reviews.views
import giftcard.views

urlpatterns = [
    path('admin/', admin.site.urls),

    path("api/services/", restmain.views.ServiceList.as_view()),
    path("api/services/<int:pk>", restmain.views.ServiceDetail.as_view()),

    path("api/appointments/", appointments.views.AppointmentList.as_view()),
    path("api/appointments/<int:pk>", appointments.views.AppointmentDetail.as_view()),

    path("api/users/<int:pk>", users.views.UserDetail.as_view()),
    path("api/users/register", users.views.UserRegiser.as_view()),
    path("api/users/login", users.views.UserLogin.as_view()),

    path("api/reviews/", reviews.views.ReviewList.as_view()),
    path("api/reviews/<int:pk>", reviews.views.ReviewDetail.as_view()),

    path("api/giftcard/getValue", giftcard.views.CheckCode.as_view())
]
