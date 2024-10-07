from django.db import models
from django.contrib.auth.models import User

class Snippet(models.Model):
    title = models.CharField(max_length = 100)
    description = models.TextField(blank=True)
    language = models.CharField(max_length=30)
    code = models.TextField()
    author = models.ForeignKey(User, on_delete= models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now= True)

    def __str__(self):
        return self.title + language

class  Comment(models.Model):
    snippet = models.ForeignKey(Snippet,related_name='comments', on_delete= models.CASCADE)   
    user = models.ForeignKey(User, on_delete= models.CASCADE)
    comment_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add= True)

