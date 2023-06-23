import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../redux/store';
import { IUserData, changeData, selectIsAuth } from '../../redux/slices/auth';
import apiRoutes from '../../routes/apiRoutes';
import ModalImage from './ModalImage';
import noavatar from '../../images/noavatar.png';
import { getImageLink } from '../../consts';
import axiosInstance from '../../axios';
import InfoBlock from './InfoBlock';

type DispatchFunc = () => AppDispatch;
const useAppDispatch: DispatchFunc = useDispatch;

const Profile = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const userState = useSelector((state: RootState) => state.auth.data);
  const [modalOpen, setModalOpen] = useState(false);

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const deleteAvatarHandler = async () => {
    try {
      const { data: user } = await axiosInstance.delete(apiRoutes.avatar());
      dispatch(changeData({ ...user }));
    } catch (error) {
      console.error();
    }
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
          <img className="avatar" src={getImageLink(userState?.avatarUrl) ?? noavatar} alt="avatar" />
          <div className="flex btn-group">
            <button className="btn" onClick={openModalHandler}>
              {'Изменить'}
            </button>
            { userState?.avatarUrl && <button className="btn btn-danger" onClick={deleteAvatarHandler}>
              {'Удалить'}
            </button>}
          </div>
        </div>
        <div className="info-container">
          <InfoBlock name={userState?.name} />
          <InfoBlock description={userState?.description} />
          <InfoBlock email={userState?.email} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
