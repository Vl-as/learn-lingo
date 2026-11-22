'use client';

import { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './ProfileForm.module.css';
import { useForm, useWatch } from 'react-hook-form';
import * as Yup from 'yup';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useMutation } from '@tanstack/react-query';
import { updateUserProfile } from '@/services/auth';
import { uploadAvatarToCloudinary } from '@/services/cloudinary';
import { FirebaseError } from 'firebase/app';
import { User } from 'firebase/auth';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { getFirebaseAuthErrorKey } from '@/lib/firebaseAuthError';
import { useT, translateMessage } from '@/i18n/useT';
import type { TranslationKey } from '@/i18n/types';
import { DEMO_EMAIL } from '@/data/demo';
import Icon from '../Icon/Icon';

type ProfileFormValues = {
  name: string;
};

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

const profileSchema: Yup.ObjectSchema<ProfileFormValues> = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'validation.nameMin')
    .max(50, 'validation.nameMax')
    .required('validation.nameRequired'),
});

interface ProfileFormProps {
  user: User;
  onSuccess: () => void;
  onChangePassword: () => void;
}

function ProfileForm({ user, onSuccess, onChangePassword }: ProfileFormProps) {
  const { refreshUser } = useAuth();
  const { t } = useT();
  const [fileError, setFileError] = useState<TranslationKey | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const previewRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const initialName = (user.displayName ?? '').trim();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user.displayName ?? '',
    },
  });

  useEffect(() => {
    previewRef.current = localPreview;
  }, [localPreview]);

  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
      }
    };
  }, []);

  const watchedName = useWatch({
    control,
    name: 'name',
  });

  const isNameChanged = (watchedName ?? '').trim() !== initialName;
  const isAvatarChanged = Boolean(selectedFile);
  const hasChanges = isNameChanged || isAvatarChanged;

  const previewSrc = localPreview || user.photoURL;
  const isBlobPreview = Boolean(localPreview);

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: async () => {
      await refreshUser();
      onSuccess();
    },
    onError: (error: unknown) => {
      setError('root', {
        type: 'manual',
        message:
          error instanceof FirebaseError
            ? getFirebaseAuthErrorKey(error)
            : 'auth.profileUpdateFailed',
      });
    },
  });

  const isSubmitting = isPending || isUploading;

  const clearLocalPreview = () => {
    if (localPreview) {
      URL.revokeObjectURL(localPreview);
      setLocalPreview(null);
    }
  };

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFileError('validation.imageFile');
      e.target.value = '';
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError('validation.imageSize');
      e.target.value = '';
      return;
    }

    clearLocalPreview();

    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setLocalPreview(objectUrl);
    e.target.value = '';
  };

  const handleResetChanges = () => {
    setFileError(null);
    setSelectedFile(null);
    clearLocalPreview();
    reset({
      name: user.displayName ?? '',
    });
  };

  const onSubmit = async (data: ProfileFormValues) => {
    if (!hasChanges) return;

    try {
      let finalPhotoURL: string | null = user.photoURL ?? null;

      if (selectedFile) {
        setIsUploading(true);
        finalPhotoURL = await uploadAvatarToCloudinary(selectedFile);
      }

      mutate({
        name: data.name,
        photoURL: finalPhotoURL,
      });
    } catch {
      setError('root', {
        type: 'manual',
        message: 'auth.avatarUploadFailed',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const rootError = translateMessage(errors.root?.message, t);

  return (
    <div className={css.container}>
      <h2 className={css.title}>{t('auth.profileTitle')}</h2>
      <p className={css.text}>{t('auth.profileIntro')}</p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isSubmitting}>
          <div className={css.avatarBlock}>
            <button
              type="button"
              onClick={handleOpenFilePicker}
              aria-label={t('auth.chooseProfileAvatar')}
              className={css.avatarButton}
            >
              {previewSrc ? (
                <Image
                  src={previewSrc}
                  alt={t('auth.avatarPreview')}
                  width={72}
                  height={72}
                  unoptimized={isBlobPreview}
                  className={css.avatarPreview}
                />
              ) : (
                <div className={css.letterAvatar}>
                  {(
                    user.displayName?.[0] ??
                    user.email?.[0] ??
                    ''
                  ).toUpperCase()}
                </div>
              )}
            </button>
            <div className={css.avatarActions}>
              <button
                type="button"
                onClick={handleOpenFilePicker}
                className={css.uploadLabel}
              >
                <span>{t('auth.chooseFile')}</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </div>
          </div>
          {fileError && (
            <span className={css.error}>{t(fileError, { size: 5 })}</span>
          )}

          <Input
            autoComplete="name"
            placeholder={t('auth.namePlaceholder')}
            type="text"
            {...register('name')}
            error={errors.name?.message}
            className={css.inputField}
          />

          <div className={css.formActions}>
            {hasChanges && (
              <button
                type="button"
                onClick={handleResetChanges}
                className={css.resetButton}
              >
                {t('auth.reset')}
              </button>
            )}
            <Button
              disabled={isSubmitting || !hasChanges}
              className={css.button}
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <span>
                    {isUploading ? t('auth.uploading') : t('auth.saving')}
                  </span>{' '}
                  <span className={css.loader}></span>
                </>
              ) : (
                t('auth.saveChanges')
              )}
            </Button>
          </div>
          {rootError && <span className={css.error}>{rootError}</span>}
        </fieldset>
      </form>
      {user.email !== DEMO_EMAIL && (
        <button
          type="button"
          className={css.changePassword}
          onClick={onChangePassword}
        >
          <Icon
            name="unlocked"
            width={16}
            height={16}
            className={css.changePasswordIcon}
          />
          <span className={css.changePasswordLabel}>
            {t('profile.changePassword')}
          </span>
        </button>
      )}
    </div>
  );
}

export default ProfileForm;
