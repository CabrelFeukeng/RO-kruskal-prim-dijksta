
import React from 'react'

//interface pour definir les listes d'adjacences
interface Graph {
    [key: string]: { [key: string]: number };
}

//definition de la classe sommet
class Vertex {
    id : String;
    parent : Vertex;
    rank : number;

    constructor(id : String) {
      this.id = id;
      this.parent = this;
      this.rank = 0;
    }
}

//definition de la classe arret
export class Edge {
    u : string;
    v :string;
    weight : number;

    constructor(u: string, v: string, weight: number) {
      this.u = u;
      this.v = v;
      this.weight = weight;
    }
}

// initialise les sommets comment des partie disjointes
const makeSet = (vertex :String) => {
    return new Vertex(vertex)
}

//function pour chercher l'ensemble racine d'un sommet donné (chemin par compression)
const findSet = (vertex : Vertex) => {
    if (vertex !== vertex.parent) {
        vertex.parent = findSet(vertex.parent);
      }
      return vertex.parent;
}


//fonction pour fusionner les ensemble selon leur rang
const union = (u: Vertex, v: Vertex) => {
    const rootU = findSet(u);
    const rootV = findSet(v);
  
    if (rootU === rootV) {
      return; 
    }
  
    if (rootU.rank < rootV.rank) {
      rootU.parent = rootV;
    } else if (rootU.rank > rootV.rank) {
      rootV.parent = rootU;
    } else {
      rootV.parent = rootU;
      rootU.rank++;
    }
}


// Fonction pour calculer l'arbre couvrant de poids minimum (MST) en utilisant l'algorithme de Kruskal
export function kruskalMST(graph: Graph) {
    const mst = []; 
  
    const sets: { [key: string]: Vertex } = {};
    for (const vertex of Object.keys(graph)) {
    sets[vertex] = makeSet(vertex);
    }
  
    const edges = [];
    for (const [u, neighbors] of Object.entries(graph)) {
      for (const [v, weight] of Object.entries(neighbors)) {
        edges.push(new Edge(u, v, weight));
      }
    }
    edges.sort((a, b) => a.weight - b.weight);
  
    
    for (const edge of edges) {
      const rootU = findSet(sets[edge.u]);
      const rootV = findSet(sets[edge.v]);
  
       if (rootU !== rootV) {
        mst.push(edge);
        union(sets[edge.u], sets[edge.v]);
      }
    }
  
    return mst;
  }

