from fastapi import FastAPI, Body  # type: ignore
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from pprint import pprint
from dotenv import load_dotenv
import os
from execute_transversal import edgesort
from run_ui import runui

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/user")
def run_flow(playload: dict):
    flow=playload["flow"]
   
    print("RECEIVED FLOW NODES:")
    pprint(flow)
    print ("first node")
    print(flow[0]["id"])
    
    return {"status": "received"}



@app.post("/edges")
def run_flw(playload: dict):
    edgesort(value=playload)
    return{"status":"see"}

@app.post("/values")
def run_value(Values: dict):
    pprint(Values)
    return{"got":"it"}

@app.post("/run")
def run(value: dict):
    statevalue=runui(value=value)

    return {"running": statevalue}



    

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

