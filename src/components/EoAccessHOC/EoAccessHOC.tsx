import { notification } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import axiosInstance from '../../axios.instances';
import { EVENT_ORGANIZER_API } from '../../config/apiUrls';
import { useAppContext } from '../../context/AppContext';
import LoadingApp from '../Loadings/LoadingApp';

const EoAccessHOC = ({ children }: any) => {
  const { appState, setAppState } = useAppContext();
  const { eoId } = useParams<{ eoId: string }>();
  const history = useHistory();
  const [isAbleToAccess, setisAbletoAccess] = useState(false);
  const [isValidating, setIsValidating] = useState(true);

  const userId = useMemo(() => appState.user?._id, [appState.user?._id]);

  const getDetailEventOrganizer = useCallback(
    async (): Promise<IEventOrganizer> =>
      new Promise((resolve, reject) => {
        axiosInstance
          .get(EVENT_ORGANIZER_API + `/${eoId}`)
          .then(({ data }) => {
            resolve(data);
          })
          .catch(reject);
      }),
    [eoId]
  );

  const onUnauthorized = useCallback(() => {
    notification.error({
      message: 'You are not authorized to manage this Event Organizer',
      placement: 'bottomRight'
    });
    history.push('/');
  }, [history]);

  useEffect(() => {
    getDetailEventOrganizer().then((detailEo) => {
      if (userId === detailEo.creator._id) {
        setisAbletoAccess(true);
        setIsValidating(false);
        setAppState({
          eo_management: {
            role: 'creator',
            eo: detailEo
          }
        });
      } else {
        const committeeIds = detailEo.committee.map((com) => com._id);
        if (committeeIds.includes(String(userId))) {
          setisAbletoAccess(true);
          setIsValidating(false);
          setAppState({
            eo_management: {
              role: 'creator',
              eo: detailEo
            }
          });
        } else {
          onUnauthorized();
        }
      }
    });
  }, [setAppState, getDetailEventOrganizer, userId, onUnauthorized, eoId]);

  return isAbleToAccess && isValidating === false ? <>{children}</> : <LoadingApp width="100%" height="100%" />;
};

export default EoAccessHOC;
