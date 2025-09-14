import * as yup from 'yup';

export const createPatientSchema = (t: (key: string) => string) => yup.object({
  name: yup
    .string()
    .required(t('validation.nameRequired'))
    .min(2, t('validation.nameMinLength'))
    .max(50, t('validation.nameMaxLength'))
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, t('validation.nameInvalid')),
  
  avatar: yup
    .string()
    .required(t('validation.avatarRequired'))
    .url(t('validation.avatarInvalid')),
  
  description: yup
    .string()
    .required(t('validation.descriptionRequired'))
    .min(5, t('validation.descriptionMinLength')),
  
  website: yup
    .string()
    .required(t('validation.websiteRequired'))
    .url(t('validation.websiteInvalid')),
});

export type PatientFormData = {
  name: string;
  avatar: string;
  description: string;
  website: string;
};
