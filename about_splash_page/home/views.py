from django.shortcuts import render

def index(request):
    if request.method == "POST":
        form = request.POST
        email = form.get('Email')
        print(email)
    return render(request, 'home/index.html')
