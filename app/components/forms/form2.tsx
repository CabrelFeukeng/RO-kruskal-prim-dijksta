"use client"
import React, { useState } from 'react';
import { Edge } from '../methodes/kruskal';
import { AiOutlineWarning, AiOutlineCloseCircle } from 'react-icons/ai';



//interface utile
interface UseState {
  parents: Record<string, string | null>;
  weightsToParent: Record<string, number>;
  totalWeight: number;
}

//definition des props
interface MatrixFormProps {
  nodeCount: number;
  onSubmit1: (graph: Graph) => void;
  onSubmit2: (graph: Graph) => void;
  smt: Edge[] | undefined;
  primREsult: UseState | undefined;
  error : string | null;
  setError : (err: string | null) => void;
  startNode: string;
  setStartNode: (node : string) => void
}

//interface de graph
interface Graph {
  [node: string]: { [adjacentNode: string]: number };
}


const MatrixForm: React.FC<MatrixFormProps> = ({startNode, setStartNode, error, primREsult, nodeCount, onSubmit1, onSubmit2, smt, setError }) => {
  const [matrix, setMatrix] = useState<number[][]>(initializeMatrix(nodeCount));
  const [totalWeight, setTotalWeight] = useState<undefined | string>(undefined)
  

  const [showForm, setShowForm] = useState(false);
  
  const handleShowForm = () => {
    setShowForm(true);
  };

  const HandleError = () => {
    setError(null);
  }

  //pour les options de noeuds
  const renderNodeOptions = () => {
    const options = [];

    for (let i = 1; i <= nodeCount; i++) {
      const node = `N${i}`;
      options.push(<option key={node} value={node}>{node}</option>);
    }

    return options;
  };

  //changement des valeurs du tableau
  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    if (rowIndex <= colIndex) {
      return;
    }

    const newValue = parseInt(value);
    if (isNaN(newValue)) {
      return;
    }

    const updatedMatrix = [...matrix];
    updatedMatrix[rowIndex][colIndex] = newValue;
    setMatrix(updatedMatrix);
  };

  //Kruskal
  const handleSubmit1 = () => {
    const graph: Graph = {};
    const nodeLabels = Array.from({ length: nodeCount }, (_, index) => `N${index + 1}`);

    for (let i = 0; i < nodeCount; i++) {
      const nodeLabel = nodeLabels[i];
      graph[nodeLabel] = {};

      for (let j = 0; j < nodeCount; j++) {
        if (i > j && matrix[i][j] !== undefined) {
          const adjacentNodeLabel = nodeLabels[j];
          graph[nodeLabel][adjacentNodeLabel] = matrix[i][j];
          graph[adjacentNodeLabel][nodeLabel] = matrix[i][j];
        }
      }
    }
    onSubmit1(graph);
    setTotalWeight(`Poids total : ${smt?.reduce((sum, edge) => sum + edge.weight, 0)}`)
  };

  //Prim
  const handleSubmit2 = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowForm(false);
    const graph: Graph = {};
    const nodeLabels = Array.from({ length: nodeCount }, (_, index) => `N${index + 1}`);

    for (let i = 0; i < nodeCount; i++) {
      const nodeLabel = nodeLabels[i];
      graph[nodeLabel] = {};

      for (let j = 0; j < nodeCount; j++) {
        if (i > j && matrix[i][j] !== undefined) {
          const adjacentNodeLabel = nodeLabels[j];
          graph[nodeLabel][adjacentNodeLabel] = matrix[i][j];
          graph[adjacentNodeLabel][nodeLabel] = matrix[i][j];
        }
      }
    }
    onSubmit2(graph);
  };

  return (
    <div className="flex justify-center">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Entrez les données la matrice d'adjacence</h2>
        <table className="border-collapse">
          <thead>
            <tr>
              <th></th>
              {Array.from({ length: nodeCount }, (_, index) => (
                <th key={index}>N{index + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th className="p-3">N{rowIndex + 1}</th>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className={`p-3 border ${rowIndex <= colIndex ? 'bg-gray-100' : ''}`}>
                    {rowIndex <= colIndex ? '' : (
                      <input
                        type="number"
                        value={cell || ''}
                        onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                        className="w-12 text-center font-bold text-green-500"
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center space-x-4">
            <button
              onClick={handleSubmit1}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Appliquer Kruskal
            </button>
            <button
              onClick={handleShowForm}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Appliquer Prim
            </button>
          </div>
        
          <br /><br /><br /><br />
          <div className="result-container">
              <div className="space-x-200">
                <div>
                  <h1 style={{fontSize: "30px", fontWeight: "bold" , color: 'blue'}}> KRUSKAL ICI :</h1>
                    {!error && smt?.map((edge, index) => (
                      <div>
                          <h1 style={{fontSize: "20px"}} className="result-item" key={index}>{`${edge.u} - ${edge.v}: ${edge.weight}`}</h1><br />
                      </div>
                  ))}
                  {(!error && totalWeight)? <h1 style={{ fontSize: "20px", fontWeight: "bold" }}> {`Poids Minimal : ${smt?.reduce((sum, edge) => sum + edge.weight, 0)}`}</h1> : <h1></h1>}
                  <br /><br />
                </div>
                <div>
                    <h2 style={{fontSize: "30px", fontWeight: "bold", color: 'blue' }}>PRIM ICI :</h2>
                    { primREsult && Object.keys(primREsult.parents).map((vertex) => {
                    if (primREsult.parents[vertex] !== null && primREsult.weightsToParent[vertex] !== undefined) {
                      return (
                        <div key={vertex}>
                          <h1 style={{fontSize: "20px", fontWeight: "bold" }}>{`${primREsult.parents[vertex]} - ${vertex} : ${primREsult.weightsToParent[vertex]}`} </h1>
                          <br />
                        </div>
                      );
                    }
                    return null;
                  })}
                  {(!error && primREsult)? <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>{`Poids Minimal : ${primREsult.totalWeight}`}</h1> : <h1></h1>}
                  <br />
                </div>
              </div>
          </div>
        </div>
        {error && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-accentLightGreen rounded p-8 max-w-md">
              <div className='flex items-center space-x-4'>
                <AiOutlineWarning size={70} color='red'/>
                <p>{error}</p>
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={HandleError}
              >
                 Fermer
              </button>
            </div>
          </div>
        )}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
            <div className="bg-orange-500 rounded p-8 max-w-md">
              <form onSubmit={handleSubmit2}>
                <label className="block text-customBlue text-sm font-bold mb-2">
                  <h1 className="text-xl font-bold text-white">Sélectionnez le nœud de départ :</h1>
                  <select
                    className="p-2 text-xl font-bold"
                    value={startNode}
                    onChange={(e) => setStartNode(e.target.value)}
                  >
                    
                    {renderNodeOptions()}
                  </select>
                </label>
                <div className='flex space-x-15'>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Valider
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={()=>{setShowForm(true)}}
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


const initializeMatrix = (size: number): (number | undefined)[][] => {
  const matrix: (number | undefined)[][] = [];

  for (let i = 0; i < size; i++) {
    const row: (number | undefined)[] = [];

    for (let j = 0; j < size; j++) {
      row.push(i > j ? undefined : 0);
    }

    matrix.push(row);
  }

  return matrix;
};

export default MatrixForm;