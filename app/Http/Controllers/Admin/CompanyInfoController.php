<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class CompanyInfoController extends Controller
{
    public function manage()
    {
        $companyInfo = CompanyInfo::first();

        if (!$companyInfo) {
            // If no record exists, create a new empty one
            $companyInfo = CompanyInfo::create([
                'about_content' => '',
                'vision' => '',
                'mission' => '',
                'history' => '',
                'contact_email' => '',
                'contact_phone' => '',
                'address' => '',
                'social_media' => [],
                'meta_description' => '',
                'meta_keywords' => '',
            ]);
        }

        return Inertia::render('Admin/CompanyInfo/Manage', [
            'companyInfo' => $companyInfo,
        ]);
    }

    public function update(Request $request)
    {
        $companyInfo = CompanyInfo::first();

        $validatedData = $request->validate([
            'about_content' => 'nullable|string',
            'vision' => 'nullable|string',
            'mission' => 'nullable|string',
            'history' => 'nullable|string',
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'social_media' => 'nullable|array',
            'social_media.facebook' => 'nullable|url|max:255',
            'social_media.twitter' => 'nullable|url|max:255',
            'social_media.linkedin' => 'nullable|url|max:255',
            'social_media.instagram' => 'nullable|url|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string|max:255',
        ]);

        if (!$companyInfo) {
            // Should not happen if manage() always creates one, but as a fallback
            CompanyInfo::create($validatedData);
        } else {
            $companyInfo->update($validatedData);
        }

        return Redirect::route('admin.company-info.manage')
            ->with('success', 'Company Info updated successfully.');
    }
}