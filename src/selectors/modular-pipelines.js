import { createSelector } from 'reselect';

export const getModularPipelineIDs = (state) => state.modularPipeline.ids;
export const getFocusedModularPipeline = (state) =>
  state.visible.modularPipelineFocusMode;
const getModularPipelineName = (state) => state.modularPipeline.name;
const getModularPipelineEnabled = (state) => state.modularPipeline.enabled;

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
