import type { Edge, Node } from "reactflow";
import type { WorkflowEdge, WorkflowNode } from "../../../types";
import { DisplayProps } from "../Sidebar/index.props";
import type { createNodeType, updateNodeType } from "../../../hooks";

export type WorkflowControls = {
  selectedNode: Node<WorkflowNode> | undefined;
  nodes: Node<WorkflowNode>[];
  edges: Edge<WorkflowEdge>[];
  createNode: createNodeType;
  updateNode: updateNodeType;
};

export type WorkflowSidebarProps = DisplayProps & {
  controls: WorkflowControls;
};

export type InspectSectionProps = {
  selectedNode: Node<WorkflowNode> | undefined;
  updateNode: updateNodeType;
  nodes: Node<WorkflowNode>[];
  edges: Edge<WorkflowEdge>[];
};
