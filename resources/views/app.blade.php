<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark'=> ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? "system" }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    <title inertia>{{ config('app.name', 'O.K. Isokariari Nigeria Limited - Engineering Excellence') }}</title>

    <link rel="icon" href="/images/favicon.ico" sizes="any">
    <link rel="icon" href="/images/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />


    <meta
        name="description"
        content="O.K. Isokariari Nigeria Limited (O.K.I) - A leading EPC company with over 51 years of engineering excellence in civil engineering and building projects." />
    <meta name="author" content="O.K. Isokariari Nigeria Limited" />
    <meta
        name="keywords"
        content="O.K. Isokariari Nigeria Limited, O.K.I, Engineering, EPC, Civil Engineering, Building Projects, Construction, Infrastructure, Nigeria, Engineering Excellence" />
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow" />
    <meta name="revised" content="Monday, June 10th, 2024, 3:00 pm" />
    <meta name="category" content="Engineering, Construction, EPC" />
    <meta name="coverage" content="Worldwide" />
    <meta name="distribution" content="Global" />
    <meta name="rating" content="General" />
    <meta name="language" content="English" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="developer" content="Johnson Dada" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet" />

    <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/images/apple-icon-57x57.png" />
    <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/images/apple-icon-60x60.png" />
    <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/images/apple-icon-72x72.png" />
    <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/images/apple-icon-76x76.png" />
    <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/images/apple-icon-114x114.png" />
    <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/images/apple-icon-120x120.png" />
    <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/images/apple-icon-144x144.png" />
    <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/images/apple-icon-152x152.png" />
    <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/apple-icon-180x180.png" />
    <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/images/android-icon-192x192.png" />
    <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicon-32x32.png" />
    <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/images/favicon-96x96.png" />
    <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/favicon-16x16.png" />
    <link rel="manifest" href="/images/manifest.json" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta
        name="msapplication-TileImage"
        content="/images/ms-icon-144x144.png" />
    <meta name="theme-color" content="#ffffff" />

    <meta
        property="og:title"
        content="O.K. Isokariari Nigeria Limited - Engineering Excellence" />
    <meta
        property="og:description"
        content="A leading EPC company with over 51 years of engineering excellence in civil engineering and building projects." />
    <meta property="og:type" content="website" />
    <meta
        property="og:image"
        content="/lovable-uploads/913966a1-aabe-49b4-a605-333251687c87.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@lovable_dev" />
    <meta
        name="twitter:image"
        content="/lovable-uploads/913966a1-aabe-49b4-a605-333251687c87.png" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>