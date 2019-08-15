from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=50,
                             unique=True,
                             blank=False,
                             null=False)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    class Meta:

        verbose_name = 'Post'
        verbose_name_plural = 'Posts'
        ordering = ['-created']

    def __str__(self):
        return self.title
