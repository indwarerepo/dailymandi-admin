import ViewCustomer from '@/components/customer/view-customer';
import { Spinner } from '@/components/ui/spinner';
import {
    useGetAddressByCustomerIdQuery,
    useGetKYCAccountByCustomerIdQuery,
    useGetTransactionByCustomerIdQuery,
} from '@/features/customer/customerAPI';
import { RCustomerAddressDetails, RKYCDetails, RTransactionDetails } from '@/types/interfaces/customer';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDebounce, usePagination, useSorting } from '@/lib/utils';
import { ColumnFiltersState } from '@tanstack/react-table';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/store/hooks';

const CustomerIndex = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const aone_token = getCookie('aone_token');
    const userType = useAppSelector((state: any) => state?.persistedReducers?.authSlice?.data?.userType);

    if (aone_token) {
        if (userType === 'Driver') {
            router.push('/delivery-dashboard');
        }
    } else {
        router.push('/');
    }
    const { pageIndex, pageSize, onPaginationChange, paginator } = usePagination();
    const { sorting, onSortingChange, field, order } = useSorting();
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const debouncedColumnFilters: ColumnFiltersState = useDebounce(columnFilters, 1000);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: addressList } = useGetAddressByCustomerIdQuery(id, { skip: !id });

    const { data: kycAccountDetails } = useGetKYCAccountByCustomerIdQuery(id, { skip: !id });
    const { data: transactionsDetails, isLoading } = useGetTransactionByCustomerIdQuery(
        {
            id: router?.query?.id as string,
            pageIndex: pageIndex as number,
            pageSize: pageSize as number,
            sortBy: field,
            sortOrder: order,
            filters: debouncedColumnFilters,
        },
        { refetchOnMountOrArgChange: true },
        // { skip: !id },
    );
    const emptyMessage = () => {
        if (isLoading) {
            return <Spinner />;
        } else if (transactionsDetails && transactionsDetails?.count === 0) {
            return renderEmpty();
        }
        return null;
    };

    const renderEmpty = () => {
        return <div>No Transaction Available!!!</div>;
    };

    return (
        <div>
            <ViewCustomer
                AddressList={(addressList?.data as RCustomerAddressDetails[]) || []}
                KYCAccountDetails={kycAccountDetails?.data || ({} as RKYCDetails)}
                TransactionsDetails={(transactionsDetails?.data as RTransactionDetails[]) || []}
                emptyMessage={emptyMessage}
                paginator={paginator}
                onPaginationChange={onPaginationChange}
                sorting={sorting}
                onSortingChange={onSortingChange}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                // dataCount={transactionsDetails?.count || 0}
                dataCount={transactionsDetails?.count ? Math.ceil(transactionsDetails?.count / paginator?.pageSize) : 0}
            />
        </div>
    );
};

export default CustomerIndex;
