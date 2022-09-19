from django.urls import path
from . import views

app_name = 'posts'

urlpatterns = [
    path('',views.PostList.as_view(),name='all'),
    path('new_post/',views.CreatePost.as_view(),name='create'),
    path('by/<str:username>/',views.UserPost.as_view(),name='for_user'),
    path('by/<str:username>/<int:pk>/',views.PostDetail.as_view(),name='single'),
    path('delete_post/<int:pk>/',views.DeletePost.as_view(),name='delete'),
    path('delete_comment/<int:pk>/',views.DeleteComment.as_view(),name='delete_comment'),
    path('new_comment/<int:pk>',views.CreateComment.as_view(),name='create_comment'),
    path('comments/<int:pk>',views.CommentList.as_view(),name='all_comments')
]
    