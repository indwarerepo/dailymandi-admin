import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type Page<P = {}> = NextPage<P> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type FormikHandleChange = {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
        ? void
        : (e: string | ChangeEvent<any>) => void;
};
export interface IPaginator {
    pageIndex: number;
    pageSize: number;
    sortBy: string;
    sortOrder: any;
    filters?: any;
}
