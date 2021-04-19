import React, { useEffect, useState } from 'react';
import { Button, Spin, notification } from 'antd';
import { useHistory } from 'react-router';
import { InterestStyle } from './_InterestStyle';
import { INTEREST_API, MASTER_EVENT_CATEGORIES_API } from '../../../config/apiUrls';
import { useAppContext } from '../../../context/AppContext';
import InterestTag from '../../../components/InterestTag/InterestTag';
import axiosInstance from '../../../axios.instances';

const InterestView = () => {
  const { appState, setAppState } = useAppContext();
  const [interestIds, setInterestIds] = useState<string[]>([]);
  const history = useHistory();

  const handleSelectInterest = (interestId: string) => {
    let nextInterestIds = [];
    if (interestIds.includes(interestId)) {
      nextInterestIds = interestIds.filter((cv) => cv !== interestId);
    } else {
      nextInterestIds = [...interestIds, interestId];
    }
    setInterestIds(nextInterestIds);
  };

  const handleSubmitInterest = () => {
    axiosInstance.post(INTEREST_API, { userId: appState.user?._id, interestIds: interestIds }).then(({ data }) => {
      setAppState({ user: data });
      notification.success({
        message: 'Your Interest Categories Saved',
        description: 'Now we can give you recommendation of events that suits your interest',
        placement: 'bottomRight',
        duration: 5000
      });
    });
    history.push('/');
  };

  useEffect(() => {
    axiosInstance
      .get(MASTER_EVENT_CATEGORIES_API, { params: { $limit: 50 } })
      .then(({ data }) => {
        if (data?.data) {
          setAppState({ _master_event_categoris: data?.data });
        }
      })
      // eslint-disable-next-line no-console
      .catch(console.error);
  }, [setAppState]);

  return (
    <div className={InterestStyle}>
      <h1>WHAT INTEREST YOU ?</h1>
      <div className="interestPicker">
        {appState._master_event_categoris && appState._master_event_categoris?.length > 0 ? (
          appState._master_event_categoris.map((category) => (
            <InterestTag
              key={category._id}
              isChecked={interestIds.includes(category._id)}
              category={category.category}
              onClick={() => handleSelectInterest(category._id)}
            />
          ))
        ) : (
          <Spin size="large" />
        )}
        <div className="next-wrapper">
          <Button type="primary" size="large" onClick={handleSubmitInterest}>
            SAVE MY INTEREST CATEGORIES
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterestView;
