module.exports.solve       = solve;
module.exports.getInDegree = getInDegree;
module.exports.getEdges    = getEdges;

function solve(graph) {
    let edges    = getEdges(graph);
    let inDegree = getInDegree(graph, edges);

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
        let u = queue.pop();
        topOrder.push(u);

        // Iterate through dependant nodes of popped node
        // and decrease their in-degree by 1
        for(let [index, value] of graph[u].entries()) {
            inDegree[value]--;
            // If in-degree is 0, add it to queue
            if(inDegree[value] == 0) {
                queue.push(value);
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

function getInDegree(graph, edges) {
    // Creating a map to store in-degrees of all vertices
    let inDegree = {};

    for(let key in graph) {
        inDegree[key] = 0;
    }

    // Traverse the edges list and increase in-degrees per
    for(let [src, dest] of edges) {
        inDegree[dest]++;
    }

    return inDegree;
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