'use client';

import { useT } from './useT';
import type { TranslationKey } from './types';

interface TProps {
  k: TranslationKey;
  params?: Record<string, string | number>;
}

function T({ k, params }: TProps) {
  const { t } = useT();
  return <>{t(k, params)}</>;
}

export default T;
