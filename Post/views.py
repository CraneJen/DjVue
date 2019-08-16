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


def removeSubkey(objs):
    rsp = []
    myobjs = json.loads(objs)
    for obj in myobjs:
        newdict = {}
        for key, item in obj.items():
            if isinstance(item, dict):
                newdict.update(item)
            else:
                newdict.update({key: item})
        rsp.append(newdict)
    return json.dumps(rsp)


def postlist(request):
    objs = Post.objects.all()

    rsp = serializers.serialize('json', objs)
    rsp = removeSubkey(rsp)
    return HttpResponse(rsp, content_type='application/json')


# json.dumps(rsp)
def add(request):
    form = PostForm()
    context = {"form": form}
    if request.method == "POST":
        title = request.POST['title']
        content = request.POST['content']

        Post.objects.create(title=title, content=content)

    return render(request, 'Post/form.html', context=context)


def create(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        title = data['title']
        content = data['content']

        p = Post.objects.create(title=title, content=content)
        rsp = serializers.serialize('json', [
            p,
        ])
        rsp = removeSubkey(rsp)
        return HttpResponse(rsp)
