#---------------------------------------------------------------------#
# File: /home/will22/OneDrive/PiSpace/ByProject/Dr Plump Site/drplump_site/infosite/urls.py
# Project: /home/will22/OneDrive/PiSpace/ByProject/Dr Plump Site/drplump_site/infosite
# Created Date: Sunday, May 1st 2022, 6:54:34 pm
# Description: Urls for the info section of this site
# Author: Will Hall
# Copyright (c) 2022 Lime Parallelogram
# -----
# Last Modified: Sat May 07 2022
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
    path("about/", views.about),
]
