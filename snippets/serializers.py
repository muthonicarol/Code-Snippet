from rest_framework import serializers
from .models import Snippet, Comment

class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        #the field that will be included in the serialization
        form = ['id','title', 'language', 'description', ' author' 'created_at' 'updated_at']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        #the fields that will be included in tyhe serialization
        form = ['id', 'snippet', 'user', 'comment_text', 'created_at']