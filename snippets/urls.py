# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SnippetViewSet, CommentViewSet, RegisterViewSet, LoginViewSet

router = DefaultRouter()
router.register(r'snippets', SnippetViewSet)
router.register(r'comments', CommentViewSet)  # Ensure this line is correct
router.register(r'register', RegisterViewSet, basename='register')


urlpatterns = [
    path('', include(router.urls)),
]
