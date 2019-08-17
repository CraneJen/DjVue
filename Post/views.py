from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic.list import ListView
from django.core import serializers
from django.conf import settings

from Post.models import Post
from Post.form import PostForm

from django.views.decorators.csrf import csrf_exempt

import json

from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5 as Cipher_pkcs1_v1_5
from Crypto.Signature import PKCS1_v1_5 as Signatrue_pkcs1_v1_5
import base64
from Crypto import Random

import os
DIR = (os.path.dirname(os.path.abspath(__file__)))


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


def deccontent(cipher_content):
    with open(settings.PRIKEY, 'rb') as f:

        key = f.read()
        # key =
        rsakey = RSA.importKey(key)
        cipher = Cipher_pkcs1_v1_5.new(rsakey)
        random_generator = Random.new().read
        content = str(
            cipher.decrypt(base64.b64decode(cipher_content), random_generator),
            "utf-8")
        return content


def create(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        title = data['title']
        cipher_content = data['content']
        content = deccontent(cipher_content)
        p = Post.objects.create(title=title, content=content)
        rsp = serializers.serialize('json', [
            p,
        ])
        rsp = removeSubkey(rsp)
        return HttpResponse(rsp)
