type Props = {
  title: string;
  text: string;
};

export function PageHead({ title, text }: Props) {
  return (
    <div className="mb-4">
      <h2 className="text-left text-2xl mt-6 mb-3 font-extrabold font-mono">
        {title}
      </h2>
      <p className="text-left">{text}</p>
    </div>
  );
}
