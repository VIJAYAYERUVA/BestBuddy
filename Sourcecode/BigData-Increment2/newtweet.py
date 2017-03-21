from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import time
import os


ckey="clp0OKB2lFlFDAD24460iguTT"
csecret="Fjy1g8oaL9SunTU99CvbA7o2jiSSGZ3KQlvMYDd9vqlxeT5RzX"
atoken="4853671263-QcOcvuI58ogDo5ZQbhYpeBCOvWvvgeMOBMCFZZr"
asecret="OqAzKTypEPU9FV8oO1nwcRtK3k6E0UuUGT0dwZ0XbtTLx"
from twitterapistuff  import *

class listener(StreamListener):

    def on_data(self, data):
        try:
            tweet= data.split(',"text":"')[1].split('","source')[0]
            print (tweet)
            saveThis =str(time.time())+'::'+tweet
            saveFile= open('newtweet.json','a')
            saveFile.write(saveThis)
            saveFile.write('\n')
            saveFile.close()
            return(True)
        except ValueError:
            print ('failed on_date')
            time.sleep(5)
            pass
        
auth = OAuthHandler(ckey, csecret)
auth.set_access_token(atoken, asecret)

twitterStream = Stream(auth, listener())
twitterStream.filter(track=["yum","yummy","party","Snacks","delicious","meal","toast","food","baked","vegan","vegetables","soup","salad","foodporn","dessert","eggs","pizza","beer","drink","broccli","coffee","tea"], languages=['en'])
#
