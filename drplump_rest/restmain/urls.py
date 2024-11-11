from django.urls import path

from . import views

urlpatterns = [
    path("services/", views.ServiceList.as_view()),
    path("services/<int:ID>",views.ServiceDetail.as_view())
]