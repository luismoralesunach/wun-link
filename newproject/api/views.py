from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .serializer import UserSerializer, AllLinksSerializer, UserProfileSerializer
from .models import AllLinks, UserProfile

from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_link(request):
    serializer = AllLinksSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def user_logout(request):
    try:
        token = request.auth
        token.delete()
        return Response({"message": "Logout Succesful"}, status=status.HTTP_200_OK)
    except AttributeError:
        return Response({"message": "Invalid Token"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user)

    response = Response({
        "user": serializer.data
    }, status=status.HTTP_200_OK)

    # Set the token in an HTTP-only cookie
    response.set_cookie(
        key='auth_token',
        value=token.key,
        httponly=True,  # Makes the cookie inaccessible to JavaScript
        secure=True,    # Only send the cookie over HTTPS (optional, but recommended)
        samesite='Strict'  # Prevents the cookie from being sent along with cross-site requests
    )

    return response


@api_view(['POST'])
@permission_classes([AllowAny])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(request.data['password'])  # Ensure password is hashed
        user.save()
        token, created = Token.objects.get_or_create(user=user)
        
        response = Response({
            'user': serializer.data,
        }, status=status.HTTP_201_CREATED)

        # Set the token in an HTTP-only cookie
        response.set_cookie(
            key='auth_token',
            value=token.key,
            httponly=True,  # Makes the cookie inaccessible to JavaScript
            secure=True,    # Only send the cookie over HTTPS (optional, but recommended)
            samesite='Strict'  # Prevents the cookie from being sent along with cross-site requests
        )

        return response
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([AllowAny])
def get_user_username(request, username):
    try:
        user = User.objects.get(username =username)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_links(request, username):
    try:
        user = User.objects.get(username = username)
        links = AllLinks.objects.filter(user=user) 
        serializer = AllLinksSerializer(links, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"detail": "User Not Found"}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(["GET"])
@permission_classes([AllowAny])
def get_user_and_links(request, username):
    try:
        user = User.objects.get(username = username)
        user_profile = UserProfile.objects.get(user = user)
        links = AllLinks.objects.filter(user = user)

        profile_serializer = UserProfileSerializer(user_profile)
        links_serializer = AllLinksSerializer(links, many=True)

        return Response(
            {'profile': profile_serializer.data,
             'links': links_serializer.data
             },status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except UserProfile.DoesNotExist: 
        return Response(status=status.HTTP_404_NOT_FOUND)




@api_view(["POST"])
@permission_classes([AllowAny])
def add_link(request):
    serializer = AllLinksSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT", "DELETE"])
@permission_classes([AllowAny])
def edit_link(request, pk):
    try:
        link = AllLinks.objects.get(pk = pk)
    except AllLinks.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method =='DELETE':
        link.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        data = request.data
        serializer = AllLinksSerializer(link, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([AllowAny])
def add_profile(request):
    try:
        user = User.objects.get(username=request.data['username'])
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    profile_data = {
        "user": user.id,
        "display_name": request.data.get("display_name"),
        "bio": request.data.get("bio"),
        "configuration": request.data.get("configuration")
    }

    # Check if a profile already exists
    profile, created = UserProfile.objects.get_or_create(user=user)
    serializer = UserProfileSerializer(profile, data=profile_data, partial=True)  # partial=True for updates

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK if not created else status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)