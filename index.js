class Graph {
    constructor() {
      this.nodes = new Set()
      this.edges = {}
    }
  
    addNode(node) {
      this.nodes.add(node)
      this.edges[node] = []
    }
  
    addEdge(node1, node2, weight) {
      this.edges[node1].push({ node: node2, weight })
      this.edges[node2].push({ node: node1, weight })
    }
  }
  
  function dijkstra(graph, initialNode) {
    const distances = {}
    const previousNodes = {}
    const visitedNodes = new Set()
  
    for (const node of graph.nodes) {
      distances[node] = Infinity
      previousNodes[node] = null
    }
  
    distances[initialNode] = 0
  
    while (visitedNodes.size < graph.nodes.size) {
      const currentNode = getNodeWithSmallestDistance(distances, visitedNodes)
      visitedNodes.add(currentNode)
  
      for (const edge of graph.edges[currentNode]) {
        const { node, weight } = edge
        const newDistance = distances[currentNode] + weight
        if (newDistance < distances[node]) {
          distances[node] = newDistance
          previousNodes[node] = currentNode
        }
      }
    }
  
    return { distances, previousNodes }
  }
  
  function getNodeWithSmallestDistance(distances, visitedNodes) {
    let smallestDistance = Infinity
    let smallestNode = null
  
    for (const node in distances) {
      if (!visitedNodes.has(node) && distances[node] < smallestDistance) {
        smallestNode = node
        smallestDistance = distances[node]
      }
    }
  
    return smallestNode
  }
  
  // Function to get the shortest path from the initial node to a destination node
  function getShortestPath(previousNodes, destinationNode) {
    const path = [destinationNode]
    while (previousNodes[destinationNode] !== null) {
      destinationNode = previousNodes[destinationNode]
      path.push(destinationNode)
    }
    return path.reverse() // Reverse the path to be in the correct order
  }
  
  // Example of usage
  const graph = new Graph()
  
  graph.addNode('A')
  graph.addNode('B')
  graph.addNode('C')
  graph.addNode('D')
  graph.addNode('E')
  graph.addNode('F')
  graph.addNode('G')
  
  graph.addEdge('A', 'C', 3)
  graph.addEdge('A', 'F', 2)
  graph.addEdge('F', 'C', 2)
  graph.addEdge('F', 'E', 3)
  graph.addEdge('F', 'B', 6)
  graph.addEdge('F', 'G', 5)
  graph.addEdge('C', 'D', 4)
  graph.addEdge('C', 'E', 1)
  graph.addEdge('D', 'B', 1)
  graph.addEdge('E', 'B', 2)
  
  const initialNode = 'A'
  const { distances, previousNodes } = dijkstra(graph, initialNode)
  
  console.log('Graph:', graph.nodes)
  console.log('Minimum distances from node ' + initialNode + ':')
  for (const node in distances) {
    console.log(node + ': ' + distances[node])
  }
  
  // Example of how to get the shortest path from A to B
  const destinationNode = 'B'
  const shortestPath = getShortestPath(previousNodes, destinationNode)
  console.log(
    'Shortest path from ' +
      initialNode +
      ' to ' +
      destinationNode +
      ': ' +
      shortestPath.join(' -> ')
  )
  