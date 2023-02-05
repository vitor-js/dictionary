import styled from 'styled-components';
import { AiOutlineSearch  } from "react-icons/ai";

export const Container = styled.div`
  width: 100%;
  height: 45px;
  padding: 10px;

  border-width: 1px;
  border-radius: 5px;
  border-color: ${(props) => props.theme.colors.textShape};
  border-style: solid;

  display: flex;
  align-items: center;

`;

export const IconSearch = styled(AiOutlineSearch)`
  font-size: 20px;
  color: ${(props) => props.theme.colors.text};
`;

export const SectionInput = styled.div`
 width: 100%;
 height: 40px;
 padding-left: 5px;
 background-color: transparent;
`
export const Input = styled.input.attrs((props) => ({...props}))`
 width: 100%;
 height:100%;
 background-color: transparent;
 border: none;
 color: ${(props) => props.theme.colors.text};

 &:focus {
    border-color: transparent;
    outline: none !important;
    }

 &:active {
    border-color: transparent;
    }


`
