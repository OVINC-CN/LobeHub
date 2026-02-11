'use client';

import { memo, useEffect } from 'react';
import { createStoreUpdater } from 'zustand-utils';

import { useSession } from '@/libs/better-auth/auth-client';
import { useUserStore } from '@/store/user';
import { type LobeUser } from '@/types/user';

/**
 * Sync Better-Auth session state to Zustand store
 */
const UserUpdater = memo(() => {
  const { data: session, isPending, error } = useSession();

  const isLoaded = !isPending;
  // When useSession() returns an error (e.g. network failure), preserve the existing
  // login state instead of clearing it. Real auth failures (401) are handled by the
  // TRPC error link which triggers logout explicitly.
  const isSignedIn = error
    ? useUserStore.getState().isSignedIn
    : !!session?.user;

  const betterAuthUser = session?.user;
  const useStoreUpdater = createStoreUpdater(useUserStore);

  useStoreUpdater('isLoaded', isLoaded);
  useStoreUpdater('isSignedIn', isSignedIn);

  // Sync user data from Better-Auth session to Zustand store
  useEffect(() => {
    if (betterAuthUser) {
      const userAvatar = useUserStore.getState().user?.avatar;

      const lobeUser = {
        // Preserve avatar from settings, don't override with auth provider value
        avatar: userAvatar || '',
        email: betterAuthUser.email,
        fullName: betterAuthUser.name,
        id: betterAuthUser.id,
        username: betterAuthUser.username,
      } as LobeUser;

      // Update user data in store
      useUserStore.setState({ user: lobeUser });
      return;
    }

    // Only clear user data when session explicitly has no user (not on fetch errors).
    // Fetch errors (network issues) should not discard the cached user.
    if (!error) {
      useUserStore.setState({ user: undefined });
    }
  }, [betterAuthUser]);

  return null;
});

export default UserUpdater;
