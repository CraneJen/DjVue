from django import template
from django.conf import settings
import base64

register = template.Library()


@register.simple_tag
def pubkey():
    with open(settings.PUBKEY, 'rb') as f:
        pubkey = str(base64.b64encode(f.read()), encoding="utf-8")

    return pubkey
