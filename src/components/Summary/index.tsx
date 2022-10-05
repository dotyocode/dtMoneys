import React, { useContext } from 'react';

import incomeImg from '../../assets/income.svg';
import outComeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from './styles';

export function Summary() {
const {transactions} = useTransactions();

const summary = transactions.reduce((acc, transaction) => {

  if(transaction.type === 'deposit') {
    acc.deposits += transaction.amount;
    acc.total += transaction.amount;
  } else {
    acc.withDraws += transaction.amount;
    acc.total -= transaction.amount;
  }
  return acc
}, {
    deposits: 0,
    withDraws: 0,
    total: 0
  })

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="entradas" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR',
        { style: 'currency', currency: 'BRL' }).format(summary.deposits)}</strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outComeImg} alt="saidas" />
        </header>
        <strong>- {new Intl.NumberFormat('pt-BR',
        { style: 'currency', currency: 'BRL' }).format(summary.withDraws)}</strong>
      </div>
      <div className='heighlight-background'>
        <header>
          <p>Total</p>
          <img src={totalImg} alt="total" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR',
        { style: 'currency', currency: 'BRL' }).format(summary.total)}</strong>
      </div>
    </Container>
  )
}