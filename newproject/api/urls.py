from django.urls import path
from .views import get_users, get_user_links, create_user, add_link, user_login, user_logout, get_user_username, edit_link, get_user_and_links, add_profile


urlpatterns = [
    # For Users
    path('users/', get_users, name='get_users'),
    path('users/register', create_user, name='create_user'),
    path('users/login', user_login, name="user_login"),
    path('users/logout', user_logout, name="user_logout"),
    path('users/username/<str:username>', get_user_username, name="get_user_username"),
    path('users/links/<int:pk>', edit_link, name="edit_link"),
    path('users/public/<str:username>', get_user_and_links, name="user_profile_and_links"),
    path('users/edit-profile', add_profile, name='add_profile' ),
    

    # For Links of Users
    path('users/links/<str:username>', get_user_links, name='all_links'),
    path('users/create-link', add_link, name="add_link")


    # path('users/create', create_user, name='create_user'),
    # path('users/<int:pk>', user_detail, name='user_detail'),
    
]