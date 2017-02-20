# Dependency Solver

A tiny dependency solver using topological sorting. Returns a list of nodes where no node comes before it's dependencies.  

![dep-solver](https://cloud.githubusercontent.com/assets/25879989/23125100/d6357012-f778-11e6-8318-0a04892f54be.png)

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
