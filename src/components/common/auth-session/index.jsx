'use client';
import React, { useEffect } from 'react';
import { sessionForDesktop } from '../../../../session';
import Cookies from 'js-cookie';
import { decryptSession } from '@/lib/utils/session';
import { useRouter } from 'next/navigation';
import { destroySession } from '@/lib/features/session/sessionSlice';

const AuthSession = () => {
    const router = useRouter();
    useEffect(() => {
        if (window.isTauri) {
            Cookies.set('player_session', sessionForDesktop);
            console.log(decryptSession(sessionForDesktop))

            // console.log(sessionForDesktop);
        }
    }, []);
    return null;
};

export default AuthSession;
