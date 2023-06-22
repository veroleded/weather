import React, { ChangeEvent, FormEvent, useState } from 'react';
import WarningSvg from '../WarningSvg';
import axiosInstance from '../../axios';
import apiRoutes from '../../routes/apiRoutes';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { changeData } from '../../redux/slices/auth';
import noavatar from '../../../public/noavatar.png';

type DispatchFunc = () => AppDispatch;
const useAppDispatch: DispatchFunc = useDispatch;

type close = () => void;

const ModalImage = (props: { close: close }) => {
  const dispatch = useAppDispatch();

  const [image, setImage] = useState<File>();
  const [error, setError] = useState<string>();
  const [fetching, setFetching] = useState(false);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (!files[0].type.match(/image/)) {
        setError('Должно быть изображением');
      } else {
        setError(undefined);
        setImage(files[0]);
      }
    }
  };
  const sumbitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!image) {
      return;
    }
    try {
      setFetching(true);
      const data = new FormData();
      data.append('image', image);
      const {
        data: { url },
      } = await axiosInstance.post(apiRoutes.uploads(), data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      const { data: user } = await axiosInstance.post(apiRoutes.me(), { avatarUrl: url });
      dispatch(changeData({ ...user }));
      setFetching(false);
      props.close();
    } catch (error) {
      setFetching(false);
      console.error(error);
    }
  };

  return (
    <div id="openModal" className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Выбор изображения</h3>
            <span onClick={props.close} className="close">
              ×
            </span>
          </div>
          <div className="modal-body">
            <form onSubmit={sumbitHandler}>
              <label htmlFor="images" className="drop-container">
                <span className="drop-title">{'Перетащите изображение (png, jpeg, jpg)'}</span>
                {'или'}
                <input type="file" onChange={changeHandler} />
              </label>
              {error && (
                <p className="error">
                  <WarningSvg /> {error}
                </p>
              )}
              <button type="submit" disabled={fetching} className="btn">
                {'Сохранить'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalImage;
