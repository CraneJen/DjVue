from django.urls import path
from Post.views import postlist, Home, add, create

urlpatterns = [
    path('', Home.as_view(), name='index'),
    path('list/', postlist, name='list'),
    path('add/', add, name='add'),
    path('create/', create, name='create')
]
