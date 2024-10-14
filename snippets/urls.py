from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SnippetViewSet, CommentViewSet, UserProfileViewSet, FavoriteSnippetViewSet, UserViewSet,UserSignupView,custom_login

router = DefaultRouter()
router.register(r'snippets', SnippetViewSet, basename='snippet')
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'profiles', UserProfileViewSet, basename='profile')
router.register(r'favorites', FavoriteSnippetViewSet, basename='favorite')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', UserSignupView.as_view(), name='signup'),  # Include router URLs
     
     path('api/custom-login/', custom_login, name='custom_login'),
]
