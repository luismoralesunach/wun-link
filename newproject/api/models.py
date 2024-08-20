from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    display_name = models.TextField(default="username", max_length=50, blank=True)
    bio = models.TextField(blank=True, null=True)
    configuration = models.JSONField(default=dict)

    def __str__(self):
        return self.display_name or self.username




class AllLinks(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="all_links")
    url = models.URLField(max_length=300)
    title = models.CharField(max_length=100, blank=False, null=False)

    def __str__(self):
        return self.title or self.url
