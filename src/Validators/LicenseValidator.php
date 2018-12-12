<?php

namespace ClarkWinkelmann\PostLicense\Validators;

use Flarum\Foundation\AbstractValidator;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Validation\Rule;

class LicenseValidator extends AbstractValidator
{
    protected function getRules()
    {
        $rules = [
            'string',
        ];

        /**
         * @var $settings SettingsRepositoryInterface
         */
        $settings = app(SettingsRepositoryInterface::class);

        if ($settings->get('clarkwinkelmann-post-license.require-license')) {
            $rules[] = 'required';
        } else {
            $rules[] = 'nullable';
        }

        if (!$settings->get('clarkwinkelmann-post-license.allow-custom-license')) {
            $rules[] = Rule::in(json_decode($settings->get('clarkwinkelmann-post-license.enabled-licenses', '[]')));
        }

        return [
            'license' => $rules,
        ];
    }
}
