import styled from "styled-components";

export const Title = styled.h1<{
  $large?: boolean;
  $color?: string;
  $isShadow?: boolean;
}>`
  color: ${({ $color }) => $color || "slateblue"};
  white-space: nowrap;
  font-size: ${({ $large }) => ($large ? "3em" : "2em")};
  font-weight: ${({ $large }) => ($large ? 800 : 500)};
  font-family: var(--font-open-sans);
  text-shadow: ${({ $isShadow }) =>
    $isShadow ? "1px 1px 2px grey" : "initial"};
  line-height: ${({ $large }) => ($large ? "1em" : "1em")};
`;

export const Description = styled.p<{
  $large?: boolean;
  $color?: string;
  $isShadow?: boolean;
}>`
  color: ${({ $color }) => $color || "slateblue"};
  font-size: ${({ $large }) => ($large ? "2em" : "1.5em")};
  font-weight: ${({ $large }) => ($large ? 400 : 300)};
  font-family: var(--font-open-sans);
  text-shadow: ${({ $isShadow }) =>
    $isShadow ? "1px 1px 2px grey" : "initial"};
`;
