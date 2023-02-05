import { Container, IconSearch, SectionInput, Input } from './styles';
import { InputHTMLAttributes } from 'react';

const Index = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Container>
      <IconSearch />
      <SectionInput>
        <Input type="text" {...props} />
      </SectionInput>
    </Container>
  );
};

export default Index;
