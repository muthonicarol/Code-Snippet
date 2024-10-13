from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SnippetViewSet, CommentViewSet, UserProfileViewSet, FavoriteSnippetViewSet, UserViewSet

router = DefaultRouter()
router.register(r'snippets', SnippetViewSet, basename='snippet')
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'profiles', UserProfileViewSet, basename='profile')
router.register(r'favorites', FavoriteSnippetViewSet, basename='favorite')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),  # Include router URLs
]
