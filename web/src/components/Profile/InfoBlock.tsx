import React, { ChangeEvent, FormEvent, useState } from 'react';
import axiosInstance from '../../axios';
import apiRoutes from '../../routes/apiRoutes';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { changeData } from '../../redux/slices/auth';

type DispatchFunc = () => AppDispatch;
const useAppDispatch: DispatchFunc = useDispatch;

interface Props {
  [key: string]: string | undefined | null;
}

type headers = 'name' | 'description' | 'email';

const InfoBlock = (props: Props) => {
  const dispacth = useAppDispatch();
  const headers = {
    name: 'Имя',
    description: 'О себе',
    email: 'Email',
  };
  const [key, value] = Object.entries(props)[0];

  const [submit, setSubmit] = useState(false);
  const [input, setInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setSubmit(true);
      const user = await axiosInstance.post(apiRoutes.me(), {[key]: inputValue});
      dispacth(changeData({ ...user }));
      setSubmit(false);
    } catch (error) {
      console.error(error);
    }
  };

  const form = (
    <form>
      {key === 'description' ? (
        <textarea autoFocus={input} onChange={changeHandler} name={key} value={inputValue} className="input"></textarea>
      ) : (
        <input value={inputValue} onChange={changeHandler} name={key} className="input"></input>
      )}{' '}
      <button type="submit" disabled={submit}>Сохранить</button>
      <button onClick={() => setInput(false)}>Отменить</button>
    </form>
  );

  return (
    <div className="flex">
      <h3 className="info-block-header">{headers[key as headers]}</h3>
      {!input && (
        <button onClick={() => setInput(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 17 17">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
        </button>
      )}
      {input ? form : <p>{value ?? 'Пока ничего нет'}</p>}
    </div>
  );
};

export default InfoBlock;
