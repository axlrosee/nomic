fastapi:
    bash -c "cd server && uvicorn main:app --reload"

react:  
    bash -c "cd client && npm start"

run:
    make fastapi & make react
	
start:
	cd server && uvicorn main:app --reload & cd client && npm start

install:
    cd client && npm install & cd server && pip install fastapi && pip install "uvicorn[standard]" 



	
