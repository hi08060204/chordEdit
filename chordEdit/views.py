from django.shortcuts import render
from django.template import RequestContext, loader
from django.http import HttpResponse, HttpResponseRedirect
import os, subprocess, download, json

savePath = "/tmp/"

def index(request):
        return render(request, 'chordEdit/index.html',{})

def download(request):
    if request.method != 'GET':
        return HttpResponse("it's supposed to be GET.")

    url = request.GET['YTurl'] 
    
    videoId = os.popen('youtube-dl --get-id {}'.format(url)).read().strip() 
    if len(videoId) == 0: 
        return HttpResponse('Download error') 

    os.system("youtube-dl -x --audio-format 'wav' -o '{}%(id)s.m4a' {}".format(savePath,url))
    onset = os.popen("aubiotrack -i {}{}.wav".format(savePath, videoId)).read().splitlines()


    dic = {'id': videoId, 'beats': onset} 
    response = json.dumps(dic)
    
    return HttpResponse(response)
