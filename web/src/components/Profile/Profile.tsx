import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IUserData, selectIsAuth } from '../../redux/slices/auth';
import apiRoutes from '../../routes/apiRoutes';
import { useNavigate } from 'react-router-dom';
import ModalImage from './ModalImage';
import Input from '../Input';

const Profile = () => {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const userState = useSelector((state: RootState) => state.auth.data);
  const [modalOpen, setModalOpen] = useState(false);
  const [nameChanger, setNameChanger] = useState(false);

  const nameChangerHandler = () => {
    setNameChanger(true);
  };

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <div className="wrapper">
      {modalOpen && <ModalImage close={closeModalHandler} />}
      <div className="flex profile-container">
        <div className="avatar-container flex">
          <img className="avatar" src={userState?.avatarUrl} alt="avatar" />
          <button className="btn" onClick={openModalHandler}>
            {'Изменить'}
          </button>
        </div>
        <div className="info-container flex">
          <div className='flex'>
            {!nameChanger && <p>{userState?.name}</p>}
          </div>
        </div>
        <div className='changer-container'>
            <p className='btn'>{'Изменить...'}</p>
          </div>
      </div>
    </div>
  );
};

export default Profile;
