import { createSelector } from 'reselect';

export const getModularPipelineIDs = (state) => state.modularPipeline.ids;
export const getFocusedModularPipeline = (state) =>
  state.visible.modularPipelineFocusMode;
const getModularPipelineName = (state) => state.modularPipeline.name;
const getModularPipelineEnabled = (state) => state.modularPipeline.enabled;
const getModularPipelineNodes = (state) => state.modularPipeline.nodes;
const getEdgeIDs = (state) => state.edge.ids;
const getEdgeSources = (state) => state.edge.sources;
const getEdgeTargets = (state) => state.edge.targets;

/**
 * Retrieve the formatted list of modular pipeline filters
 */
export const getModularPipelineData = createSelector(
  [getModularPipelineIDs, getModularPipelineName, getModularPipelineEnabled],
  (modularPipelineIDs, modularPipelineName, modularPipelineEnabled) =>
    modularPipelineIDs
      .slice()
      .sort()
      .map((id) => ({
        id,
        name: modularPipelineName[id],
        enabled: Boolean(modularPipelineEnabled[id]),
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

export const getExternalInputOutputIDsForFocusedModularPipeline =
  createSelector(
    [
      getNodeIDsInFocusedModularPipeline,
      getEdgeIDs,
      getEdgeSources,
      getEdgeTargets,
    ],
    (focusedModularPipelineNodeIDs, edgeIDs, edgeSources, edgeTargets) => {
      const result = new Set();
      for (const edgeID of edgeIDs) {
        const source = edgeSources[edgeID];
        const target = edgeTargets[edgeID];
        if (
          focusedModularPipelineNodeIDs.has(source) &&
          !focusedModularPipelineNodeIDs.has(target)
        ) {
          result.add(target);
        } else if (
          !focusedModularPipelineNodeIDs.has(source) &&
          focusedModularPipelineNodeIDs.has(target)
        ) {
          result.add(source);
        }
      }
      return result;
    }
  );
