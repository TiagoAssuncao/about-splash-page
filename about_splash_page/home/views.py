from django.shortcuts import render
from home.models import InviteUser

def index(request):
    if request.method == "POST":
        form = request.POST
        first_name = form.get('first')
        last_name = form.get('last')
        email = form.get('Email')

        invite_user = InviteUser.objects.create(
                first_name=first_name,
                last_name=last_name,
                email=email)
        return render(request, 'home/thank.html')
    else:
        return render(request, 'home/index.html')
