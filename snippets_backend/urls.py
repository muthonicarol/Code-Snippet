from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponseRedirect
from rest_framework.authtoken.views import obtain_auth_token  # Import the obtain_auth_token
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/snippets/', include('snippets.urls')),
    path('', lambda request: HttpResponseRedirect('/api/snippets/')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/login/', obtain_auth_token, name='api_login'),  # This is now correctly imported
]
