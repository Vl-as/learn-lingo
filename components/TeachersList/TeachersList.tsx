import css from './TeachersList.module.css';
import TeacherCard from './TeacherCard/TeacherCard';
import Button from '../Button/Button';
import { Teacher } from '@/types/teacher';

interface TeachersListProps {
  teachers: Teacher[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}

function TeachersList({
  teachers,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: TeachersListProps) {
  return (
    <>
      <ul className={css.list}>
        {teachers.map(teacher => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </ul>
      {hasNextPage && (
        <Button
          className={css.loadMore}
          disabled={isFetchingNextPage}
          onClick={() => onLoadMore()}
        >
          {isFetchingNextPage ? (
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
