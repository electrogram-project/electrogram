type Props = {
  text: string;
};

export function Alert({ text }: Props) {
  return (
    <div className="mt-2 rounded-lg text-xs p-3 flex justify-between bg-yellow-100 text-yellow-800 dark:bg-yellow-50">
      <p>
        {text}
      </p>
    </div>
  );
}
