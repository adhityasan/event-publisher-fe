import React from 'react';
import EoAccessHOC from '../../../components/EoAccessHOC/EoAccessHOC';
import Heading1 from '../../../components/PageHeadings/Heading1';
import { useAppContext } from '../../../context/AppContext';
import { DashboardStyle } from './_DashboardStyle';

const EoDashboardView = () => {
  const { appState } = useAppContext();
  return (
    <EoAccessHOC>
      <div className={DashboardStyle}>
        <Heading1>{appState.eo_management?.eo.name} Dashboard</Heading1>
      </div>
    </EoAccessHOC>
  );
};

export default EoDashboardView;
