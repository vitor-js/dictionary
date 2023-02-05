import styled from 'styled-components';
import { AiOutlineSound } from 'react-icons/ai';

export const Layout = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 400px;

  padding: 25px 25px;
  border-radius: 5px;

  display: flex;
  flex-direction: column;

  background: ${(props) => props.theme.colors.backgroundShape};

  transition: ease all 0.1s;
`;

export const SectionTitle = styled.section`
  display: flex;
  justify-content: center;

  width: 100%;
  margin: 10px 0px 20px 0px;
`;

export const SectionInput = styled.section`
  width: 100%;
`;

export const SectionSearch = styled.section``;

export const HeaderSearch = styled.div`
  width: 100%;

  margin-top: 20px;
  margin-bottom: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IConAudio = styled(AiOutlineSound)`
  font-size: 20px;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
`;

export const BodyMeaning = styled.div`
  width: 100%;

  border-radius: 0;
  border-left-width: 2px;
  border-left-style: solid;
  border-left-color: ${(props) => props.theme.colors.primary};

  margin-top: 20px;
  margin-bottom: 20px;

  padding: 5px;
`;
