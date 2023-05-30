import Edge from '../models/Edge';

return class Vertex {
	constructor(value) {
		this.value = value;
		this.edges = [];
	}

	addEdge(vertexDestination) {
		!this.containEdge(vertexDestination) &&
			this.edges.push(new Edge(this, vertexDestination));
	}

	containEdge(destination) {
		this.edges.map((vertex) => {
			if (vertex.destination === destination) return true;
		});

		return false;
	}
};
