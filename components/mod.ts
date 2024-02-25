export { Button } from "components/Button.tsx";
export { ButtonGroup } from "components/ButtonGroup.tsx";
export { FaqCard } from "components/FaqCard.tsx";
export { Footer } from "components/Footer.tsx";
export { GroupCard } from "components/GroupCard.tsx";
export { Header } from "components/Header.tsx";
export { InputField } from "components/InputField.tsx";
export { NavBar } from "components/NavBar.tsx";
export { PageHead } from "components/PageHead.tsx";
export { PostCard } from "components/PostCard.tsx";
export { SearchBox } from "components/SearchBox.tsx";
export { SelectInput } from "components/SelectInput.tsx";
export { TableHead } from "components/TableHead.tsx";
export { Divisor } from "components/Divisor.tsx";

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The input string.
 * @returns {string} The input string with the first letter capitalized.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
