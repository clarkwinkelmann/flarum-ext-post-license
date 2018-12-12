import app from 'flarum/app';
import Component from 'flarum/Component';
import Select from 'flarum/components/Select';

export default class LicensePicker extends Component {
    init() {
        super.init();

        this.options = app.forum.attribute('clarkwinkelmann-post-license.enabled-licenses');
    }

    view() {
        const isPreselectedOption = this.props.license === null || this.options.indexOf(this.props.license) > -1;

        let options = {
            select: app.translator.trans('clarkwinkelmann-post-license.forum.license-picker.' + (app.forum.attribute('clarkwinkelmann-post-license.require-license') ? 'select' : 'default')),
        };

        this.options.forEach(license => {
            options[license] = license;
        });

        if (app.forum.attribute('clarkwinkelmann-post-license.allow-custom-license')) {
            options['custom'] = app.translator.trans('clarkwinkelmann-post-license.forum.license-picker.custom');
        }

        return m('.Form-group', [
            m('label', app.translator.trans('clarkwinkelmann-post-license.forum.license-picker.label')),
            Select.component({
                options,
                value: this.props.license === null ? 'select' : (isPreselectedOption ? this.props.license : 'custom'),
                onchange: value => {
                    if (value === 'custom') {
                        value = '';
                    } else if (value === 'select') {
                        value = null;
                    }

                    this.props.onchange(value);
                },
            }),
            (isPreselectedOption ? null : m('input[type=text].FormControl', {
                value: this.props.license,
                onchange: m.withAttr('value', value => {
                    this.props.onchange(value);
                }),
            })),
        ]);
    }
}
