from django.contrib import admin
from bmstu_lab.models import Service, Users
from bmstu_lab.models import Booking


admin.site.register(Service)
admin.site.register(Booking)
admin.site.register(Users)
