#---------------------------------------------------------------------#
# File: /home/will22/OneDrive/PiSpace/ByProject/Dr Plump Site/drplump_site/bookings/urls.py
# Project: /home/will22/OneDrive/PiSpace/ByProject/Dr Plump Site/drplump_site/bookings
# Created Date: Saturday, May 7th 2022, 10:05:04 pm
# Description: 
# Author: Will Hall
# Copyright (c) 2022 Lime Parallelogram
# -----
# Last Modified: Sun May 08 2022
# Modified By: Will Hall
# -----
# HISTORY:
# Date      	By	Comments
# ----------	---	---------------------------------------------------------
#---------------------------------------------------------------------#
from django.urls import path
from . import views

urlpatterns = [
    path("", views.home),
    path("service/", views.makebooking)
]