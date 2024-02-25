type Props = {
  col_names: { name: string }[];
};

export function TableHead({ col_names }: Props) {
  return (
    <tr>
      {col_names.map((col) => (
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          {col.name}
        </th>
      ))}
    </tr>
  );
}
