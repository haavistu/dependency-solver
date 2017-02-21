module.exports.solve              = solve;
module.exports.addMissingKeys     = addMissingKeys;
module.exports.getEdges           = getEdges;
module.exports.getInDegree        = getInDegree;

// Alternative domain-specific aliases
module.exports.getDependencyLines = getEdges;
module.exports.getDependedBy      = getInDegree;

function solve(g) {
    let graph    = addMissingKeys(g);
    let edges    = getEdges(graph);
    let inDegree = getInDegree(graph);

    // Create a queue and enqueue vertices with in-degree of 0
    let queue    = []; 

    for(let key in graph) {
        if(inDegree[key] == 0) {
            queue.push(key);
        }
    }

    // Count of visited vertices to compare against graph's length
    // Useful for detecting circular dependency in the graph
    let count    = 0;
    let topOrder = [];

    while(queue.length > 0) {
        // Extract front of queue and add it to topological order
        let u = queue.shift();
        topOrder.unshift(u);

        // Iterate through dependant nodes of popped node
        // and decrease their in-degree by 1
        for(let [index, value] of graph[u].entries()) {
            inDegree[value]--;
            // If in-degree is 0, add it to queue
            if(inDegree[value] == 0) {
                queue.unshift(value);
            }
        }

        count++;
    }

    if(count !== Object.keys(graph).length) {
        throw new Error('There is a circular dependency in the graph');
    } else {
        return topOrder;
    }
}

function addMissingKeys(graph) {
    // Add all the missing keys to the graph as nodes with no in-degrees
    for(let key in graph) {
        for(let [index, value] of graph[key].entries()) {
            if(graph[value] === undefined) {
                graph[value] = [];
            }
        }
    }

    return graph;
}

function getEdges(graph) {
    let edges = [];
    for(let key in graph) {
        let edge = [];
        // If graph node has any in-degrees add the pair to edge list
        for(let item of graph[key]) {
            if(graph[key].length > 0) {
                edges.push([key, item]);
            }
        }
    }
    return edges;
}

function getInDegree(graph) {
    // Creating a map to store in-degrees of all vertices
    let inDegree = {};

    for(let key in graph) {
        for(let indeg of graph[key]) {
            // Traverse the graph and fill in-degrees. Since complete graph has keys
            // with no in-degrees, add them as nodes with 0 in-degrees
            inDegree[indeg] = inDegree[indeg] === undefined ? 1 : ++inDegree[indeg];
            inDegree[key]   = inDegree[key] || 0;
        }
    }

    return inDegree;
}
