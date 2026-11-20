'use client';

import { fetchTeachers } from '@/services/teachers';
import Dropdown from '../Dropdown/Dropdown';
import TeachersList from '../TeachersList/TeachersList';
import css from './TeachersView.module.css';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '../Icon/Icon';
import { Filters } from '@/types/filters';

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

interface TeachersViewProps {
  selectedFilters: Filters;
}

type FilterKey = keyof Filters;

function TeachersView({ selectedFilters }: TeachersViewProps) {
  const [filters, setFilters] = useState(selectedFilters);
  const router = useRouter();

  const changeFilters = (value: string, key: FilterKey) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      language: '',
      level: '',
      price: '',
    });
  };

  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    router.replace(params.toString() ? `/teachers?${params}` : '/teachers', {
      scroll: false,
    });
  }, [filters, router]);

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['teachers', filters],
    queryFn: ({ pageParam = 0 }) => fetchTeachers(pageParam, filters),
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
              initialValue={'Language'}
              label="Languages"
              className={css.languageFilter}
              onChange={changeFilters}
              name={'language'}
              filters={filters}
            />
          </li>
          <li>
            <Dropdown
              list={levels}
              initialValue="Level"
              label="Level of knowledge"
              className={css.levelFilter}
              onChange={changeFilters}
              name={'level'}
              filters={filters}
            />
          </li>
          <li>
            <Dropdown
              list={prices}
              initialValue="Price"
              label="Price"
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
            aria-label="Clear filters"
            title="Clear filters"
          >
            <Icon
              className={css.iconCross}
              name="cross"
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
      <TeachersList
        isLoading={isPending}
        hasNextPage={hasNextPage}
        onLoadMore={fetchNextPage}
        teachers={teachers}
        isFetchingNextPage={isFetchingNextPage}
        chosenLevel={filters.level}
        isError={isError}
        onReset={clearFilters}
        buttonText="Show all teachers"
        text="It looks like there are no teachers matching your criteria right now."
      />
    </>
  );
}

export default TeachersView;
