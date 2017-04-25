'''
Created on Oct 21, 2016
@author: Xuebin Wei
@website: www.lbsocial.net
'''

import pymongo
from pymongo import MongoClient
import json

import twitter
from pprint import pprint

'''
OAUTH
'''

CONSUMER_KEY = "5rkFkJDFPVBVDSvtNtoVpFpgq"  # fill your oauth
CONSUMER_SECRET = "VkK5YIETgPFNgKwt1tFHRSrztnNW00cbVaxCUAgMYqGrI5VHxa"  # fill your oauth
OAUTH_TOKEN = "4843507186-Kc982XGeypByuevVKdAhbMmEwnOmWWxgw247hUV"  # fill your oauth
OATH_TOKEN_SECRET = "bKFAS5HDMzRMuckOnbMIjwjDxnKzUeivIz5VbENrs4soR"  # fill your oauth

auth = twitter.oauth.OAuth(OAUTH_TOKEN, OATH_TOKEN_SECRET, CONSUMER_KEY, CONSUMER_SECRET)
twitter_api = twitter.Twitter(auth=auth)

'''
connect mongodb database
'''

client = MongoClient()

db = client.tweet_db

tweet_collection = db.tweet_collection
tweet_collection.create_index([("id", pymongo.ASCENDING)], unique=True)

'''
define query in REST API
'''

count = 100

geocode = "-84.56,33.62,50mi"

q = "election"

'''
fetch data
'''

search_results = twitter_api.search.tweets(q=q, count=count,geocode=geocode)

statuses = search_results["statuses"]


for statuse in statuses:
    try:
       tweet_collection.insert(statuse)
    except:
        pass

    print (len(statuses))

'''
query collected data in MongoDB
'''

#tweet_cursor = tweet_collection.find()

#print(tweet_cursor.count())

#user_cursor = tweet_collection.distinct("user.id")

#print(len(user_cursor))

#for document in tweet_cursor:
 #   try:
  #      print('----')
        #         pprint (document)


   #     print('name:', document["user"]["name"])
    #    print('text:', document["text"])
    #except:
     #   print("***error in encoding")
      #  pass
