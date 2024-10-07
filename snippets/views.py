from rest_framework import viewsets #A viewset is a class that handles the logic of handling multiple HTTP methods(get,post,put,delete)
from .models import Comment , Snippet
from .serializers import CommentSerializer, SnippetSerializer
from rest_framework.permissions import IsAuthenticated #IsAuthenticated is a class that ensures that only the authenticated users can access certain views

class SnippetViewSet(viewsets.ModelViewSet):
    queryset = Snippet.objects.all() #this one will retrive all the snippets
    serializer_class = SnippetSerializer #specifies which serilizer to use when handling data
    permission_classes = [IsAuthenticated] #only the logged in users can interact with the viewset

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all ()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]


