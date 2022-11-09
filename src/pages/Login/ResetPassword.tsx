import { FC, useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';

import { Paper } from '@mui/material';

import { useUser } from '@hooks/useUser';
import { InfoProps } from '@pages/Login/FormPassword/type';

import ResetFrom from '@pages/Login/FormPassword/Reset';
import ValidateFrom from '@pages/Login/FormPassword/ValidateCode';
import SetNewFrom from '@pages/Login/FormPassword/SetNew';
import SuccessPage from '@pages/Login/FormPassword/SuccessPage';

const FormReset = styled.div`
  max-width: 520px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};
  ${(props) => props.theme.breakpoints.up('sm')} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

const ResetPassword: FC = () => {
  const { actionsPassword } = useUser();
  const [info, setInfo] = useState<InfoProps>({
    action: 'reset-password',
  });

  const onActions = useCallback(
    async (props: {
      values: any;
      action: string;
      setStatus: (status: boolean) => void;
    }) => {
      const { values, action, setStatus } = props;
      let isSuccess = true;
      await actionsPassword({
        payload: values,
        action: action,
        onError: (message: string) => {
          isSuccess = false;
        },
      });
      setStatus(isSuccess);
    },
    []
  );

  const renderForm = useMemo(() => {
    const { action } = info;
    switch (action) {
      case 'reset-password':
        return (
          <ResetFrom info={info} setInfo={setInfo} onActions={onActions} />
        );
      case 'validate-code':
        return (
          <ValidateFrom info={info} setInfo={setInfo} onActions={onActions} />
        );
      case 'set-password':
        return (
          <SetNewFrom info={info} setInfo={setInfo} onActions={onActions} />
        );

      default:
        return <SuccessPage />;
    }
  }, [info]);

  return (
    <>
      <FormReset>
        <Wrapper>{renderForm}</Wrapper>
      </FormReset>
    </>
  );
};
export default ResetPassword;
