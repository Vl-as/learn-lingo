'use client';

import { Teacher } from '@/types/teacher';
import css from './TeachersList.module.css';
import TeacherCard from './TeacherCard/TeacherCard';
import { useEffect, useState } from 'react';
import { fetchTeachers } from '@/services/teachers';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

function TeachersList() {
  const [teachersList, setTeachersList] = useState<Teacher[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getTeachers() {
      try {
        setIsLoading(true);
        const { teachers, nextCursor, hasMore } = await fetchTeachers();
        setTeachersList(teachers);
        setCursor(nextCursor);
        setHasMore(hasMore);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getTeachers();

    return () => {
      setTeachersList([]);
      setCursor(null);
      setHasMore(true);
    };
  }, []);

  const loadMore = async () => {
    try {
      setIsLoadingMore(true);
      const { teachers, nextCursor, hasMore } = await fetchTeachers(cursor);
      setTeachersList(prev => [...prev, ...teachers]);
      setCursor(nextCursor);
      setHasMore(hasMore);
    } catch {
      setIsError(true);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <>
      {isLoading && <Loader className={css.loaderComponent} />}
      {isError && <p>Something went wrong</p>}
      {teachersList.length > 0 && (
        <ul className={css.list}>
          {teachersList.map(teacher => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </ul>
      )}
      {hasMore && (
        <Button
          className={css.loadMore}
          disabled={isLoadingMore}
          onClick={loadMore}
        >
          {isLoadingMore ? (
            <>
              <span>Loading</span>
              <span className={css.loader}></span>
            </>
          ) : (
            'Load more'
          )}
        </Button>
      )}
    </>
  );
}

export default TeachersList;
