# Dependency Solver

A tiny dependency solver using topological sorting. Returns a list of nodes where no node comes before it's dependencies. Detects circular dependencies.

![dep-solver](https://cloud.githubusercontent.com/assets/25879989/23119012/16dce47a-f75f-11e6-9ae3-98a497ffe0d0.png)

## Usage

```javascript
var solve = require('dependency-solver').solve;

var graph = {
    'A': ['B', 'C'],
    'B': ['C', 'D']
}

solve(graph);
// -> [ 'C', 'D', 'B', 'A' ]

```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
