'use client';

import { fetchTeachers } from '@/services/teachers';
import Dropdown from '../Dropdown/Dropdown';
import TeachersList from '../TeachersList/TeachersList';
import css from './TeachersView.module.css';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useOptimistic, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '../Icon/Icon';
import { Filters } from '@/types/filters';
import Link from 'next/link';
import { useT } from '@/i18n/useT';
import type { TranslationKey } from '@/i18n/types';

const languages: string[] = [
  'French',
  'English',
  'German',
  'Ukrainian',
  'Polish',
  'Vietnamese',
  'Mandarin Chinese',
];

const levels: string[] = [
  'A1 Beginner',
  'A2 Elementary',
  'B1 Intermediate',
  'B2 Upper-Intermediate',
  'C1 Advanced',
  'C2 Proficient',
];

const prices: string[] = ['10', '20', '30', '40', '50'];

const languageLabelKeys: Record<string, TranslationKey> = {
  French: 'filters.languageNames.french',
  English: 'filters.languageNames.english',
  German: 'filters.languageNames.german',
  Ukrainian: 'filters.languageNames.ukrainian',
  Polish: 'filters.languageNames.polish',
  Vietnamese: 'filters.languageNames.vietnamese',
  'Mandarin Chinese': 'filters.languageNames.mandarinChinese',
};

const levelLabelKeys: Record<string, TranslationKey> = {
  'A1 Beginner': 'filters.levels.a1',
  'A2 Elementary': 'filters.levels.a2',
  'B1 Intermediate': 'filters.levels.b1',
  'B2 Upper-Intermediate': 'filters.levels.b2',
  'C1 Advanced': 'filters.levels.c1',
  'C2 Proficient': 'filters.levels.c2',
};

interface TeachersViewProps {
  selectedFilters: Filters;
}

type FilterKey = keyof Filters;

function buildUrl(filters: Filters) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  return params.toString() ? `/teachers?${params}` : '/teachers';
}

function TeachersView({ selectedFilters }: TeachersViewProps) {
  const { t } = useT();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [filters, setOptimisticFilters] = useOptimistic(selectedFilters);

  const navigate = (next: Filters) => {
    startTransition(() => {
      setOptimisticFilters(next);
      router.push(buildUrl(next), { scroll: false });
    });
  };

  const changeFilters = (value: string, key: FilterKey) => {
    navigate({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    navigate({ language: '', level: '', price: '' });
  };

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['teachers', selectedFilters],
    queryFn: ({ pageParam = 0 }) => fetchTeachers(pageParam, selectedFilters),
    initialPageParam: 0,
    placeholderData: keepPreviousData,
    getNextPageParam: lastPage => lastPage.nextPage,
  });

  const teachers = data?.pages.flatMap(page => page.teachers) ?? [];
  const isFiltered = Object.values(filters).some(value => value !== '');

  return (
    <>
      <div className={css.filtersWrapper}>
        <ul className={css.filters}>
          <li>
            <Dropdown
              list={languages}
              initialValue={t('filters.languagePlaceholder')}
              label={t('filters.languages')}
              className={css.languageFilter}
              onChange={changeFilters}
              name={'language'}
              filters={filters}
              renderLabel={value =>
                languageLabelKeys[value] ? t(languageLabelKeys[value]) : value
              }
            />
          </li>
          <li>
            <Dropdown
              list={levels}
              initialValue={t('filters.levelPlaceholder')}
              label={t('filters.levelOfKnowledge')}
              className={css.levelFilter}
              onChange={changeFilters}
              name={'level'}
              filters={filters}
              renderLabel={value =>
                levelLabelKeys[value] ? t(levelLabelKeys[value]) : value
              }
            />
          </li>
          <li>
            <Dropdown
              list={prices}
              initialValue={t('filters.pricePlaceholder')}
              label={t('filters.price')}
              symbol="$"
              className={css.priceFilter}
              onChange={changeFilters}
              name={'price'}
              filters={filters}
            />
          </li>
        </ul>
        {isFiltered && (
          <button
            className={css.clearFilters}
            type="button"
            onClick={clearFilters}
            aria-label={t('filters.clear')}
            title={t('filters.clear')}
          >
            <Icon
              className={css.iconCross}
              name="cross"
              width={20}
              height={20}
            />
            <span className={css.clearFiltersText}>{t('filters.clear')}</span>
          </button>
        )}
        <Link href="/level-test" className={css.levelHint}>
          <span className={css.levelHintText}>{t('filters.unsureLevel')}</span>
          <span className={css.levelHintAction}>
            {t('filters.takeLevelTest')}
            <span className={css.levelHintArrow} aria-hidden="true">
              <Icon
                className={css.iconArrow}
                name="forward"
                width={16}
                height={16}
              />
            </span>
          </span>
        </Link>
      </div>
      <TeachersList
        isLoading={isPending}
        hasNextPage={hasNextPage}
        onLoadMore={fetchNextPage}
        teachers={teachers}
        isFetchingNextPage={isFetchingNextPage}
        chosenLevel={selectedFilters.level}
        isError={isError}
        onReset={clearFilters}
        buttonText={t('teachers.showAllTeachers')}
        text={t('teachers.noMatches')}
      />
    </>
  );
}

export default TeachersView;
