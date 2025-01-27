import { mockState } from '../utils/state.mock';
import { getEdgeDisabled } from './disabled';
import {
  addNewEdge,
  getTransitiveEdges,
  getVisibleEdges,
  getInputOutputDataEdges,
} from './edges';
import { toggleNodesDisabled } from '../actions/nodes';
import { toggleFocusMode } from '../actions';
import reducer from '../reducers';

describe('Selectors', () => {
  const { nodes, edges } = mockState.spaceflights.graph;
  const disabledNode = nodes.find((node) =>
    node.name.includes('Train Model')
  ).id;
  const sourceToDisabledNode = edges.find(
    (edge) =>
      edge.target === disabledNode && edge.sourceNode.type !== 'parameters'
  ).source;

  describe('addNewEdge', () => {
    const transitiveEdges = {};
    beforeEach(() => {
      transitiveEdges.edgeIDs = [];
      transitiveEdges.sources = {};
      transitiveEdges.targets = {};
    });

    it('adds a new edge to the list of edge IDs', () => {
      addNewEdge('foo', 'bar', transitiveEdges);
      expect(transitiveEdges.edgeIDs).toEqual(['foo|bar']);
    });

    it('adds a new source to the sources dictionary', () => {
      addNewEdge('source_name', 'target', transitiveEdges);
      expect(transitiveEdges.sources).toEqual({
        'source_name|target': 'source_name',
      });
    });

    it('adds a new target to the targets dictionary', () => {
      addNewEdge('source', 'target name', transitiveEdges);
      expect(transitiveEdges.targets).toEqual({
        'source|target name': 'target name',
      });
    });

    it('does not add a new edge if it already exists', () => {
      addNewEdge('foo', 'bar', transitiveEdges);
      addNewEdge('foo', 'bar', transitiveEdges);
      expect(transitiveEdges.edgeIDs).toEqual(['foo|bar']);
    });
  });

  describe('getTransitiveEdges', () => {
    describe('if all edges are enabled', () => {
      it('creates no transitive edges', () => {
        expect(getTransitiveEdges(mockState.spaceflights)).toEqual({
          edgeIDs: [],
          sources: {},
          targets: {},
        });
      });
    });

    describe('if a task node is disabled', () => {
      // Create an altered state with a disabled node
      let alteredMockState;
      beforeEach(() => {
        alteredMockState = reducer(
          mockState.spaceflights,
          toggleNodesDisabled([disabledNode], true)
        );
      });

      it('creates transitive edges matching the source node', () => {
        expect(getTransitiveEdges(alteredMockState).edgeIDs).toEqual(
          expect.arrayContaining([
            expect.stringContaining(sourceToDisabledNode),
          ])
        );
      });

      it('creates transitive edges not matching the source node', () => {
        expect(getTransitiveEdges(alteredMockState).edgeIDs).toEqual(
          expect.arrayContaining([
            expect.not.stringContaining(sourceToDisabledNode),
          ])
        );
      });

      it('does not create transitive edges that contain the disabled node', () => {
        expect(getTransitiveEdges(alteredMockState).edgeIDs).not.toEqual(
          expect.arrayContaining([expect.stringContaining(disabledNode)])
        );
      });
    });
  });

  describe('getVisibleEdges', () => {
    it('gets only the visible edges', () => {
      const edgeDisabled = getEdgeDisabled(mockState.spaceflights);
      expect(
        getVisibleEdges(mockState.spaceflights).map((d) => edgeDisabled[d.id])
      ).toEqual(expect.arrayContaining([false]));
    });

    it('formats the edges into an array of objects', () => {
      expect(getVisibleEdges(mockState.spaceflights)).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            source: expect.any(String),
            target: expect.any(String),
          }),
        ])
      );
    });

    it('includes transitive edges when necessary', () => {
      const alteredMockState = reducer(
        mockState.spaceflights,
        toggleNodesDisabled([disabledNode], true)
      );
      expect(new Set(getVisibleEdges(alteredMockState))).not.toEqual(
        new Set(getVisibleEdges(mockState.spaceflights))
      );
    });
  });

  describe('getInputOutputDataEdges', () => {
    it('includes input output edges related to a modular pipeline in the returned object', () => {
      const newMockState = reducer(
        mockState.spaceflights,
        toggleFocusMode({ id: 'data_processing' })
      );

      expect(getInputOutputDataEdges(newMockState)).toHaveProperty(
        '47b81aa6|23c94afb'
      );
    });
  });
});
