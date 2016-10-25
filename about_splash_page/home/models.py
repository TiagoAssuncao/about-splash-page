from django.db import models

class InviteUser(models.Model):
    first_name = models.CharField(max_length = 100)
    last_name = models.CharField(max_length = 100)
    email = models.EmailField()

    def __str__(self):
        return self.email
