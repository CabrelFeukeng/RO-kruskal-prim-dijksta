

interface Graph {
    [node: string]: { [adjacentNode: string]: number };
  }
  

class GraphComponent extends React.Component<Graph>{
    constructor(props: Graph) {
        super(props);
        };
}
