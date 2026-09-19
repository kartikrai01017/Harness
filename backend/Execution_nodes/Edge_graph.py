from pprint import pprint
def Edge_graph(values:dict):
    edge_graph={}
    edges=values['edges']
    for edge in edges:
        source=edge['source']
        target=edge['target']
        if source not in edge_graph:
         edge_graph[source] = []

        edge_graph[source].append(target)

    return edge_graph

     

    
