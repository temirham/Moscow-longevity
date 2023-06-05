from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, Serializer, CharField

from bmstu_lab.models import Service, Booking
from django.contrib.auth.models import User

class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'date_joined']

class LoginRequestSerializer(Serializer):
    model = User
    username = CharField(required=True)
    password = CharField(required=True)

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["id", "name", "address", "img", "price", "number"]


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["id_field", "date_open", "date_pay", "date_close", "status", "service", "user"]



