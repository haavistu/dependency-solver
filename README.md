# Dependency Solver

A tiny dependency solver using topological sorting. Returns a list of nodes where no node comes before it's dependencies.  

![dep-solver](https://cloud.githubusercontent.com/assets/25879989/23125249/7cd12be6-f779-11e6-87c2-721baa84402d.png)

## Usage

```javascript
var solve = require('dependency-solver').solve;

var graph = {
    'A': ['B', 'C', 'F'],
    'B': ['C', 'D'],
    'C': ['D', 'E'],
    'F': ['E']
}

solve(graph);
// -> [ 'D', 'E', 'C', 'B', 'F', 'A' ]
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
