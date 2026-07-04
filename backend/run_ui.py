from apirun import run_ai
def runui(value:dict):
    StateValue = value["value"]  
    nodes = value["nodes"]
    edges = value["edges"]
    

    current_id = nodes[0]["id"]
    current_type = nodes[int(current_id)]["type"]

    while current_type != "EndNode":

        if current_type == "StartNode":
            print("start")

        elif current_type == "ApiNode":
            answervalue=run_ai(prompt=StateValue)
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
    

    return answervalue
   