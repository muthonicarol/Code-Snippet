from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .models import Snippet, Comment
from .serializers import SnippetSerializer, CommentSerializer, UserSerializer
from django.contrib.auth.models import User

# Snippet Views
class SnippetListCreateView(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can create snippets

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Associate the snippet with the logged-in user

class SnippetDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access or modify

# Comment Views
class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can create comments

    def get_queryset(self):
        # Filter comments by the snippet
        snippet_id = self.kwargs.get('snippet_id')
        return Comment.objects.filter(snippet_id=snippet_id)

    def perform_create(self, serializer):
        # Associate the comment with the snippet and user
        snippet_id = self.kwargs.get('snippet_id')
        snippet = Snippet.objects.get(id=snippet_id)
        serializer.save(snippet=snippet, user=self.request.user)

class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

# User Registration View
class UserRegistrationView(APIView):
    permission_classes = [AllowAny]  # Anyone can register

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User List View (Optional, to list all users)
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can view the user list
