import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AddEditComponent from '@/components/offers/add-edit';
import { useAppSelector } from '@/store/hooks';
import { IPermission } from '@/types/interfaces/permission';

const initialPermissions = {
    name: '',
    description: '',
};

const AddEditIndex = () => {
    const [permission, setPermission] = useState<IPermission>(initialPermissions);
    const router = useRouter();
    const { id } = router.query;

    // useEffect(() => {
    //   const selectedPermissions = permissionList.find((p) => p.id === id);
    //   if (selectedPermissions) {
    //     setPermission({
    //       name: selectedPermissions?.name,
    //       description: selectedPermissions?.description,
    //     });
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [id, router.query]);

    return (
        <div>
            <AddEditComponent
                isUpdate={id ? true : false}
                selectedPermissions={permission}
                permissionId={id as string}
            />
        </div>
    );
};

export default AddEditIndex;
