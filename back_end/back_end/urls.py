"""
URL configuration for back_end project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from rest_framework import routers

from bmstu_lab import views
from bmstu_lab.views import BookingDateViewSet, ServiceSearchViewSet, ServiceFilterViewSet, index, about, ExampleView, \
    sendText, Login, ServiceViewSet, BookingByUserViewSet, BookingFilterViewSet, BookingDateFilterViewSet

from rest_framework import permissions
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

router = routers.DefaultRouter()
router.register(r'services', views.ServiceViewSet)
router.register(r'bookings', views.BookingViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
    path('count', BookingDateViewSet.as_view()),
    path('search', ServiceSearchViewSet.as_view()),
    path('filter', ServiceFilterViewSet.as_view()),
    path('bookingfilter', BookingFilterViewSet.as_view()),
    path('bookingdatefilter', BookingDateFilterViewSet.as_view()),
    path('bookingbyuser', BookingByUserViewSet.as_view()),
    path('home', index, name="home"),
    path('about', about, name="about"),
    path('events', views.GetServices, name="events"),
    path('service/<int:id>/', views.GetService, name='service_url'),
    path('sendText', sendText, name='sendText'),
    path('register', Login.as_view()),
    path('accounts/', include('accounts.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('test', ExampleView.as_view()),
    path('api/user', views.user, name='user'),
    path('api/get_csrf_token', views.get_csrf_token, name='get_csrf_token'),
]
