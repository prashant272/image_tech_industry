'use client';

import React, { useEffect } from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter, useParams as useNextParams, useSearchParams } from 'next/navigation';

export function Link({ to, href, children, ...props }) {
  const target = to || href || '#';
  return (
    <NextLink href={target} {...props}>
      {children}
    </NextLink>
  );
}

export function NavLink({ to, href, className, children, end, ...props }) {
  const pathname = usePathname();
  const target = to || href || '';
  const isActive = end ? pathname === target : (target === '/' ? pathname === '/' : pathname?.startsWith(target));
  const resolvedClass = typeof className === 'function' ? className({ isActive }) : className;

  return (
    <NextLink href={target} className={resolvedClass} {...props}>
      {children}
    </NextLink>
  );
}

export function useLocation() {
  const pathname = usePathname() || '/';
  const searchParams = useSearchParams();
  const search = searchParams ? (searchParams.toString() ? `?${searchParams.toString()}` : '') : '';

  return {
    pathname,
    search,
    hash: '',
    state: null,
  };
}

export function useParams() {
  const params = useNextParams();
  return params || {};
}

export function useNavigate() {
  const router = useRouter();
  return (to, options) => {
    if (typeof to === 'number') {
      if (to === -1) router.back();
      return;
    }
    if (options?.replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  };
}

export function Navigate({ to, replace }) {
  const router = useRouter();
  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [router, to, replace]);
  return null;
}

export function Outlet({ children }) {
  return children || null;
}
