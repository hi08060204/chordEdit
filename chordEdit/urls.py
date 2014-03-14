from django.conf.urls import patterns, url
from chordEdit import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^download/$', views.download, name='download'),
)
