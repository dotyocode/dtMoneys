import { FormEvent, useContext, useState } from 'react';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outComeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container, RadioBox, TransactionTypeContainer } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const {createTransaction} = useTransactions();
  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
        title,
        amount,
        category,
        type
      });

    setTitle('');
    setType('deposit');
    setAmount(0);
    setCategory('');
    onRequestClose();
  }

  return (
    <Modal isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type='button'
        onClick={onRequestClose}
        className='react-modal-close'
      >
        <img src={closeImg} alt='Fechar Modal' />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>
        <input value={title} onChange={event => setTitle(event.target.value)} placeholder='Titulo' />
        <input value={amount} onChange={event => setAmount(Number(event.target.value))} placeholder='Valor' type='number' />
        <TransactionTypeContainer>

          <RadioBox activeColor='green' type='button' isActive={type === 'deposit'} onClick={() => { setType('deposit') }}>
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox activeColor='red' type='button' isActive={type === 'withDraw'} onClick={() => { setType('withDraw') }}>
            <img src={outComeImg} alt="Saida" />
            <span>Saida</span>
          </RadioBox>

        </TransactionTypeContainer>
        <input value={category} onChange={event => setCategory(event.target.value)} placeholder='Categoria' />
        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  )
}
