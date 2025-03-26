import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  MiniMap,
  Controls,
  ControlButton,
} from "@xyflow/react";
import dagre from "dagre";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Dự án X" },
    style: {
      background: "#ffcc00",
      color: "#000",
      border: "2px solid #ff9900",
      minHeight: "100px",
    },
    connectable: false,
  },
  {
    id: "2",
    data: { label: "...or here!" },
    style: { background: "#ff6666", color: "#fff" },
    connectable: false,
  },
  {
    id: "3",
    data: { label: "Delete me." },
    style: { background: "#66ccff", color: "#000" },
    connectable: false,
  },
  {
    id: "4",
    data: {
      label:
        "Then mehcgsdgsjbsdjhcbvdh csbdjch bdcjhdsbc jdhbc dcbdc jbhsdcj bcjdscb dsjcbdjchbc jbcdj cbs cjsdb!",
    },
    style: { background: "#99ff99", color: "#000" },
    connectable: false,
  },
  {
    id: "5",
    type: "output",
    data: { label: "ok" },
    style: { background: "#cc66ff", color: "#fff" },
    connectable: false,
  },
  {
    id: "6",
    type: "output",
    data: { label: "ok" },
    style: { background: "#cc66ff", color: "#fff" },
    connectable: false,
  },
  {
    id: "7",
    type: "output",
    data: { label: "ok" },
    style: { background: "#cc66ff", color: "#fff" },
    connectable: false,
  },
  {
    id: "7",
    type: "output",
    data: { label: "ok" },
    style: { background: "#cc66ff", color: "#fff" },
    connectable: false,
  },
  {
    id: "8",
    type: "output",
    data: { label: "ok" },
    style: { background: "#cc66ff", color: "#fff" },
    connectable: false,
  },
  {
    id: "8",
    type: "output",
    data: { label: "ok" },
    style: { background: "#cc66ff", color: "#fff" },
    connectable: false,
  },
  {
    id: "10",
    type: "output",
    data: { label: "ok" },
    style: { background: "#cc66ff", color: "#fff" },
    connectable: false,
  },
  {
    id: "11",
    type: "output",
    data: { label: "ok" },
    style: { background: "#cc66ff", color: "#fff" },
    connectable: false,
  },
  {
    id: "12",
    type: "output",
    data: { label: "ok" },
    style: { background: "#cc66ff", color: "#fff" },
    connectable: false,
  },
  {
    id: "13",
    type: "output",
    data: { label: "ok" },
    style: { background: "#cc66ff", color: "#fff" },
    connectable: false,
  },
  {
    id: "14",
    type: "output",
    data: { label: "ok" },
    style: { background: "#cc66ff", color: "#fff" },
    connectable: false,
  },
  {
    id: "15",
    type: "output",
    data: { label: "ok" },
    style: { background: "#cc66ff", color: "#fff" },
    connectable: false,
  },
];

const initialEdges = [
  { id: "2->1", source: "1", target: "2" },
  { id: "3->1", source: "1", target: "3" },
  { id: "4->1", source: "1", target: "4" },
  { id: "5->1", source: "1", target: "5" },
  { id: "6->1", source: "1", target: "6" },
  { id: "7->1", source: "1", target: "7" },
  { id: "8->7", source: "7", target: "8" },
  { id: "9->7", source: "7", target: "9" },
  { id: "10->7", source: "7", target: "10" },
  { id: "11->7", source: "7", target: "11" },
  { id: "12->7", source: "7", target: "12" },
  { id: "13->7", source: "7", target: "13" },
];

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [isViewingMiniMap, setViewingMiniMap] = React.useState(false);

  useEffect(() => {
    // Cập nhật vị trí nodes khi khởi tạo
    setNodes(getLayoutedNodes(initialNodes, initialEdges));
  }, []);

  const handleAutoLayout = () => {
    setNodes((nds) => getLayoutedNodes(nds, edges));
  };

  const onConnect = useCallback(
    (params) => setEdges(addEdge(params, edges)),
    [edges]
  );

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );

      // Cập nhật lại vị trí sau khi xóa
      setNodes((nds) => getLayoutedNodes(nds, edges));
    },
    [nodes, edges]
  );

  const handleToggleMiniMap = () => {
    setViewingMiniMap(!isViewingMiniMap);
  };

  const getLayoutedNodes = (nodes, edges, direction = "TB") => {
    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: direction, nodesep: 50, ranksep: 100 });
    g.setDefaultEdgeLabel(() => ({}));

    nodes.forEach((node) => {
      g.setNode(node.id, { width: 150, height: 50 });
    });

    edges.forEach((edge) => {
      g.setEdge(edge.source, edge.target);
    });

    dagre.layout(g);

    return nodes.map((node) => {
      const layoutedNode = g.node(node.id);
      return { ...node, position: { x: layoutedNode.x, y: layoutedNode.y } };
    });
  };

  const onNodeClick = useCallback((event, node) => {
    console.log("Node clicked:", node);
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onNodesDelete={onNodesDelete}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      fitView
      minZoom={0.2}
      maxZoom={4}
      proOptions={{ hideAttribution: true }}
      style={{ backgroundColor: "#F7F9FB" }}
    >
      <Background />
      {isViewingMiniMap && <MiniMap />}
      <Controls>
        <ControlButton onClick={handleAutoLayout} title="Auto Layout">
          🔄
        </ControlButton>
        <ControlButton onClick={handleToggleMiniMap} title="MiniMap">
          🗺
        </ControlButton>
      </Controls>
    </ReactFlow>
  );
}

// Chặn kéo thả node	{ draggable: false }
// Cho phép kéo thả node	{ draggable: true }
// Chặn kết nối node	{ connectable: false }
// Cho phép kết nối node	{ connectable: true }
