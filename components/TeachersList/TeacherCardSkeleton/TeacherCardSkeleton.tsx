import css from './TeacherCardSkeleton.module.css';

function TeacherCardSkeleton() {
  return (
    <li className={css.card}>
      <div className={css.avatar}></div>
      <div className={css.content}>
        <div className={css.header}>
          <div className={css.title} />
          <div className={css.meta}></div>
        </div>
        <div className={css.info} />
        <div className={css.text} />
        <div className={css.textSmall} />
        <div className={css.textShort} />

        <ul className={css.list}>
          <li className={css.listItem}></li>
          <li className={css.listItem}></li>
          <li className={css.listItem}></li>
        </ul>
      </div>
    </li>
  );
}

export default TeacherCardSkeleton;
