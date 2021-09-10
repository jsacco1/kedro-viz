import { createSelector } from 'reselect';
import { arrayToObject } from '../utils';

export const getModularPipelineIDs = (state) => state.modularPipeline.ids;
export const getModularPipelineContracted = (state) =>
  state.modularPipeline.contracted;
export const getFocusedModularPipeline = (state) =>
  state.visible.modularPipelineFocusMode;
export const getModularPipelineNodes = (state) => state.modularPipeline.nodes;
const getModularPipelineName = (state) => state.modularPipeline.name;
const getEdgeIDs = (state) => state.edge.ids;
const getEdgeSources = (state) => state.edge.sources;
const getEdgeTargets = (state) => state.edge.targets;
const getNodeType = (state) => state.node.type;

export const getContractedModularPipelineIDs = createSelector(
  [getModularPipelineIDs, getModularPipelineContracted],
  (modularPipelineIDs, modularPipelineContracted) =>
    modularPipelineIDs.filter((id) => modularPipelineContracted[id])
);

/**
 * Retrieve the formatted list of modular pipeline filters
 */
export const getModularPipelineData = createSelector(
  [getModularPipelineIDs, getModularPipelineName],
  (modularPipelineIDs, modularPipelineName, modularPipelineEnabled) =>
    modularPipelineIDs
      .slice()
      .sort()
      .map((id) => ({
        id,
        name: modularPipelineName[id],
        enabled: true,
      }))
);

export const getNodeIDsInFocusedModularPipeline = createSelector(
  [getModularPipelineNodes, getFocusedModularPipeline],
  (modularPipelineNodes, focusedModularPipeline) => {
    return focusedModularPipeline === null
      ? new Set()
      : modularPipelineNodes[focusedModularPipeline.id];
  }
);

export function getInputOutputIDsForModularPipeline(
  focusedModularPipelineNodeIDs,
  edgeIDs,
  edgeSources,
  edgeTargets,
  nodeType
) {
  const internalNodes = arrayToObject(focusedModularPipelineNodeIDs, (nodeID) =>
    nodeType[nodeID] === 'task'
      ? {
          hasSource: true,
          hasTarget: true,
        }
      : {
          hasSource: false,
          hasTarget: false,
        }
  );
  const externalNodes = {};

  for (const edgeID of edgeIDs) {
    const source = edgeSources[edgeID];
    const target = edgeTargets[edgeID];

    if (
      focusedModularPipelineNodeIDs.has(source) &&
      focusedModularPipelineNodeIDs.has(target)
    ) {
      Object.assign(internalNodes, {
        [target]: { ...internalNodes[target], hasSource: true },
        [source]: { ...internalNodes[source], hasTarget: true },
      });
    } else if (
      focusedModularPipelineNodeIDs.has(source) &&
      !focusedModularPipelineNodeIDs.has(target)
    ) {
      externalNodes[target] = true;
    } else if (
      !focusedModularPipelineNodeIDs.has(source) &&
      focusedModularPipelineNodeIDs.has(target)
    ) {
      externalNodes[source] = true;
    }
  }

  const res = new Set([
    ...Object.keys(internalNodes).filter(
      (id) => !internalNodes[id].hasSource || !internalNodes[id].hasTarget
    ),
    ...Object.keys(externalNodes),
  ]);
  return res;
}

export const getInputOutputIDsForFocusedModularPipeline = createSelector(
  [
    getNodeIDsInFocusedModularPipeline,
    getEdgeIDs,
    getEdgeSources,
    getEdgeTargets,
    getNodeType,
  ],
  getInputOutputIDsForModularPipeline
);
