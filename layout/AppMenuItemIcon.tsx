import Link from 'next/link';
import React from 'react';
import {
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { AppMenuIconItem } from '@/types/interfaces/menu';
import { cn } from '@/lib/utils';

const SubMenu = ({
    item,
    itemClick,
}: {
    item: AppMenuIconItem;
    itemClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}) => (
    <MenubarSub>
        <MenubarSubTrigger className="data-[state=open]:text-[var(--workspaceColor1)] hover:text-[var(--workspaceColor1)] hover:bg-card data-[state=open]:bg-card focus:bg-card focus:text-appColor">
            <Link href={item.to ? `${item!.to}` : ''} onClick={(e) => itemClick(e)}>
                {item.label}
            </Link>
        </MenubarSubTrigger>
        {item.items?.length !== 0 && (
            <MenubarSubContent>
                {item.items?.map((subitem, i) => (
                    <React.Fragment key={i}>
                        {subitem.items ? (
                            <SubMenu item={subitem} itemClick={itemClick} />
                        ) : (
                            <MenubarItem className="focus:bg-card focus:text-[var(--workspaceColor1)] hover:text-[var(--workspaceColor1)]">
                                <Link href={subitem.to ? subitem!.to : ''}>{subitem.label}</Link>
                            </MenubarItem>
                        )}
                    </React.Fragment>
                ))}
            </MenubarSubContent>
        )}
    </MenubarSub>
);

export default function AppMenuItemIcon({ item, index }: { item: AppMenuIconItem; index: number }) {
    const itemClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (item!.command) {
            item!.command({ originalEvent: event, item: item });
        }
    };
    return (
        <MenubarMenu>
            <MenubarTrigger
                className={`"data-[state=open]:text-pophover-foreground hover:text-[var(--workspaceColor2)] hover:bg-card data-[state=open]:bg-card focus:bg-card focus:text-[var(--workspaceColor2)] px-3 py-2.5 ml-0" ${
                    item.hide && 'hidden'
                }`}
            >
                {item && item.icon ? (
                    <Link href={item.to ? `${item!.to}` : ''} onClick={(e) => itemClick(e)}>
                        <item.icon className={cn('layout-menuitem-icon w-4 h-4')} />
                    </Link>
                ) : null}
            </MenubarTrigger>
            <MenubarContent className="menu-icon" alignOffset={70} sideOffset={-41}>
                {item.items ? (
                    <SubMenu item={item} itemClick={itemClick} />
                ) : (
                    <MenubarItem className="focus:bg-card focus:text-[var(--workspaceColor2)]  hover:text-[var(--workspaceColor2)]">
                        {item.label}
                    </MenubarItem>
                )}
            </MenubarContent>
        </MenubarMenu>
    );
}
