type Props = {
  title: string;
  text: string;
};

export function PageHead({ title, text }: Props) {
  return (
    <div className="mt-4">
      <h1 className="text-4xl font-bold text-left">
        {title}
      </h1>
      <p className="mt-2 italic">
        {text}
      </p>
    </div>
  );
}
