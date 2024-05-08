"use client"

import React, { useState } from 'react';


import MatrixForm from "./forms/form2";
import { kruskalMST } from "./methodes/kruskal";
import { Edge } from './methodes/kruskal';
import primMST from './methodes/prim';


//definition d'une structure utile
interface UseState {
  parents: Record<string, string | null>;
  weightsToParent: Record<string, number>;
  totalWeight: number;
}

//definition de la structure du graphe
interface Graph {
  [node: string]: { [adjacentNode: string]: number };
}

//pour verifier si tous les noeuds ont des poids positifs
function areAllWeightsPositive(graph: Graph): boolean {
  for (const node in graph) {
    const adjacentNodes = graph[node];
    for (const adjacentNode in adjacentNodes) {
      const weight = adjacentNodes[adjacentNode];
      if (weight < 0) {
        return false;
      }
    }
  }
  return true;
}

//fonction pour vérifier la connexité du graphe
function isGraphConnected1(graph : Graph){
  const visited: { [key: string]: boolean } = {};
  const nodes = Object.keys(graph);

  function dfs(node : string) {
      visited[node] = true
      for (const neighbor in graph[node]) {
          if (!visited[neighbor]) {
              dfs(neighbor);
          }
      }
  }
  dfs(nodes[0])

  for(const node of nodes){
      if (!visited[node]) {
          return false;
      }
  }

  return true;
}



const Home = () => {

  const [showMatrixForm, setShowMatrixForm] = useState(false);
  const [smt, setMST] = useState<Edge[]>()
  
  const [primREsult, setPrimResult] = useState<UseState>();

  const [numberOfNodes, setNumberOfNodes] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const [error , setError] = useState<string | null>(null)

  const [startNode, setStartNode] = useState('');

  //affiche le formulaire pour le nombre de noeud
  const handleNumberOfNodesSubmit = () => {
    setShowForm(true);
  };

  //affiche la matrice d'adjacence
  const handleAddGraphClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setShowMatrixForm(true);
    setShowForm(false)
  };
  
  //application des algorithmes: cas de Prim
  const handleSubmit2 = (graph: Graph): void => {
    console.log(graph);
    if (!areAllWeightsPositive(graph)) {
      setError("Graphe comportant au moins un poids négatif et donc invalide !")
      if(!isGraphConnected1(graph)){
        setError("Graphe non connexe comportant au moins un poids négatif et donc invalide !")
      }
    }else if (!isGraphConnected1(graph)) {
      setError("Graphe non connexe et donc invalide !")
    }else{
      setPrimResult(primMST(graph, startNode))
      setError(null)
      setStartNode("");
    }
  };

  //application des algorithmes: cas de Kruskal
  const handleSubmit1 = (graph: Graph): void => {
    console.log(graph);
    if (!areAllWeightsPositive(graph)) {
      setError("Graphe comportant au moins un poids négatif et donc invalide !")
      if(!isGraphConnected1(graph)){
        setError("Graphe non connexe comportant au moins un poids négatif et donc invalide !")
      }
    }else if (!isGraphConnected1(graph)) {
      setError("Graphe non connexe et donc invalide !")
    }else{
      setMST(kruskalMST(graph))
      setError(null)
    }
  };
  

  return (
    <div>
    {showMatrixForm ? (
      <div>
        <MatrixForm startNode={startNode} setStartNode={setStartNode}  setError={setError} error={error} primREsult={primREsult? primREsult : undefined} nodeCount={numberOfNodes} onSubmit1={handleSubmit1} onSubmit2={handleSubmit2} smt={smt} />
      </div>
    ) : (
      <button
        onClick={handleNumberOfNodesSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Ajouter un graphique
      </button>
    )}

    {showForm && (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
      <div className="bg-orange-500 rounded p-8 max-w-md">
        <form onSubmit={handleAddGraphClick}>
          <label>
            <h1 className="text-xl font-bold text-white">Quel est le nombre de noeud ?</h1>
          </label>
          <input
              className="p-2 text-xl font-bold"
              type="number"
              value={numberOfNodes}
              onChange={(e) => setNumberOfNodes(parseFloat(e.target.value))}
            />
          <div className='flex space-x-15 mt-5'>
            <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2"
            >
                Valider
            </button>
            <button 
            className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => {setShowForm(false)}}
            >
             Annuler
            </button>
          </div>
        </form>
        </div>
      </div>
      )}
  </div>
  );
};

export default Home;