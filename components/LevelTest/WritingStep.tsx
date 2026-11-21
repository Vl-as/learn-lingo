'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import { useAuth } from '@/hooks/useAuth';
import { auth } from '@/lib/firebase';
import type { TestLanguage } from '@/data/levelTest';
import type { Assessment } from '@/types/assessment';
import css from './LevelTest.module.css';

const MIN_LENGTH = 40;
const MAX_LENGTH = 600;

interface WritingStepProps {
  language: TestLanguage;
  onDone: (assessment: Assessment | null) => void;
}

function WritingStep({ language, onDone }: WritingStepProps) {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
        setError('Please log in to get AI feedback.');
        return;
      }

      const response = await fetch('/api/assess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ language, text }),
      });

      if (response.status === 429) {
        setError(
          "You have reached today's limit of AI checks. You can skip this step."
        );
        return;
      }

      if (!response.ok) {
        setError(
          'AI feedback is unavailable right now. You can try again or skip this step.'
        );
        return;
      }

      onDone((await response.json()) as Assessment);
    } catch {
      setError('Something went wrong. You can try again or skip this step.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={sectionRef} tabIndex={-1} className={css.card}>
      <p className={css.label}>Optional step</p>
      <h2 className={css.chooseTitle}>Writing task with AI feedback</h2>
      <p className={css.chooseText}>
        Write 4-6 sentences in {language} about your last holiday or weekend. AI
        will estimate your level and point out the main mistakes.
      </p>

      {user ? (
        <>
          <label className={css.writingLabel} htmlFor="writing-text">
            Your text
          </label>
          <textarea
            id="writing-text"
            className={css.textarea}
            value={text}
            onChange={event => setText(event.target.value)}
            maxLength={MAX_LENGTH}
            rows={6}
            disabled={isLoading}
          />
          <p className={css.charCount}>
            {length} / {MAX_LENGTH} characters (at least {MIN_LENGTH})
          </p>
        </>
      ) : (
        <p className={css.authNote}>
          Log in to get AI feedback on your writing. You can log in now and stay
          on this step, or skip it.
        </p>
      )}

      {error && (
        <p className={css.errorText} role="alert">
          {error}
        </p>
      )}

      <p className={css.note}>
        Your text is sent to Google&apos;s Gemini API to generate the feedback.
        Please do not include personal data.
      </p>

      <div className={css.actions}>
        {user && (
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            {isLoading ? (
              <>
                <span>Checking</span> <span className={css.loader}></span>
              </>
            ) : (
              'Get AI feedback'
            )}
          </Button>
        )}
        <Button
          className={css.secondary}
          onClick={() => onDone(null)}
          disabled={isLoading}
        >
          Skip
        </Button>
      </div>
    </section>
  );
}

export default WritingStep;
