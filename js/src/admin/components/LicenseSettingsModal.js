import app from 'flarum/app';
import SettingsModal from 'flarum/components/SettingsModal';
import Switch from 'flarum/components/Switch';
import licenses from '../../common/licenses';

const settingsPrefix = 'clarkwinkelmann-post-license.';
const translationPrefix = 'clarkwinkelmann-post-license.admin.settings.';

export default class LicenseSettingsModal extends SettingsModal {
    init() {
        super.init();

        this.filter = m.prop('');
    }

    title() {
        return app.translator.trans(translationPrefix + 'title');
    }

    form() {
        let enabledLicenses = ['MIT'];

        if (this.setting(settingsPrefix + 'enabled-licenses')()) {
            try {
                enabledLicenses = JSON.parse(this.setting(settingsPrefix + 'enabled-licenses')());
            } catch (e) {
                console.error('Invalid value for enabled licenses');
            }
        }

        const filterValue = this.filter().toLowerCase();

        return [
            m('.Form-group', [
                m('label', Switch.component({
                    state: this.setting(settingsPrefix + 'require-license')() > 0,
                    onchange: this.setting(settingsPrefix + 'require-license'),
                    children: app.translator.trans(translationPrefix + 'field.require-license'),
                })),
            ]),
            m('.Form-group', [
                m('label', Switch.component({
                    state: this.setting(settingsPrefix + 'allow-custom-license')() > 0,
                    onchange: this.setting(settingsPrefix + 'allow-custom-license'),
                    children: app.translator.trans(translationPrefix + 'field.allow-custom-license'),
                })),
            ]),
            m('h3', app.translator.trans(translationPrefix + 'field.enabled-licenses')),
            m('.Form-group', [
                m('input[type=text].FormControl', {
                    bidi: this.filter,
                    placeholder: app.translator.trans(translationPrefix + 'field.filter-licenses'),
                }),
            ]),
            m('.ClarkWinkelmann__Post__Licenses', licenses.licenses.map(license => {
                if (filterValue && license.name.toLowerCase().indexOf(filterValue) === -1 && license.licenseId.toLowerCase().indexOf(filterValue) === -1) {
                    return null;
                }

                const enabledIndex = enabledLicenses.indexOf(license.licenseId);

                return m('.Form-group', [
                    m('label', Switch.component({
                        state: enabledIndex > -1,
                        onchange: () => {
                            if (enabledIndex > -1) {
                                enabledLicenses.splice(enabledIndex, 1);
                            } else {
                                enabledLicenses.push(license.licenseId);
                            }

                            this.setting(settingsPrefix + 'enabled-licenses')(JSON.stringify(enabledLicenses));
                        },
                        children: license.name + ' (' + license.licenseId + ')',
                    })),
                ]);
            })),
        ];
    }
}
