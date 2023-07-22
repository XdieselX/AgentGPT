import React, { memo } from "react";
import { type NodeProps, Position } from "reactflow";

import {
  AbstractNode
} from "..";
import { getNodeBlockDefinitions } from "../../../../services/workflow/node-block-definitions";
import type { WorkflowNode } from "../../../../types";

function IBasicNode({ data, selected }: NodeProps<WorkflowNode>) {
  const definition = getNodeBlockDefinitions().find((d) => d.type === data.block.type);

  return (
    <AbstractNode
      selected={selected}
      status={data.status}
      handles={[
        { position: Position.Top, type: "target" },
        { position: Position.Bottom, type: "source" },
      ]}
    >
      <div className="flex items-center">
        <div className="ml-2">
          <div className="text-lg font-bold text-gray-100">{definition?.name}</div>
          <div className="text-md text-sm font-thin">{definition?.description}</div>
        </div>
      </div>
    </AbstractNode>
  );
}

const BasicNode = memo(IBasicNode);

export {
  BasicNode
};
