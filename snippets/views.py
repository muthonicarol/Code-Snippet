from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from .models import Comment, Snippet
from .serializers import CommentSerializer, SnippetSerializer, UserSerializer

class LoginViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]  # Allow access to everyone for login

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        # Basic validation
        if not username or not password:
            return Response({"error": "Please provide both username and password."}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)  # Log the user in
            return Response({"message": "Login successful!"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class SnippetViewSet(viewsets.ModelViewSet):
    queryset = Snippet.objects.all()  # Define the queryset for Snippet
    serializer_class = SnippetSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)  # Set the owner to the logged-in user


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()  # Define the queryset for Comment
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Comment.objects.all()
        snippet_id = self.request.query_params.get('snippet_id', None)
        if snippet_id is not None:
            queryset = queryset.filter(snippet_id=snippet_id)
        return queryset


class RegisterViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    queryset = User.objects.none()  # No valid queryset needed

    def create(self, request):
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()  # Save the user
            user.set_password(request.data['password'])  # Hash the password
            user.save()  # Save the user with the hashed password
            return Response({"message": "Registration successful!"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
