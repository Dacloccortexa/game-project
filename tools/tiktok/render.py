import json,subprocess,sys,os
out=sys.argv[1]; name=sys.argv[2]
T=os.path.dirname(os.path.abspath(__file__))
ev=json.load(open(f'{out}/events.json'))
dur=ev['frames']/ev['fps']
inputs=[];filters=[];labels=[]
vol={'tick':0.8,'tap':0.5,'wrong':0.9,'right':0.9,'kickoff':0.6,'tackle':0.8,'end':0.6}
for i,e in enumerate(ev['events']):
    inputs+=['-i',f"{T}/sfx/{e['sound']}.wav"]
    d=int(e['t'])
    filters.append(f"[{i}:a]aresample=44100,aformat=channel_layouts=stereo,volume={vol[e['sound']]},adelay={d}|{d}[a{i}]")
    labels.append(f"[a{i}]")
n=len(labels)
fc=';'.join(filters)+f";{''.join(labels)}amix=inputs={n}:normalize=0,apad,atrim=0:{dur:.3f}[aout]"
subprocess.check_call(['ffmpeg','-loglevel','error','-y',*inputs,'-filter_complex',fc,'-map','[aout]',f'{out}/sfx.wav'])
subprocess.check_call(['ffmpeg','-loglevel','error','-y','-framerate',str(ev['fps']),'-i',f'{out}/frames/%05d.jpg','-i',f'{out}/sfx.wav',
  '-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','medium','-r','30','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',f'{out}/{name}.mp4'])
print('ok',f'{out}/{name}.mp4',round(dur,1),'s')
