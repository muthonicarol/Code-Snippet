from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponseRedirect
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from snippets.views import LoginViewSet, UserRegistrationView, UserListView, SnippetListCreateView, SnippetDetailView, CommentListCreateView, CommentDetailView

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

    # Authentication Endpoints (JWT)
    path('api/auth/login/', LoginViewSet.as_view({'post': 'post'}), name='login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # User Registration and List
    path('api/auth/register/', UserRegistrationView.as_view(), name='user-register'),  # New user registration endpoint
    path('api/auth/users/', UserListView.as_view(), name='user-list'),  # View for listing all users

    # Snippets Endpoints
    path('api/snippets/', SnippetListCreateView.as_view(), name='snippet-list-create'),  # List and create snippets
    path('api/snippets/<int:pk>/', SnippetDetailView.as_view(), name='snippet-detail'),  # Retrieve, update, and delete snippets

    # Comments Endpoints
    path('api/snippets/<int:snippet_id>/comments/', CommentListCreateView.as_view(), name='comment-list-create'),  # List and create comments for a snippet
    path('api/comments/<int:pk>/', CommentDetailView.as_view(), name='comment-detail'),  # Retrieve, update, and delete comments

    # Redirect root to snippets
    path('', lambda request: HttpResponseRedirect('/api/snippets/')),

    # Including other app URLs
    path('api/snippets/', include('snippets.urls')),  # If you have additional URLs in your snippets app
]
