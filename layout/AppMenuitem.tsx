import Link from "next/link";
import { useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import { MenuContext } from "./context/menucontext";
import { AppMenuItemProps } from "../types/layout";
import { cn } from "@/lib/utils";

import { CSSTransition } from "react-transition-group";
import { ChevronRight } from "lucide-react";

const AppMenuitem = (props: AppMenuItemProps) => {
  const { activeMenu, setActiveMenu } = useContext(MenuContext);
  const router = useRouter();
  const item = props.item;
  const key = props.parentKey
    ? props.parentKey + "-" + props.index
    : String(props.index);
  const isActiveRoute = item!.to && router.pathname === item!.to;
  const active = activeMenu === key || activeMenu.startsWith(key + "-");
  const csstransitionRef = useRef(null);

  useEffect(() => {
    if (item!.to && router.pathname === item!.to) {
      setActiveMenu(key);
    }

    const onRouteChange = (url: string) => {
      if (item!.to && item!.to === url) {
        setActiveMenu(key);
      }
    };

    router.events.on("routeChangeComplete", onRouteChange);

    return () => {
      router.events.off("routeChangeComplete", onRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const itemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    //avoid processing disabled items
    if (item!.disabled) {
      event.preventDefault();
      return;
    }

    //execute command
    if (item!.command) {
      item!.command({ originalEvent: event, item: item });
    }

    // toggle active state
    if (item!.items) setActiveMenu(active ? (props.parentKey as string) : key);
    else setActiveMenu(key);
  };

  const subMenu = item!.items && item!.visible !== false && (
    <CSSTransition
      nodeRef={csstransitionRef}
      timeout={{ enter: 1000, exit: 450 }}
      classNames="layout-submenu"
      in={props.root ? true : active}
      key={item!.label}
    >
      <ul ref={csstransitionRef}>
        {item!.items.map((child, i) => {
          return (
            <AppMenuitem
              item={child}
              index={i}
              className={child.badgeClass}
              parentKey={key}
              key={child.label}
            />
          );
        })}
      </ul>
    </CSSTransition>
  );

  const commonContent = (
    <>
      {item && item.icon ? (
        <item.icon className={cn("layout-menuitem-icon w-4 h-4")} />
      ) : null}
      <span className="layout-menuitem-text">{item!.label}</span>
      {item!.items && !item?.isWorkSpaceMenu ? (
        <ChevronRight className="layout-submenu-toggler w-3 h-3 ml-auto" />
      ) : null}
    </>
  );

  return (
    <li
      className={cn({
        "layout-root-menuitem": props.root,
        "active-menuitem": active,
      })}
    >
      {props.root && item!.visible !== false && (
        <div className="layout-menuitem-root-text">{item!.label}</div>
      )}
      {(!item!.to || item!.items) && item!.visible !== false ? (
        <a
          href={item!.url}
          onClick={(e) => itemClick(e)}
          className={cn(item!.class, "p-ripple")}
          target={item!.target}
          tabIndex={0}
        >
          {commonContent}
        </a>
      ) : null}

      {item!.to && !item!.items && item!.visible !== false ? (
        <Link
          href={item!.to}
          replace={item!.replaceUrl}
          target={item!.target}
          onClick={(e) => itemClick(e)}
          className={cn(item!.class, "p-ripple", {
            "active-route": isActiveRoute,
          })}
          tabIndex={0}
        >
          {commonContent}
        </Link>
      ) : null}

      {subMenu}
    </li>
  );
};

export default AppMenuitem;
