import React from 'react';
import { useTranslation } from 'react-i18next';
import Divider from '../components/Divider';
import LabelInput from '../components/Form/LabelInput';
import Fields from '../constants/fields';
import Page from '../routing/Pages';
import { PrimaryButton, SecondaryButton } from '../styles/Buttons';
import { FlexContainer } from '../styles/FlexContainer';
import { AuthForm } from '../styles/FormControls';
import { PrimaryTextSpan, TextAccentLink } from '../styles/TextsElements';

import { UserRegistration } from '../types/UserInfo';
import validationInputTexts from '../constants/validationInputTexts';
import * as yup from 'yup';

import CheckListPassword from '../components/Form/CheckListPassword';
const SignUp = () => {
  const { t } = useTranslation();

  const validationSchema = yup.object().shape<UserRegistration>({
    email: yup
      .string()
      .required(t(validationInputTexts.EMAIL))
      .email(t(validationInputTexts.EMAIL)),
    password: yup
      .string()
      .required(t(validationInputTexts.REQUIRED_FIELD))
      .min(8, t(validationInputTexts.PASSWORD_MIN_CHARACTERS))
      .max(31, t(validationInputTexts.PASSWORD_MAX_CHARACTERS))
      .matches(
        /^(?=.*\d)(?=.*[a-zA-Z])/,
        t(validationInputTexts.PASSWORD_MATCH)
      ),
    userName: yup.string(),
    firstName: yup.string(),
    lastName: yup.string(),
  });

  const initialValues: UserRegistration = {
    email: '',
    password: '',
    userName: '',
    firstName: '',
    lastName: '',
  };

  return (
    <FlexContainer
      width="100%"
      flexDirection="column"
      alignItems="center"
      padding="72px 0 32px"
    >
      <PrimaryTextSpan
        textAlign="center"
        fontSize="40px"
        fontWeight={600}
        color="#000"
        marginBottom="24px"
      >
        {t('Create an account')}
      </PrimaryTextSpan>

      <FlexContainer width="460px" marginBottom="48px">
        <PrimaryTextSpan textAlign="center" lineHeight="24px">
          {t(
            'Простая обучающая программа по финансовым знаниям, инструментам и управления деньгами.'
          )}
        </PrimaryTextSpan>
      </FlexContainer>

      <AuthForm>
        <LabelInput
          id={Fields.USER_NAME}
          name={Fields.USER_NAME}
          labelText={t('Full Name')}
        />
        <LabelInput
          id={Fields.EMAIL}
          name={Fields.EMAIL}
          labelText={t('Email')}
        />
        <LabelInput
          id={Fields.PASSWORD}
          name={Fields.PASSWORD}
          labelText={t('Password')}
          type="password"
        />

        <CheckListPassword password="" />
        <PrimaryButton>{t('Create an account')}</PrimaryButton>

        <Divider label={t('Or continue with')} margin="24px 0" />
      </AuthForm>

      <FlexContainer width="340px" flexDirection="column" marginBottom="24px">
        <SecondaryButton marginBottom="16px">Facebook</SecondaryButton>
        <SecondaryButton>Google</SecondaryButton>
      </FlexContainer>

      <PrimaryTextSpan fontSize="12px" fontWeight={400}>
        {t('Already have an account?')}&nbsp;
        <TextAccentLink to={Page.SIGN_IN}>{t('Log In')}</TextAccentLink>
      </PrimaryTextSpan>
    </FlexContainer>
  );
};

export default SignUp;