import { Container } from '../Dashboard/styles';
import { Summary } from '../Summary';
import { Transactions } from '../Transactions';

export function Dashboard() {
  return (
    <Container>
      <Summary />
      <Transactions />
    </Container>
  )
}
