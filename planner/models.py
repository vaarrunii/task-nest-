from django.db import models
from django.contrib.auth.models import User

class Planner(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='planners')

    def __str__(self):
        return f"{self.name} ({self.owner.username})"

class Person(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    planner = models.ForeignKey(Planner, on_delete=models.CASCADE, related_name='people')

    def __str__(self):
        return self.name

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    priority = models.CharField(max_length=50, choices=[('Urgent', 'Urgent'), ('Moderate', 'Moderate'), ('Not Urgent', 'Not Urgent')])
    progress = models.CharField(max_length=50, choices=[('Not Started', 'Not Started'), ('In Progress', 'In Progress'), ('Completed', 'Completed')])
    assignee = models.ForeignKey(Person, on_delete=models.SET_NULL, null=True, blank=True)
    planner = models.ForeignKey(Planner, on_delete=models.CASCADE, related_name='tasks')

    def __str__(self):
        return self.title
