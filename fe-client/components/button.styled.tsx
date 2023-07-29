import styled from "styled-components";

export const Button = styled.button<{
  $outline?: boolean;
  $large?: boolean;
  $color?: string;
}>`
  color: ${({ $color, $outline }) =>
    $color || ($outline ? "#13c636" : "white")};
  font-size: ${({ $large }) => ($large ? "1.2em" : "1em")};
  font-weight: ${({ $large }) => ($large ? 800 : 500)};
  font-family: var(--font-open-sans);
  padding-left: ${({ $large }) => ($large ? "1.7em" : "1.5em")};
  padding-right: ${({ $large }) => ($large ? "1.7em" : "1.5em")};
  padding-top: ${({ $large }) => ($large ? "0.5em" : "0.5em")};
  padding-bottom: ${({ $large }) => ($large ? "0.5em" : "0.5em")};
  background-color: ${({ $outline }) => ($outline ? "transparent" : "#13c636")};
  border: ${({ $outline }) =>
    $outline ? "1px solid #13c636" : "1px solid transparent"};
  border-radius: 25px;
`;
