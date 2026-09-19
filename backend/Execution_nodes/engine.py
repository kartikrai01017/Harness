from apirun import run_ai
from Execution_nodes.Edge_graph import Edge_graph
from Execution_nodes.node_map import node_map_create

def execute(values: dict) -> str:
    node_map, start = node_map_create(values)
    edge_graph = Edge_graph(values)

    current_id = start['id']
    result = ''

    while True:
        node = node_map[current_id]

        if node['type'] == 'StartNode':
            pass  # entry point, no action
        elif node['type'] == 'ApiNode':
            prompt = result if result else values['value']
            result = run_ai(prompt=prompt)
        elif node['type'] == 'EndNode':
            break

        next_ids = edge_graph.get(current_id, [])
        if not next_ids:
            break
        current_id = next_ids[0]

    return result