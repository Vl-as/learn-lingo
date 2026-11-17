import css from './MainLoader.module.css';
import Loader from '@/components/Loader/Loader';

function MainLoader() {
  return (
    <div className={css.overlay}>
      <div className={css.loadingBox}>
        <Loader className={css.loader} />
      </div>
    </div>
  );
}

export default MainLoader;
