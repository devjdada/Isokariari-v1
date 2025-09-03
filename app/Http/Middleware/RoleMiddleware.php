<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        Log::info('RoleMiddleware: Starting handle method.');

        if (! $request->user()) {
            Log::warning('RoleMiddleware: User not authenticated. Aborting with 403.');
            abort(403, 'Unauthorized.');
        }

        $userRole = $request->user()->role;
        Log::info('RoleMiddleware: User authenticated.', ['user_id' => $request->user()->id, 'user_role' => $userRole, 'expected_roles' => $roles]);

        $hasRole = false;
        foreach ($roles as $role) {
            if ($userRole == $role) {
                $hasRole = true;
                Log::info('RoleMiddleware: Role matched.', ['user_role' => $userRole, 'matched_role' => $role]);
                break; // Exit loop once a role matches
            }
        }

        if ($hasRole) {
            Log::info('RoleMiddleware: Access granted.');
            return $next($request);
        } else {
            Log::warning('RoleMiddleware: No matching role found. Aborting with 403.', ['user_id' => $request->user()->id, 'user_role' => $userRole, 'expected_roles' => $roles]);
            abort(403, 'Unauthorized. You do not have the required role.'); // Re-enable abort
        }
    }
}
