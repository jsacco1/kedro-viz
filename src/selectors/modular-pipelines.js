import { createSelector } from 'reselect';
import { getPipelineModularPipelineIDs } from './pipeline';

export const getModularPipelineIDs = (state) => state.modularPipeline.ids;
export const getFocusedModularPipeline = (state) =>
  state.visible.modularPipelineFocusMode;
const getModularPipelineName = (state) => state.modularPipeline.name;
const getModularPipelineEnabled = (state) => state.modularPipeline.enabled;
const getPrettyName = (state) => state.prettyName;

/**
 * Retrieve the formatted list of modular pipeline filters
 */
export const getModularPipelineData = createSelector(
  [
    getModularPipelineIDs,
    getModularPipelineName,
    getModularPipelineEnabled,
    getPrettyName,
  ],
  (
    modularPipelineIDs,
    modularPipelineName,
    modularPipelineEnabled,
    prettyName
  ) => {
    return modularPipelineIDs
      .slice()
      .sort()
      .map((id) => ({
        id,
        name: prettyName ? modularPipelineName[id] : id,
        enabled: Boolean(modularPipelineEnabled[id]),
      }));
  }
);

/**
 * Get the total and enabled number of modular pipelines
 */
export const getModularPipelineCount = createSelector(
  [getPipelineModularPipelineIDs, getModularPipelineEnabled],
  (modularPipelineIDs, modularPipelineEnabled) => ({
    total: modularPipelineIDs.length,
    enabled: modularPipelineIDs.filter((id) => modularPipelineEnabled[id])
      .length,
  })
);
