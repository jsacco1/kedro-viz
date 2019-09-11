import { createSelector } from 'reselect';

const getEdges = state => state.edges;
const getEdgeSources = state => state.edgeSources;
const getEdgeTargets = state => state.edgeTargets;
const getFocusedNode = state => state.nodeFocused;

/**
 * Recursively search through the edges data for ancestor and descendant nodes
 * @param {Array} edges
 * @param {string} nodeID
 */
export const getLinkedNodes = createSelector(
  [getEdges, getEdgeSources, getEdgeTargets, getFocusedNode],
  (edges, edgeSources, edgeTargets, nodeID) => {
    if (!nodeID) {
      return {};
    }

    const linkedNodes = {
      [nodeID]: true
    };

    const traverseGraph = (prev, next) => {
      (function walk(id) {
        edges.forEach(edge => {
          if (prev[edge] === id) {
            linkedNodes[next[edge]] = true;
            walk(next[edge]);
          }
        });
      })(nodeID);
    };

    const direction = [edgeSources, edgeTargets];
    traverseGraph.apply(null, direction);
    traverseGraph.apply(null, direction.reverse());

    return linkedNodes;
  }
);
