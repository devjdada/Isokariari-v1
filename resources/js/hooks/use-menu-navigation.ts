import * as React from 'react';

export interface UseMenuNavigationOptions<T> {
    containerRef: React.RefObject<HTMLElement>;
    items: T[];
    orientation?: 'vertical' | 'horizontal' | 'both';
    onSelect?: (item: T) => void;
    onClose?: () => void;
    autoSelectFirstItem?: boolean;
}

export function useMenuNavigation<T>(options: UseMenuNavigationOptions<T>) {
    return { selectedIndex: -1 };
}
