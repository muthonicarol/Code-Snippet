from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Snippet, Comment, UserProfile, FavoriteSnippet

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Don't expose the password

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()  # Save the user instance
        return user

     
    

class SnippetSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)  # Nested serializer to display owner details

    class Meta:
        model = Snippet
        fields = ('id', 'title', 'code', 'description', 'language', 'owner', 'created_at', 'updated_at')
        read_only_fields = ('owner', 'created_at', 'updated_at')  # These fields are auto-generated
    def create(self, validated_data):
        # You can add any additional validation or processing here
        return Snippet.objects.create(**validated_data)
    


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Nested serializer to display user details

    class Meta:
        model = Comment
        fields = ('id', 'snippet', 'user', 'text', 'created_at')
        read_only_fields = ('user', 'created_at')  # User and created_at are auto-generated


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Nested serializer to display user details

    class Meta:
        model = UserProfile
        fields = ('user', 'bio', 'profile_picture')
        read_only_fields = ('user',)  # User is auto-generated


class FavoriteSnippetSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Nested serializer to display user details
    snippet = SnippetSerializer(read_only=True)  # Nested serializer to display snippet details

    class Meta:
        model = FavoriteSnippet
        fields = ('user', 'snippet')
        read_only_fields = ('user', 'snippet')  # These fields are auto-generated

    def create(self, validated_data):
        # Ensure that a user can only favorite a snippet once
        favorite, created = FavoriteSnippet.objects.get_or_create(
            user=validated_data['user'],
            snippet=validated_data['snippet']
        )
        return favorite
