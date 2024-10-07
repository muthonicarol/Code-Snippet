from django.urls import path, include
from rest_framework.routers import DefaultRouter #DefaultRouter generates url patterns for viewsets
from .views import SnippetViewSet, CommentViewSet

router= DefaultRouter()
router.register(r'register',SnippetViewSet)
router.register(r'register', CommentViewSet)
#this will register the SnippetViewSet and CommentViewSet with the router.

urlpatterns = [
    path('',include (router.urls)),


]

