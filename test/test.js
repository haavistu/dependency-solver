var assert = require('chai').assert;
var solve  = require('../').solve;

describe('solve()', function() {
    it('should solve a valid graph', function() {
        let graph = {
            'task_3': ['task_2', 'task_1'],
            'task_4': ['task_2', 'task_1', 'task_3'],
            'task_1': [],
            'task_2': ['task_1'],
            'task_5': ['task_4', 'task_1', 'task_3', 'task_2'],
        }

        let solved = ['task_5', 'task_4', 'task_3', 'task_2', 'task_1'];

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