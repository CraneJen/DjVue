from django.urls import path
from Post.views import postlist, add, create
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name="Post/home.html"),
         name='home'),
    path('list/', postlist, name='list'),
    path('add/', add, name='add'),
    path('create/', create, name='create')
]
