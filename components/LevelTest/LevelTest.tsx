'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Button from '../Button/Button';
import LinkButton from '../LinkButton/LinkButton';
import WritingStep from './WritingStep';
import {
  combineLevels,
  getLevel,
  nativeNames,
  questionsByLanguage,
  testLanguages,
  type TestLanguage,
} from '@/data/levelTest';
import type { Assessment } from '@/types/assessment';
import css from './LevelTest.module.css';

function LevelTest() {
  const [language, setLanguage] = useState<TestLanguage | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [writingDone, setWritingDone] = useState(false);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const questionRef = useRef<HTMLFieldSetElement>(null);
  const resultRef = useRef<HTMLElement>(null);

  const questions = language ? questionsByLanguage[language] : [];
  const step = answers.length;
  const isFinished = language !== null && step === questions.length;
  const showWriting = isFinished && !writingDone;

  useEffect(() => {
    if (!language || showWriting) return;

    (isFinished ? resultRef : questionRef).current?.focus();
  }, [language, step, isFinished, showWriting]);

  const handleNext = () => {
    if (selected === null) return;

    setAnswers(prev => [...prev, selected]);
    setSelected(null);
  };

  const handleWritingDone = (result: Assessment | null) => {
    setAssessment(result);
    setWritingDone(true);
  };

  const handleReset = () => {
    setLanguage(null);
    setAnswers([]);
    setSelected(null);
    setWritingDone(false);
    setAssessment(null);
  };

  if (!language) {
    return (
      <section className={css.card}>
        <h2 className={css.chooseTitle}>Choose a language</h2>
        <p className={css.chooseText}>
          Each test has 12 questions and takes about 3 minutes.
        </p>
        <ul className={css.languages}>
          {testLanguages.map(item => (
            <li key={item}>
              <button
                type="button"
                className={css.languageButton}
                onClick={() => setLanguage(item)}
              >
                <span className={css.languageName}>{item}</span>
                <span className={css.languageNative}>{nativeNames[item]}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (showWriting) {
    return <WritingStep language={language} onDone={handleWritingDone} />;
  }

  if (isFinished) {
    const score = answers.filter(
      (answer, index) => answer === questions[index].correct
    ).length;
    const grammarLevel = getLevel(score);
    const level = assessment
      ? combineLevels(grammarLevel, assessment.level)
      : grammarLevel;
    const params = new URLSearchParams({
      language,
      level: level.name,
    });

    return (
      <section ref={resultRef} tabIndex={-1} className={css.card}>
        <p className={css.label}>Your approximate {language} level</p>
        <h2 className={css.levelName}>{level.name}</h2>
        <p className={css.score}>
          {assessment
            ? `Grammar test: ${grammarLevel.name} · Writing (AI): ${assessment.level}`
            : `${score} of ${questions.length} correct answers`}
        </p>
        <p className={css.description}>{level.description}</p>

        {assessment && (
          <div className={css.feedback}>
            <h3 className={css.feedbackTitle}>AI feedback on your writing</h3>
            <p className={css.feedbackText}>{assessment.summary}</p>
            {assessment.mistakes.length > 0 && (
              <ul className={css.mistakes}>
                {assessment.mistakes.map((mistake, index) => (
                  <li
                    key={`${index}-${mistake.original}`}
                    className={css.mistake}
                  >
                    <p>
                      <span className={css.wrong}>{mistake.original}</span>
                      {' → '}
                      <span className={css.right}>{mistake.correction}</span>
                    </p>
                    <p className={css.explanation}>{mistake.explanation}</p>
                  </li>
                ))}
              </ul>
            )}
            <p className={css.feedbackText}>
              <strong>Tip:</strong> {assessment.tip}
            </p>
          </div>
        )}

        <p className={css.note}>
          {assessment
            ? 'The writing part is an AI estimate, so the result is approximate.'
            : 'This is a short grammar and vocabulary check, so the result is approximate.'}
        </p>
        <div className={css.actions}>
          <LinkButton href={`/teachers?${params.toString()}`}>
            Find {language} teachers
          </LinkButton>
          <Button className={css.secondary} onClick={handleReset}>
            Take another test
          </Button>
        </div>
      </section>
    );
  }

  const question = questions[step];

  return (
    <section className={css.card}>
      <div
        className={css.progress}
        role="progressbar"
        aria-label="Test progress"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={step}
      >
        <span
          className={css.progressBar}
          style={{ width: `${(step / questions.length) * 100}%` }}
        />
      </div>
      <p className={css.counter}>
        {language}: question {step + 1} of {questions.length}
      </p>
      <fieldset
        key={`${language}-${question.id}`}
        ref={questionRef}
        tabIndex={-1}
        className={css.fieldset}
      >
        <legend className={css.question}>{question.text}</legend>
        <ul className={css.options}>
          {question.options.map((option, index) => (
            <li key={option}>
              <label
                className={clsx(
                  css.option,
                  selected === index && css.optionSelected
                )}
              >
                <input
                  className={css.radio}
                  type="radio"
                  name={`question-${question.id}`}
                  checked={selected === index}
                  onChange={() => setSelected(index)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <Button
        className={css.next}
        onClick={handleNext}
        disabled={selected === null}
      >
        {step === questions.length - 1 ? 'Continue' : 'Next'}
      </Button>
    </section>
  );
}

export default LevelTest;
