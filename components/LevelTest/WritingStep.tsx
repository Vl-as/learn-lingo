'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import { useAuth } from '@/hooks/useAuth';
import { auth } from '@/lib/firebase';
import { testLanguageTags, type TestLanguage } from '@/data/levelTest';
import type { Assessment } from '@/types/assessment';
import css from './LevelTest.module.css';
import { useT } from '@/i18n/useT';
import type { TranslationKey } from '@/i18n/types';

const testLanguageKeys: Record<TestLanguage, TranslationKey> = {
  English: 'writing.testLanguages.English',
  German: 'writing.testLanguages.German',
  French: 'writing.testLanguages.French',
};

const MIN_LENGTH = 40;
const MAX_LENGTH = 600;

interface WritingStepProps {
  language: TestLanguage;
  onDone: (assessment: Assessment | null) => void;
}

function WritingStep({ language, onDone }: WritingStepProps) {
  const { user } = useAuth();
  const { t, locale } = useT();
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<TranslationKey | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    sectionRef.current?.focus();
  }, []);

  const length = text.trim().length;
  const canSubmit = Boolean(user) && length >= MIN_LENGTH && !isLoading;

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = await auth.currentUser?.getIdToken();

      if (!token) {
        setError('writing.authRequired');
        return;
      }

      const response = await fetch('/api/assess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ language, text, locale }),
      });

      if (response.status === 429) {
        setError('writing.dailyLimit');
        return;
      }

      if (!response.ok) {
        setError('writing.unavailable');
        return;
      }

      onDone((await response.json()) as Assessment);
    } catch {
      setError('writing.requestFailed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={sectionRef} tabIndex={-1} className={css.card}>
      <p className={css.label}>{t('writing.optional')}</p>
      <h2 className={css.chooseTitle}>{t('writing.title')}</h2>
      <p className={css.chooseText}>
        {t('writing.prompt', {
          language: t(testLanguageKeys[language]),
        })}
      </p>

      {user ? (
        <>
          <label className={css.writingLabel} htmlFor="writing-text">
            {t('writing.yourText')}
          </label>
          <textarea
            id="writing-text"
            className={css.textarea}
            value={text}
            onChange={event => setText(event.target.value)}
            maxLength={MAX_LENGTH}
            rows={6}
            disabled={isLoading}
            lang={testLanguageTags[language]}
          />
          <p className={css.charCount}>
            {t('writing.charCount', {
              count: length,
              max: MAX_LENGTH,
              min: MIN_LENGTH,
            })}
          </p>
        </>
      ) : (
        <p className={css.authNote}>{t('writing.loginNote')}</p>
      )}

      {error && (
        <p className={css.errorText} role="alert">
          {t(error)}
        </p>
      )}

      <p className={css.note}>
        {t('writing.privacyNote')}
      </p>

      <div className={css.actions}>
        {user && (
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            {isLoading ? (
              <>
                <span>{t('writing.checking')}</span>{' '}
                <span className={css.loader}></span>
              </>
            ) : (
              t('writing.getFeedback')
            )}
          </Button>
        )}
        <Button
          className={css.secondary}
          onClick={() => onDone(null)}
          disabled={isLoading}
        >
          {t('writing.skip')}
        </Button>
      </div>
    </section>
  );
}

export default WritingStep;
