import { IPaginator } from '@/types/types';
import { type ClassValue, clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function useSorting(initialField = 'createdAt', initialOrder = 'DESC') {
    const [sorting, setSorting] = useState([{ id: initialField, desc: initialOrder === 'DESC' }]);
    return {
        // 🔽 Table sorting state
        sorting,
        onSortingChange: setSorting,
        // 🔽 API sorting parameters
        order: !sorting.length ? initialOrder : sorting[0].desc ? '-1' : '1',
        field: sorting.length ? sorting[0].id : initialField,
    };
}

const initialPaginator: Pick<IPaginator, 'pageIndex' | 'pageSize'> = {
    pageIndex: 0,
    pageSize: 10,
};

export function usePagination() {
    const [paginator, setPaginator] = useState<Pick<IPaginator, 'pageIndex' | 'pageSize'>>(initialPaginator);
    const { pageSize, pageIndex } = paginator;

    return {
        pageIndex,
        pageSize,
        onPaginationChange: setPaginator,
        paginator,
    };
}

export const useDebounce = <T>(value: T, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
};
