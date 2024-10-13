
from django.db import models
from django.contrib.auth.models import User

class Snippet(models.Model):
    title = models.CharField(max_length=100)
    code = models.TextField()
    description = models.TextField(default="No description provided")
    language = models.CharField(max_length=50, default='python')
    owner = models.ForeignKey(User, related_name='snippets', null=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set when created
    updated_at = models.DateTimeField(auto_now=True)  # Automatically update when edited

    def __str__(self):
        return self.title

class Comment(models.Model):
    snippet = models.ForeignKey(Snippet, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set when created

    def __str__(self):
        return f'Comment by {self.user.username} on {self.snippet.title}'

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, default="")
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    def __str__(self):
        return f'Profile of {self.user.username}'

class FavoriteSnippet(models.Model):
    user = models.ForeignKey(User, related_name='favorites', on_delete=models.CASCADE)
    snippet = models.ForeignKey(Snippet, related_name='favorited_by', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'snippet')  # Ensure a user can only favorite a snippet once

    def __str__(self):
        return f'{self.user.username} favorites {self.snippet.title}'
