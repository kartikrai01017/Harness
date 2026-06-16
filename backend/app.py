from fastapi import FastAPI, Body  # type: ignore
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from pprint import pprint

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/user")
def run_flow(flow: dict):
    print("\n" + "=" * 60)
    print("RECEIVED FLOW NODES:")
    print("=" * 60)
    pprint(flow)
    print("=" * 60 + "\n")
    return {"status": "received"}


@app.post("/edges")
def run_flw(flow: dict):
    print("edges below")
    pprint(flow)
    return{"status":"see"}

@app.post("/values")
def run_value(Values: dict):
    pprint(Values)
    return{"got":"it"}

@app.post("/run")
def run(value: dict):
    print("hi")
    pprint(value)
    return {"status": "good"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

