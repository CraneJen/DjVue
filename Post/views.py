from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic.list import ListView
from django.core import serializers

from Post.models import Post
from Post.form import PostForm

from django.views.decorators.csrf import csrf_exempt

import json


class Home(ListView):
    model = Post
    template_name = 'home.html'


def postlist(request):
    objs = Post.objects.all()

    jsondata = serializers.serialize('json', objs)
    return HttpResponse(jsondata, content_type='application/json')


def add(request):
    form = PostForm()

    context = {"form": form}

    if request.method == "POST":
        # print(request.POST['title'])
        title = request.POST['title']
        content = request.POST['content']

        Post.objects.create(title=title, content=content)

    return render(request, 'Post/form.html', context=context)


@csrf_exempt
def create(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        title = data['title']
        content = data['content']

        p = Post.objects.create(title=title, content=content)
        print(p)
        return HttpResponse('')
