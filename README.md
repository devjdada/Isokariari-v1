# Isokariari-v1

## Environment Variables

To run this project, you will need to create a `.env` file in the root of your project. You can duplicate the `.env.example` file and rename it to `.env`.

```bash
cp .env.example .env
```

Then, you need to fill in the environment variables in the `.env` file. A typical configuration for local development would be:

```env
APP_NAME=Isokariari
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=isokariari
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=file
SESSION_LIFETIME=120

VITE_APP_NAME="${APP_NAME}"
```

After setting up your environment variables, you need to generate an application key:

```bash
php artisan key:generate
```

## Deployment to Shared Host

Deploying a Laravel application to a shared hosting environment requires a few specific steps:

1.  **Prepare Your Project:**
    *   Run `composer install --optimize-autoloader --no-dev`
    *   Run `npm install && npm run build`
    *   Zip your entire project folder, excluding `node_modules` and `.git`.

2.  **Upload and Extract:**
    *   Upload the zip file to your hosting account, usually in the root directory (e.g., outside `public_html`).
    *   Extract the contents. Your project will now be in a folder like `/home/your_user/your_project_folder`.

3.  **Configure the Public Directory:**
    *   The `public_html` or `www` directory on your shared host is the web root.
    *   Copy the **contents** of your Laravel project's `public` directory into `public_html`.
    *   You should now have `index.php`, `.htaccess`, `robots.txt`, and your `build` directory inside `public_html`.

4.  **Update `index.php`:**
    *   Open `public_html/index.php` and edit the paths to point to your project's core files.
    *   Change:
        ```php
        require __DIR__.'/../vendor/autoload.php';
        $app = require_once __DIR__.'/../bootstrap/app.php';
        ```
    *   To (adjust `your_project_folder`):
        ```php
        require __DIR__.'/../your_project_folder/vendor/autoload.php';
        $app = require_once __DIR__.'/../your_project_folder/bootstrap/app.php';
        ```

5.  **Set Up `.env` File:**
    *   In your project's root folder (e.g., `your_project_folder`), create a `.env` file.
    *   Update `APP_ENV` to `production` and `APP_DEBUG` to `false`.
    *   Fill in your database credentials provided by your hosting provider.
    *   Set `APP_URL` to your live domain name.

6.  **Database:**
    *   Use the hosting panel's tools (like phpMyAdmin) to import your local database SQL file.

7.  **Final Steps:**
    *   If you have SSH access, run these commands in your project's root directory:
        ```bash
        php artisan storage:link
        php artisan optimize:clear
        php artisan optimize
        ```
    *   If you don't have SSH, you may need to find alternative ways to run these commands or manually clear cache files in `storage/framework/`. The `storage:link` command creates a symbolic link from `public/storage` to `storage/app/public`. If you cannot create a symlink, you may need to move your public assets to the `public` directory.

## .htaccess Configuration

The `.htaccess` file is crucial for routing requests correctly and securing your application on shared hosting. The default Laravel `.htaccess` file located in the `public` directory is usually sufficient. Ensure this file is copied to your `public_html` directory.

Here is the standard content of the `.htaccess` file for a Laravel application:

```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Handle Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

**Important Notes:**

*   **File Visibility:** `.htaccess` files are hidden by default in many file managers. Make sure your file manager is set to show hidden files.
*   **mod_rewrite:** Ensure that the `mod_rewrite` module is enabled on your shared hosting server. Most modern hosts have it enabled by default. If your routes are not working, this is the first thing to check with your hosting provider.
*   **Permissions:** The `.htaccess` file should have file permissions of `644`.
