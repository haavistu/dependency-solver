# Dependency Solver

[![Build Status](https://travis-ci.org/haavistu/dependency-solver.svg?branch=master)](https://travis-ci.org/haavistu/dependency-solver)

A tiny dependency solver using topological sorting. Returns a list of nodes where no node comes before it's dependencies.  

![dep-solver](https://cloud.githubusercontent.com/assets/25879989/23125249/7cd12be6-f779-11e6-87c2-721baa84402d.png)

## Usage

Nodes can be in any order. Any valid property name is a valid node. Circular dependencies throw an error.

```javascript
var { solve } = require('dependency-solver');

var graph = {
    'A': ['B', 'C', 'F'],
    'B': ['C', 'D'],
    'F': ['E'],
    'C': ['D', 'E']
}

solve(graph);
// -> [ 'D', 'E', 'C', 'B', 'F', 'A' ]
```

You can also compute how many nodes depend on a particular node and dependency lines between nodes.

```javascript
var { getEdges, getInDegree } = require('dependency-solver');

getDependedBy(graph);
// -> { 'B': 1, 
//      'A': 0, 
//      'C': 2, 
//      'F': 1, 
//      'D': 2, 
//      'E': 2 }

getDependencyLines(graph);
// -> [ [ 'A', 'B' ],
//      [ 'A', 'C' ],
//      [ 'A', 'F' ],
//      [ 'B', 'C' ],
//      [ 'B', 'D' ],
//      [ 'F', 'E' ],
//      [ 'C', 'D' ],
//      [ 'C', 'E' ] ]
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
