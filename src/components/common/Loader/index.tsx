import { Ring } from "@uiball/loaders";
import { LoaderProps } from "./index.props";

const Loader: React.FC<LoaderProps> = (props : LoaderProps) => {
  const {
    className,
    size = 16,
    speed = 2,
    lineWeight = 7,
  } = props;
  return (
    <div className={className}>
      <Ring size={size} speed={speed} color="white" lineWeight={lineWeight} />
    </div>
  );
};

export { Loader };
