import clsx from 'clsx';
import css from './Loader.module.css';

interface LoaderProps {
  className?: string;
}
function Loader({ className }: LoaderProps) {
  return <div className={clsx(css.loader, className)}></div>;
}

export default Loader;
