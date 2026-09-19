
def node_map_create(values:dict):
    node_map={}
    nodes=values['nodes']
    for node in nodes:
        node_map[node['id']]=node
        if node['type']=="StartNode":
         first_node=node
    return node_map,first_node
