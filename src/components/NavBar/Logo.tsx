import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { ColorVarsEnum } from '../../enums/ColorVarsEnum';
import { useStores } from '../../hooks/useStores';
import Page from '../../routing/Pages';
import { PrimaryTextSpan } from '../../styles/TextsElements';

const Logo = observer(() => {
  const { mainAppStore } = useStores();

  return (
    <LogoLink to={mainAppStore.isAuthorized ? Page.DASHBOARD : Page.HOME}>
      <PrimaryTextSpan color={`var(${ColorVarsEnum.Text})`} fontWeight={500} fontSize="28px">
        Simple
      </PrimaryTextSpan>
      <PrimaryTextSpan color={`var(${ColorVarsEnum.Accent})`} fontWeight={600} fontSize="28px">
        .education
      </PrimaryTextSpan>
    </LogoLink>
  );
});

export default Logo;

const LogoLink = styled(Link)`
  text-decoration: none;
  transition: all 0.4s ease;
  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
`;
