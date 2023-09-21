class Graph:
    def __init__(self):
        self.nodes = set()
        self.edges = {}

    def add_node(self, node):
        self.nodes.add(node)
        self.edges[node] = []

    def add_edge(self, node1, node2, weight):
        self.edges[node1].append({'node': node2, 'weight': weight})
        self.edges[node2].append({'node': node1, 'weight': weight})

def dijkstra(graph, initial_node):
    distances = {}
    previous_nodes = {}
    visited_nodes = set()

    for node in graph.nodes:
        distances[node] = float('inf')
        previous_nodes[node] = None

    distances[initial_node] = 0

    while len(visited_nodes) < len(graph.nodes):
        current_node = get_node_with_smallest_distance(distances, visited_nodes)
        visited_nodes.add(current_node)

        for edge in graph.edges[current_node]:
            neighbor, weight = edge['node'], edge['weight']
            new_distance = distances[current_node] + weight
            if new_distance < distances[neighbor]:
                distances[neighbor] = new_distance
                previous_nodes[neighbor] = current_node

    return distances, previous_nodes

def get_node_with_smallest_distance(distances, visited_nodes):
    smallest_distance = float('inf')
    smallest_node = None

    for node in distances:
        if node not in visited_nodes and distances[node] < smallest_distance:
            smallest_node = node
            smallest_distance = distances[node]

    return smallest_node

# Function to get the shortest path from the initial node to a destination node
def get_shortest_path(previous_nodes, destination_node):
    path = [destination_node]
    while previous_nodes[destination_node] is not None:
        destination_node = previous_nodes[destination_node]
        path.append(destination_node)
    return path[::-1]  # Reverse the path to be in the correct order

# Example of usage
graph = Graph()

graph.add_node('A')
graph.add_node('B')
graph.add_node('C')
graph.add_node('D')
graph.add_node('E')
graph.add_node('F')
graph.add_node('G')

graph.add_edge('A', 'C', 3)
graph.add_edge('A', 'F', 2)
graph.add_edge('F', 'C', 2)
graph.add_edge('F', 'E', 3)
graph.add_edge('F', 'B', 6)
graph.add_edge('F', 'G', 5)
graph.add_edge('C', 'D', 4)
graph.add_edge('C', 'E', 1)
graph.add_edge('D', 'B', 1)
graph.add_edge('E', 'B', 2)

initial_node = 'A'
distances, previous_nodes = dijkstra(graph, initial_node)

print('Graph:', graph.nodes)
print('Minimum distances from node', initial_node + ':')
for node in distances:
    print(node + ':', distances[node])

# Example of how to get the shortest path from A to B
destination_node = 'B'
shortest_path = get_shortest_path(previous_nodes, destination_node)
print('Shortest path from', initial_node, 'to', destination_node + ':', ' -> '.join(shortest_path))
