#---------------------------------------------------------------------#
# File: /home/will22/OneDrive/PiSpace/ByProject/Dr Plump Site/drplump_site/bookings/forms.py
# Project: /home/will22/OneDrive/PiSpace/ByProject/Dr Plump Site/drplump_site/bookings
# Created Date: Monday, May 9th 2022, 9:20:42 pm
# Description: 
# Author: Will Hall
# Copyright (c) 2022 Lime Parallelogram
# -----
# Last Modified: Fri May 20 2022
# Modified By: Will Hall
# -----
# HISTORY:
# Date      	By	Comments
# ----------	---	---------------------------------------------------------
# 2022-05-18	WH	Added new form elements including date picker
#---------------------------------------------------------------------#
from multiprocessing import context
from django import forms

from site_wide.models import Service

from django.template import loader
from django.utils.safestring import mark_safe

class DatePickerInput(forms.Widget):
    template_name = "widgets/datepicker.html"

    def get_context(self, name, value, attrs=None):
        return {"widget" : {
            "name": name,
            "value": value
        }}


class BookForm(forms.Form):
    serviceType = forms.ModelChoiceField(label="Service Type",queryset=Service.objects.all(),disabled=True)
    forename = forms.CharField(label="Forename", max_length=18)
    surname = forms.CharField(label="Surname", max_length=18)
    phone = forms.CharField(label="Phone",max_length=11)
    email = forms.EmailField(label="Email Address")
    patientImage = forms.ImageField(label="Please upload an image of your current cosmetic state")
    pastCustomer = forms.BooleanField(label="Have you used this service previously?")
    date = forms.DateTimeField(widget=DatePickerInput())

    