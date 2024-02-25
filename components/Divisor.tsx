type Props = {
  title: string;
};

export function Divisor({ title }: Props) {
  return (
    <div className="relative flex pt-5 pb-3 items-center">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="flex-shrink mx-4 font-mono text-gray-700">
        {title}
      </span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  );
}
