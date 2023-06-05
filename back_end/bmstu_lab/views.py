from datetime import date, datetime

from django.contrib.auth import authenticate, login
from django.contrib import auth
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.request import Request
from bmstu_lab.models import Service
from bmstu_lab.permissions import IsManager, IsAdmin
from bmstu_lab.serialaizers import ServiceSerializer, BookingSerializer, UserSerializer, LoginRequestSerializer
from bmstu_lab.models import Booking
from django.db.models import Q
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


import psycopg2

con = psycopg2.connect(
    database="usersdb",
    user="dbuser",
    password="123",
    host="localhost",
    port="5432"
)

cur = con.cursor()

cur.execute("SELECT * FROM booking")

results = cur.fetchall()
print(results)




def index(request):
    return render(request, 'index.html',
                  {'current_date': date.today()})


def about(request):
    return render(request, 'about.html')




def sendText(request):
    input_text = request.POST['text']
    return render(request, 'Services.html', {'data': {
        'current_date': date.today(),
        'Services': Service.objects.all(),
        'input_text': int(input_text)}})


class BookingDateViewSet(APIView):
    def get(self, request):
        date_open = request.data['date_open']
        bookings = Booking.objects.filter(date_open=date_open)
        print(bookings.count())
        return Response({'count': bookings.count()})


class ServiceSearchViewSet(APIView):
    def get(self, request):
        query = self.request.GET.get('search')
        object_list = Service.objects.filter(
            Q(name__icontains=query) | Q(address__icontains=query)
        )
        return Response(ServiceSerializer(object_list, many=True).data)
class BookingDateFilterViewSet(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        # data = self.request.data  # допустим передали username и password
        start = self.request.GET.get('start')
        start = datetime.strptime(start, "%Y-%m-%d")
        end = self.request.GET.get('end')
        end = datetime.strptime(end, "%Y-%m-%d")
        object_list = Booking.objects.filter(date_open__range=[start, end])
        return Response(BookingSerializer(object_list, many=True).data)

class BookingFilterViewSet(APIView):
    permission_classes = [IsManager]
    def get(self, request):
        query = self.request.GET.get('status')
        object_list = Booking.objects.filter(status=query)
        return Response(BookingSerializer(object_list, many=True).data)

class BookingByUserViewSet(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self, request):
        query = self.request.GET.get('user')
        booking_list = Booking.objects.filter(user=query)
        service_list = booking_list[0].service
        if (booking_list is not None) and (service_list is not None):
            return Response({'booking' : BookingSerializer(booking_list[0]).data, 'service' : ServiceSerializer(service_list).data})
        else:
            return Response({'error': 'не работает'})


class ServiceFilterViewSet(APIView):
    def get(self, request):
        query = self.request.GET.get('direction')
        if (query == 'up'):
            object_list = Service.objects.all().order_by('price')
        elif (query == 'down'):
            object_list = Service.objects.all().order_by('-price')
        return Response(ServiceSerializer(object_list, many=True).data)


def DelService(request):
    input_id = request.POST['text']
    print(input_id)
    cur.execute(f"DELETE FROM service WHERE id = {input_id}")
    con.commit()
    return render(request, 'Services.html', {'data': {
        'current_date': date.today(),
        'Services': Service.objects.all()
    }})


con.close


def GetServices(request):
    return render(request, 'Services.html', {'data': {
        'current_date': date.today(),
        'Services': Service.objects.all()
    }})


def GetService(request, id):
    return render(request, 'Service.html', {'data': {
        'current_date': date.today(),
        'Service': Service.objects.filter(id=id)[0]
    }})


# class ServiceViewSet(APIView):
#     def get_permissions(self):
#         if self.action in ['get']:
#             permission_classes = [IsAuthenticatedOrReadOnly]
#         elif self.action in ['post', 'destroy', 'put']:
#             permission_classes = [IsManager]
#         else:
#             permission_classes = [IsAdmin]
#         return [permission() for permission in permission_classes]
#
#     def get(self, request):
#             object_list = Service.objects.all().order_by('number')
#             return Response(ServiceSerializer(object_list, many=True).data)
#
#     def post(self, request):
#         serializer = ServiceSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#
#         return Response({'created': serializer.data})
#
#     def put(self, request, *args, **kwargs):
#         pk = kwargs.get('pk', None)
#         if not pk:
#             return Response({'error': 'Метод PUT не разрешен'})
#
#         try:
#             instance = Service.objects.get(pk=pk)
#         except:
#             return Response({'error': 'Объект с таким идентификатором не найден'})
#
#         serializer = ServiceSerializer(data=request.data, instance=instance)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response({'updated': serializer.data})
#
#     def delete(self, request, pk):
#         good_to_delete = Service.objects.get(pk=pk)
#         good_to_delete.delete()
#         return Response({'success': 'Item with the received ID has been deleted'})


class ServiceViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [IsAuthenticatedOrReadOnly]
        elif self.action in ['create', 'destroy', 'update']:
            permission_classes = [IsManager]
        else:
            permission_classes = [IsAdmin]
        return [permission() for permission in permission_classes]
    queryset = Service.objects.all().order_by('id')
    serializer_class = ServiceSerializer  # Сериализатор для модели



class BookingViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        if self.action in ['create', 'list']:
            permission_classes = [IsAuthenticated]
        elif self.action == 'update':
            permission_classes = [IsManager]
        else:
            permission_classes = [IsAdmin]
        return [permission() for permission in permission_classes]
    queryset = Booking.objects.all().order_by('id_field')
    serializer_class = BookingSerializer  # Сериализатор для модели

@method_decorator(csrf_protect, name='dispatch')
class Login(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        data = self.request.data # допустим передали username и password
        username = data["username"]
        password = data["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'status': 'ok', 'IsAuthenticated': 'true', 'user_id' : user.id, "is_staff" : user.is_staff})
        else:
            return Response({'status': 'error', 'error': 'login failed', 'IsAuthenticated': 'false'})


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            auth.logout(request)
            return Response({'success': 'logged out'})
        except:
            return Response({'error': 'error logging out'})

class ExampleView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'csrfToken': request.csrf_token})


@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([BasicAuthentication])
def user(request: Request):
    return Response({
        'data': UserSerializer(request.user).data
    })

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def login(request: Request):
#     serializer = LoginRequestSerializer(data=request.data)
#     if serializer.is_valid():
#         authenticated_user = authenticate(**serializer.validated_data)
#         if authenticated_user is not None:
#             login(request, authenticated_user)
#             return Response({'status': 'Success'})
#         else:
#             return Response({'error': 'Invalid credentials'}, status=403)
#     else:
#         return Response(serializer.errors, status=400)