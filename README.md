# nomic

# installation
cd client
npm install
cd server
pip install fastapi
pip install "uvicorn[standard]"

# start server
uvicorn main:app --reload

# start client
npm start



# API

route: "/"
params: 
    page_num (int)
    search (str)
    field (str - "title" or "summary")
