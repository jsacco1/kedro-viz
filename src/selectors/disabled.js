import { createSelector } from 'reselect';
import { arrayToObject } from '../utils';
import { getNodeDisabledPipeline, getPipelineNodeIDs } from './pipeline';
import { getTagCount } from './tags';
import {
  getFocusedModularPipeline,
  getNodeIDsInFocusedModularPipeline,
  getInputOutputIDsForModularPipeline,
  getInputOutputIDsForFocusedModularPipeline,
  getContractedModularPipelineIDs,
  getModularPipelineNodes,
} from './modular-pipelines';

const getNodeIDs = (state) => state.node.ids;
const getNodeDisabledNode = (state) => state.node.disabled;
const getNodeTags = (state) => state.node.tags;
const getNodeType = (state) => state.node.type;
const getTagEnabled = (state) => state.tag.enabled;
const getNodeTypeDisabled = (state) => state.nodeType.disabled;
const getEdgeIDs = (state) => state.edge.ids;
const getEdgeSources = (state) => state.edge.sources;
const getEdgeTargets = (state) => state.edge.targets;
const getLayerIDs = (state) => state.layer.ids;
const getLayersVisible = (state) => state.layer.visible;
const getNodeLayer = (state) => state.node.layer;

/**
 * Calculate whether nodes should be disabled based on their tags
 */
export const getNodeDisabledTag = createSelector(
  [getNodeIDs, getTagEnabled, getTagCount, getNodeTags],
  (nodeIDs, tagEnabled, tagCount, nodeTags) =>
    arrayToObject(nodeIDs, (nodeID) => {
      if (tagCount.enabled === 0) {
        return false;
      }
      if (nodeTags[nodeID].length) {
        // Hide task nodes that don't have at least one tag filter enabled
        return !nodeTags[nodeID].some((tag) => tagEnabled[tag]);
      }
      return true;
    })
);

/**
 * Calculate whether nodes should be disabled based on their modular pipelines,
 * except related dataset nodes and parameter nodes that are input and output
 * to the currently selected modular pipeline under focus mode
 */
export const getNodeDisabledModularPipeline = createSelector(
  [
    getNodeIDs,
    getNodeIDsInFocusedModularPipeline,
    getInputOutputIDsForFocusedModularPipeline,
    getFocusedModularPipeline,
  ],
  (
    nodeIDs,
    nodeIDsInFocusedModularPipeline,
    inputOutputIDs,
    focusedModularPipeline
  ) => {
    return arrayToObject(nodeIDs, (nodeID) => {
      // for a node to be disabled via modular pipeline,
      // there needs to be a focused modular pipeline and
      // the node doesn't belong in the pipeline and
      // it is not an input or output of said pipeline.
      return (
        focusedModularPipeline !== null &&
        !nodeIDsInFocusedModularPipeline.has(nodeID) &&
        !inputOutputIDs.has(nodeID)
      );
    });
  }
);

export const getNodeDisabledViaContraction = createSelector(
  [
    getModularPipelineNodes,
    getContractedModularPipelineIDs,
    getEdgeIDs,
    getEdgeSources,
    getEdgeTargets,
    getNodeType,
  ],
  (
    modularPipelineNodes,
    contractedModularPipelineIDs,
    edgeIDs,
    edgeSources,
    edgeTargets,
    nodeType
  ) => {
    const disabledNodesViaContraction = {};
    for (const id of contractedModularPipelineIDs) {
      const modularPipelineNodeIds = modularPipelineNodes[id];
      const inputOutputIDs = getInputOutputIDsForModularPipeline(
        modularPipelineNodeIds,
        edgeIDs,
        edgeSources,
        edgeTargets,
        nodeType
      );
      modularPipelineNodes[id].forEach(
        (nodeID) =>
          (disabledNodesViaContraction[nodeID] = !inputOutputIDs.has(nodeID))
      );
    }
    return disabledNodesViaContraction;
  }
);

/**
 * Set disabled status if the node is specifically hidden, and/or via a tag/view/type/modularPipeline
 */
export const getNodeDisabled = createSelector(
  [
    getNodeIDs,
    getNodeDisabledNode,
    getNodeDisabledTag,
    getNodeDisabledModularPipeline,
    getNodeDisabledViaContraction,
    getNodeDisabledPipeline,
    getNodeType,
    getNodeTypeDisabled,
  ],
  (
    nodeIDs,
    nodeDisabledNode,
    nodeDisabledTag,
    nodeDisabledModularPipeline,
    nodeDisabledViaContraction,
    nodeDisabledPipeline,
    nodeType,
    typeDisabled
  ) => {
    return arrayToObject(nodeIDs, (id) =>
      [
        nodeDisabledNode[id],
        nodeDisabledTag[id],
        nodeDisabledModularPipeline[id],
        nodeDisabledViaContraction[id],
        nodeDisabledPipeline[id],
        typeDisabled[nodeType[id]],
      ].some(Boolean)
    );
  }
);

/**
 * Get a list of just the IDs for the remaining visible nodes
 */
export const getVisibleNodeIDs = createSelector(
  [getPipelineNodeIDs, getNodeDisabled],
  (nodeIDs, nodeDisabled) => nodeIDs.filter((id) => !nodeDisabled[id])
);

/**
 * Get a list of just the IDs for the remaining visible layers
 */
export const getVisibleLayerIDs = createSelector(
  [getVisibleNodeIDs, getNodeLayer, getLayerIDs, getLayersVisible],
  (nodeIDs, nodeLayer, layerIDs, layersVisible) => {
    if (!layersVisible) {
      return [];
    }
    const visibleLayerIDs = {};
    for (const nodeID of nodeIDs) {
      visibleLayerIDs[nodeLayer[nodeID]] = true;
    }
    return layerIDs.filter((layerID) => visibleLayerIDs[layerID]);
  }
);

/**
 * Determine whether an edge should be disabled based on their source/target nodes
 */
export const getEdgeDisabled = createSelector(
  [getEdgeIDs, getNodeDisabled, getEdgeSources, getEdgeTargets],
  (edgeIDs, nodeDisabled, edgeSources, edgeTargets) =>
    arrayToObject(edgeIDs, (edgeID) => {
      const source = edgeSources[edgeID];
      const target = edgeTargets[edgeID];
      return Boolean(nodeDisabled[source] || nodeDisabled[target]);
    })
);
