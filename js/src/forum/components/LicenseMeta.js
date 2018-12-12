import app from 'flarum/app';
import Component from 'flarum/Component';
import licenses from '../../common/licenses.json';

export default class LicenseMeta extends Component {
    init() {
        super.init();

        this.license = licenses.licenses.find(license => license.licenseId === this.props.license);
    }

    view() {
        return m('.Dropdown.PostMeta', [
            m('a[data-toggle=dropdown].Dropdown-toggle', this.shortName()),
            m('.Dropdown-menu.dropdown-menu', this.details()),
        ]);
    }

    shortName() {
        if (!this.license) {
            return app.translator.trans('clarkwinkelmann-post-license.forum.license-meta.custom');
        }

        return app.translator.trans('clarkwinkelmann-post-license.forum.license-meta.label', {
            license: this.license.licenseId,
        });
    }

    details() {
        if (!this.license) {
            return [
                m('p', m('em', app.translator.trans('clarkwinkelmann-post-license.forum.license-meta.custom-explanation'))),
                m('p', this.props.license),
            ];
        }

        return [
            m('h5', this.license.name),
            this.license.seeAlso.map(href => m('a', {
                href,
                rel: 'nofollow',
                target: '_blank',
            }, app.translator.trans('clarkwinkelmann-post-license.forum.license-meta.more'))),
        ];
    }
}
