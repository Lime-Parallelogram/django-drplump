#---------------------------------------------------------------------#
# File: /serializers.py
# Project: https://github.com/Lime-Parallelogram/restmain
# Created Date: Friday, June 10th 2022, 10:21:50 pm
# Description: 
# Author: Will Hall
# Copyright (c) 2022 Lime Parallelogram
# -----
# Last Modified: Fri Jun 10 2022
# Modified By: Will Hall
# -----
# HISTORY:
# Date      	By	Comments
# ----------	---	---------------------------------------------------------
#---------------------------------------------------------------------#
from rest_framework import serializers
from .models import Service

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            "ID",
            "Name",
            "Description",
            "Price",
            "ImageURL",
        ]

        # Allows things to be optional
        # //extra_kwargs {
        #//     ""
        #// }