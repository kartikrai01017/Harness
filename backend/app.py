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
def run_flow(playload: dict):
    flow=playload["flow"]
   
    print("RECEIVED FLOW NODES:")
    pprint(flow)
    print ("first node")
    print(flow[0]["id"])
    
    return {"status": "received"}



@app.post("/edges")
def run_flw(playload: dict):
    flow=playload["flow"]
    edge=flow
    print("edges below")
    pprint(flow)
    return{"status":"see"}

@app.post("/values")
def run_value(Values: dict):
    pprint(Values)
    return{"got":"it"}

@app.post("/run")
def run(value: dict):
    StateValue = value["value"]  
    nodes = value["nodes"]
    edges = value["edges"]

    current_id = nodes[0]["id"]
    current_type = nodes[int(current_id)]["type"]

    while current_type != "EndNode":

        if current_type == "StartNode":
            print("start")

        elif current_type == "ApiNode":
            print("api")

        for edge in edges:
            edge_source = edge["source"]
            edge_target = edge["target"]

            if edge_source == current_id:
                current_id = edge_target
                break

        current_type = nodes[int(current_id)]["type"]

    print("end")
    print("Final node:", current_id)

    return {"running": "yes"}



    

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

