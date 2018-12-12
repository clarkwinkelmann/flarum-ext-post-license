<?php

namespace ClarkWinkelmann\PostLicense\Listeners;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

class ForumAttributes
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'serializing']);
    }

    public function serializing(Serializing $event)
    {
        if ($event->serializer instanceof ForumSerializer) {
            /**
             * @var $settings SettingsRepositoryInterface
             */
            $settings = app(SettingsRepositoryInterface::class);

            $event->attributes['clarkwinkelmann-post-license.require-license'] = (bool)$settings->get('clarkwinkelmann-post-license.require-license');
            $event->attributes['clarkwinkelmann-post-license.allow-custom-license'] = (bool)$settings->get('clarkwinkelmann-post-license.allow-custom-license');
            $event->attributes['clarkwinkelmann-post-license.enabled-licenses'] = json_decode($settings->get('clarkwinkelmann-post-license.enabled-licenses', '[]'));
        }
    }
}
