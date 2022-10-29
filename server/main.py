from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

#cors
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# read json
news = open('news.json')
data = json.load(news)
data_length = len(data)

# filter duplicates by title and summary
filteredTitle = { each['title'][0:20] : each for each in data }.values()
filteredData = [*{ each['summary'] : each for each in filteredTitle }.values()]
print(len(filteredData))

# search
def searchData(search_term, field, data):
    return [element for element in data if search_term in element[field]]

# routes
@app.get("/")
async def root(page_num: int = 1, search: str ='', field: str = 'title'):
    try: 
        data_count = 25 
        start = (page_num - 1) * data_count
        end = start + data_count
        result = searchData(search, field, filteredData) if search else filteredData
        response = {
            "news": result[start:end],
            "total": data_length,
        }
        return response
    except:
        return {'Wrong!!'} 

