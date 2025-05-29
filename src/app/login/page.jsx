'use client';
import Logo from '@/components/common/logo';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Container, Button, Input } from '@mantine/core';
import confetti from 'canvas-confetti';
import style from './login.module.scss';
import { Icon } from '@iconify/react';
import sha1 from 'sha1';
import axios from 'axios';
import { useInputState } from "@mantine/hooks";
import { useEffect } from 'react';
import { decryptSession, encryptSession } from '@/lib/utils/session';
import Cookies from 'js-cookie';
import { successMsg } from '../component/toastify-msg';

function Login() {
    const [username, setUsername] = useInputState('');
    const [password, setPassword] = useInputState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const [error, setError] = useState('');

    useEffect(() => {
        const session = decryptSession(Cookies.get('player_session'));
        if ((session && pathname === '/login') || window.isTauri) {
            router.push('/');
        }
    }, [pathname, router]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

		const authkey = sha1(
			`${process.env.NEXT_PUBLIC_AUTH_KEY}username=${username}&password=${password}`,
		);

        const params = {
            token: process.env.NEXT_PUBLIC_TOKEN,
            casino: process.env.NEXT_PUBLIC_CASINO,
            authKey: authkey,
            screen: "player"
        };

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_DOMAIN}/players/login-user`,
				{
					username,
					password,
				},
                { params }
			);

            if (response.data?.status === 200) {
                if (response.data?.data?.lock) {
                    setError('Your account has been locked. Please contact administrator for the further information.');
                } else {
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 },
                    });
                    const encrypted = encryptSession(response?.data?.data);
                    Cookies.set('player_session', encrypted, { expires: 7 });
                    router.push('/');
                    successMsg(response?.data?.message);
                }
            } else {
                setError(response?.data?.message);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <main className={style.login_page}>
            <div className={style.login_header}>
                <Logo logoWidth={180} />
            </div>

            <Container size={420} className={style.container}>
                <div className={style.user_type_icon}>
                    <div className={style.icon_box}>
                        <Icon icon={'lucide:user'} width="34" height="34" />
                    </div>
                </div>

                <div className={style.login_title}>
                    <h1 className="page_title">Welcome Back!</h1>
                    <p>Log in to access your dashboard and manage all site content and user activities.</p>
                </div>

                <form onSubmit={handleSubmit} className={style.login_form}>
                    <div className={style.input_field}>
                        <span className={style.label}>Username:</span>
                        <Input
                            type="text"
                            placeholder="Your username"
                            value={username}
                            onChange={setUsername}
                            className={'theme_input'}
                            rightSection={<Icon icon="lucide:user" width="24" height="24" />}
                            rightSectionPointerEvents="auto"
                            required
                        />
                    </div>

                    <div className={style.input_field}>
                        <span className={style.label}>Password:</span>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Your password"
                            value={password}
                            onChange={setPassword}
                            className={'theme_input'}
                            rightSection={
                                <button type="button" className={style.password_show} onClick={togglePasswordVisibility}>
                                    <Icon icon={!showPassword ? 'fluent:eye-16-filled' : 'fluent:eye-off-16-filled'} width="28" height="28" />
                                </button>
                            }
                            rightSectionPointerEvents="auto"
                            required
                        />
                    </div>
                    <Button className="theme_btn dark_blue_btn" type="submit" fullWidth loading={loading}>
                        Get Started
                    </Button>

                    {error && <p className="error_msg">{error}</p>}
                </form>
            </Container>

            <div className={style.login_footer}>
                {/* <ul className={style.privacy_links}>
                        <li>
                            <Link href="#" title="Terms of Services" className={style.footer_text}>
                                Terms of service
                            </Link>
                        </li>
                        <li>
                            <Link href="#" title="Help & Support" className={style.footer_text}>
                                Help & support
                            </Link>
                        </li>
                    </ul> */}

                <p className={style.footer_text}>
                    Copyright © <time> {new Date().getFullYear()} </time> CasinoStars. All rights reserved.
                </p>
            </div>
        </main>
    );
}

export default Login;
