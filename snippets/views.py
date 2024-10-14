from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from .models import Comment, Snippet, UserProfile, FavoriteSnippet
from .serializers import CommentSerializer, SnippetSerializer, UserProfileSerializer, UserSerializer, FavoriteSnippetSerializer
from rest_framework.authtoken.models import Token  # Import Token model

@api_view(['POST'])
def custom_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def create(self, request):
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()  # Save the user
            user.set_password(request.data['password'])  # Hash the password
            user.save()  # Save the user with the hashed password
            return Response({"message": "Registration successful!"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SnippetViewSet(viewsets.ModelViewSet):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)  # Set the owner to the logged-in user

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Set the user to the logged-in user

    def get_queryset(self):
        queryset = Comment.objects.all()
        snippet_id = self.request.query_params.get('snippet_id', None)
        if snippet_id is not None:
            queryset = queryset.filter(snippet_id=snippet_id)
        return queryset

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Set the user to the logged-in user

class FavoriteSnippetViewSet(viewsets.ModelViewSet):
    queryset = FavoriteSnippet.objects.all()
    serializer_class = FavoriteSnippetSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Set the user to the logged-in user

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)  # Only show favorites for the logged-in user

class UserSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_serializer = UserSerializer(data=request.data)  # Validate user data
        profile_data = request.data.get('profile', {})  # Profile data comes from a nested 'profile' key

        if user_serializer.is_valid():
            user = user_serializer.save(commit=False)  # Create the user instance without saving it
            user.set_password(request.data['password'])  # Set the password to hash it
            user.save()  # Now save the user with the hashed password
            
            # Create associated UserProfile
            UserProfile.objects.create(
                user=user, 
                bio=profile_data.get('bio', ''),  # Get 'bio' from profile data
                profile_image=profile_data.get('profile_image', None)  # Get 'profile_image' from profile data
            )
            return Response({"message": "User and profile created successfully!"}, status=status.HTTP_201_CREATED)
        
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
