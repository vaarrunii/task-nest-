from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer

@api_view(['GET', 'POST'])
def task_list(request):
    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
def task_detail(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        task.delete()
        return Response(status=204)

@api_view(['PATCH'])
def update_category(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response(status=404)
    
    task.category = request.data.get('category', task.category)
    task.save()
    return Response(TaskSerializer(task).data)
from django.core.mail import send_mail

def notify_assignee(task):
    if task.assignee and task.assignee.email:
        send_mail(
            subject=f"New Task Assigned: {task.title}",
            message=f"You have been assigned a new task: {task.title}\n\nDetails:\n{task.description}",
            from_email='your-email@example.com',
            recipient_list=[task.assignee.email],
            fail_silently=False,
        )
