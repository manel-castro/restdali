import styled from "styled-components";

export const Title = styled.h1<{ $large?: boolean; $color?: string }>`
  color: ${({ $color }) => $color || "slateblue"};
  font-size: ${({ $large }) => ($large ? "3em" : "2em")};
  font-weight: ${({ $large }) => ($large ? 800 : 500)};
  font-family: var(--font-open-sans);
  text-shadow: 1px 1px 2px grey;
  line-height: ${({ $large }) => ($large ? "1em" : "1em")};
`;

export const Description = styled.span<{ $large?: boolean; $color?: string }>`
  color: ${({ $color }) => $color || "slateblue"};
  font-size: ${({ $large }) => ($large ? "2em" : "1.5em")};
  font-weight: ${({ $large }) => ($large ? 400 : 100)};
  /* font-family: var(--font-open-sans); */
  text-shadow: 1px 1px 2px grey;
`;
