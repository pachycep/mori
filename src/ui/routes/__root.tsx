import { getSupabaseServerClient } from '@/manager/client/supabase'
import appCss from '@/ui/shared/styles/app.css?url'
import { seo, faviconTags } from '@/ui/shared/utils/seo'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  Link,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import type * as React from "react";
import { DefaultCatchBoundary } from "./~components/DefaultCatchBoundary";
import { NotFound } from "./~components/NotFound";
import { BottomNavigation } from './~components/bottom-navigation'

const fetchUser = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = await getSupabaseServerClient();
  const { data, error: _error } = await supabase.auth.getUser();

  if (!data.user?.email) {
    return null;
  }

  return {
    email: data.user.email,
  };
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "모리 - 미용실 관리 시스템",
        description: "미용실 예약 및 고객 관리를 위한 종합 관리 시스템",
        keywords: "미용실, 예약, 헤어샵, 고객관리, 시술관리",
      }),
    ],
    links: [{ rel: "stylesheet", href: appCss }, ...faviconTags()],
  }),
  beforeLoad: async () => {
    const user = await fetchUser();

    return {
      user,
    };
  },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko-KR'>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <BottomNavigation />
        <TanStackRouterDevtools position='bottom-right' />
        <Scripts />
      </body>
    </html>
  );
}
