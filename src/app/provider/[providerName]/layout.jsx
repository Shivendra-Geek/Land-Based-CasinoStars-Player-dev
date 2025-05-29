import slugify from 'slugify';

export async function generateStaticParams() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/games/admin/getAllCombineAPI?action=available_games&token=${process.env.NEXT_PUBLIC_TOKEN}&casino=${process.env.NEXT_PUBLIC_CASINO}&page=1`
    );

    if (!res.ok) {
        console.error('Failed to fetch providers from API');
        return [];
    }

    const data = await res.json();
    const providers = data?.providers || [];

    return providers.map((provider) => ({
        providerName: slugify(provider?.key || provider?.name || '', { lower: true }),
    }));
}

export default function ProviderLayout({ children }) {
    return <>{children}</>;
}
