import app from 'flarum/app';
import LicenseSettingsModal from './components/LicenseSettingsModal';

app.initializers.add('clarkwinkelmann/post-license', () => {
    app.extensionSettings['clarkwinkelmann-post-license'] = () => app.modal.show(new LicenseSettingsModal());
});
