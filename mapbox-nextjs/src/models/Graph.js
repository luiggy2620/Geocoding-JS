import Vertex from '../models/Vertex';

return class Graph {
	constructor() {
		this.vertices = new Map();
	}

	addVertexByValue(valueVertexA, valueVertexB) {
		!this.contains(valueVertexA) &&
			this.vertices.push(new Vertex(valueVertexA));
		!this.contains(valueVertexB) && this.vertices.push(valueVertexB);

		this.addVertex(new Vertex(valueVertexA), new Vertex(valueVertexB));
	}

	addVertex(vertexSource, vertexDestination) {
		vertexSource.addEdge(vertexDestination);
	}

	contains(valueVertex) {
		this.vertices.map((vertex) => {
			if (vertex.value === valueVertex) {
				return true;
			}
		});

		return false;
	}

	get(valueVertex) {
		let vertexFound = null;
		this.vertices.map((vertex) => {
			if (vertex.value === valueVertex) {
				return vertex;
			}
		});

		if (vertexFound === null) {
			vertexFound = new Vertex(valueVertex);
			return vertexFound;
		}
	}

	size() {
		return this.vertices.length;
	}

	isEmpty() {
		return this.vertices.length === 0;
	}
};
