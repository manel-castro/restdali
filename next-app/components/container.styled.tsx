import styled from "styled-components";

export const Container = styled.div<{ $large?: boolean; $color?: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 1900px;
`;
