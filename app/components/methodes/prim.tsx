//interface pour la definition des graphes
interface Graph {
    [key: string]: { [key: string]: number };
}


// Fonction pour calculer l'arbre couvrant de poids minimum (MST) en utilisant l'algorithme de Prim
export default function primMST(graph: Graph, root: string) {
    const keys: Record<string, number> = {};
    const parents: Record<string, string | null> = {};
    const Q: Set<string> = new Set();
    const weightsToParent: Record<string, number> = {};
  
    for (const vertex of Object.keys(graph)) {
      keys[vertex] = Infinity;
      parents[vertex] = null;
      Q.add(vertex);
    }
  
    keys[root] = 0;
  
    while (Q.size > 0) {
        let u: string | null = null;
     
      for (const vertex of Q) {
        if (u === null || keys[vertex] < keys[u]) {
          u = vertex;
        }
      }
      if(u !== null){
        Q.delete(u);
      }
      
      if (u !== null) {
        for (const v of Object.keys(graph[u])) {
            if (Q.has(v) && graph[u][v] < keys[v]) {
              parents[v] = u;
              keys[v] = graph[u][v];
              weightsToParent[v] = graph[u][v];
            }
          }
      }
      
      
    }
  
    let totalWeight = 0; 
    for (const vertex in weightsToParent) {
      totalWeight += weightsToParent[vertex];
    }
  
    return {
      parents,
      weightsToParent,
      totalWeight,
    };
  }
    
