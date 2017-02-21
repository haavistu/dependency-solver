var assert          = require('chai').assert;
var solve           = require('../').solve;
var addMissingKeys  = require('../').addMissingKeys;
var getEdges        = require('../').getEdges;
var getInDegree     = require('../').getInDegree;

describe('solve()', function() {
    it('should solve a valid graph', function() {
        let graph = {
            'task_3': ['task_2', 'task_1'],
            'task_4': ['task_2', 'task_1', 'task_3'],
            'task_1': [],
            'task_2': ['task_1'],
            'task_5': ['task_4', 'task_1', 'task_3', 'task_2'],
        }

        let solved = ['task_1', 'task_2', 'task_3', 'task_4', 'task_5'];

        assert.deepEqual(solve(graph), solved);
    });

    it('should solve a graph with missing keys', function() {
        let graph = {
            'task_1': ['task_2'],
            'task_2': ['task_3', 'task_4', 'task_5', 'task_6', 'task_7'],
        }

        let solved = ['task_3', 'task_4', 'task_5', 'task_6','task_7', 'task_2', 'task_1'];

        assert.deepEqual(solve(graph), solved);
    });

    it('should solve an empty graph', function() {
        assert.deepEqual(solve({}), []);
    });

    it('should throw an exception on circular dependency in graph', function() {
        let graph = {
            'task_1': ['task_2'],
            'task_2': ['task_1']
        }
        assert.throws(() => solve(graph), 'There is a circular dependency in the graph');
    });
});

describe('addMissingKeys()', function() {
    it('should add missing keys to incomplete graph', function() {
        let graph = {
            'task_1': ['task_2', 'task_3']
        }

        let solved = {
            'task_1': ['task_2', 'task_3'],
            'task_2': [],
            'task_3': []
        }

        assert.deepEqual(addMissingKeys(graph), solved);
    });

    it('should not alter complete graph', function() {
        let graph = {
            'task_1': ['task_2', 'task_3'],
            'task_2': [],
            'task_3': []
        }

        assert.deepEqual(addMissingKeys(graph), graph);
    });
});

describe('getEdges()', function() {
    it('should compute correct edges to a complete graph', function() {
        let graph = {
            'task_1': ['task_2', 'task_3'],
            'task_2': ['task_3'],
            'task_3': []
        }

        let solved = [ 
            ['task_1', 'task_2'],
            ['task_1', 'task_3'],
            ['task_2', 'task_3']
        ]

        assert.deepEqual(getEdges(graph), solved);
    });

    it('should compute correct edges to an incomplete graph', function() {
        let graph = {
            'task_1': ['task_2', 'task_3', 'task_4'],
            'task_2': ['task_3']
        }

        let solved = [ 
            ['task_1', 'task_2'],
            ['task_1', 'task_3'],
            ['task_1', 'task_4'],
            ['task_2', 'task_3']
        ]

        assert.deepEqual(getEdges(graph), solved);
    });
});

describe('getInDegree()', function() {
    it('should compute correct in-degree for a complete graph', function() {
        let graph = {
            'task_1': ['task_2', 'task_3'],
            'task_2': ['task_3'],
            'task_3': []
        }

        let solved = {
            'task_1': 0,
            'task_2': 1, 
            'task_3': 2
        };

        assert.deepEqual(getInDegree(graph), solved);
    });

    it('should compute correct in-degree for an incomplete graph', function() {
        let graph = {
            'task_1': ['task_2', 'task_3'],
            'task_2': ['task_3'],
        }

        let solved = {
            'task_1': 0,
            'task_2': 1, 
            'task_3': 2
        };

        assert.deepEqual(getInDegree(graph), solved);
    });
});