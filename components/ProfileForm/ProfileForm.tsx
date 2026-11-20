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

type ProfileFormValues = {
  name: string;
};

const MAX_FILE_SIZE_BYTES = 500 * 1024;

const profileSchema: Yup.ObjectSchema<ProfileFormValues> = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Name is required'),
});

interface ProfileFormProps {
  user: User;
  onSuccess: () => void;
}

function ProfileForm({ user, onSuccess }: ProfileFormProps) {
  const { refreshUser } = useAuth();
  const [fileError, setFileError] = useState<string | null>(null);
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

  const previewSrc = localPreview || user.photoURL || '/avatar_stock.webp';
  const isBlobPreview = Boolean(localPreview);

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: async () => {
      await refreshUser();
      onSuccess();
    },
    onError: (error: unknown) => {
      if (error instanceof FirebaseError) {
        setError('root', {
          type: 'manual',
          message: error.message || 'Failed to update profile.',
        });
        return;
      }

      setError('root', {
        type: 'manual',
        message: 'Something went wrong. Please try again.',
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
      setFileError('Please select an image file');
      e.target.value = '';
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError('Image size must be 500 KB or less');
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
        message: 'Failed to upload avatar. Please try again.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Edit Profile</h2>
      <p className={css.text}>Update your display name and profile avatar.</p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isSubmitting}>
          <div className={css.avatarBlock}>
            <button
              type="button"
              onClick={handleOpenFilePicker}
              aria-label="Choose profile avatar"
              className={css.avatarButton}
            >
              <Image
                src={previewSrc}
                alt="Avatar preview"
                width={72}
                height={72}
                unoptimized={isBlobPreview}
                className={css.avatarPreview}
              />
            </button>
            <div className={css.avatarActions}>
              <button
                type="button"
                onClick={handleOpenFilePicker}
                className={css.uploadLabel}
              >
                <span>Choose file</span>
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
          {fileError && <span className={css.error}>{fileError}</span>}

          <Input
            autoComplete="name"
            placeholder="Name"
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
                Reset
              </button>
            )}
            <Button
              disabled={isSubmitting || !hasChanges}
              className={css.button}
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <span>{isUploading ? 'Uploading' : 'Saving'}</span>{' '}
                  <span className={css.loader}></span>
                </>
              ) : (
                'Save changes'
              )}
            </Button>
          </div>
          {errors.root && (
            <span className={css.error}>{errors.root.message}</span>
          )}
        </fieldset>
      </form>
    </div>
  );
}

export default ProfileForm;
