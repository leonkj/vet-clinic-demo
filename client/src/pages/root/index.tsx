import React, { ReactNode, useEffect } from 'react';
import { ClinicService } from '../../entity/clinic/service';
import { RootPageView } from './view';
import { ServiceService } from '../../entity/service/service';
import { connect } from 'react-redux';
import * as ModalSelectors from '../../components/modal/selectors';
import { RootState } from '../../reducer';

type PageProps = {
  currentModal?: ReactNode;
};

const Page = (props: PageProps) => {
  useEffect(() => {
    ClinicService.updateAllInDb().catch();
    ServiceService.updateAllInDb().catch();
  }, []);
  return <RootPageView currentModal={props.currentModal} />;
};
const mapStateToProps = (state: RootState) => ({
  currentModal: ModalSelectors.getCurrentModal(state),
});
export const RootPage = connect(mapStateToProps)(Page);
