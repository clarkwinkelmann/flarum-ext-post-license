import {extend} from 'flarum/extend';
import app from 'flarum/app';
import DiscussionComposer from 'flarum/components/DiscussionComposer';
import LicensePicker from './components/LicensePicker';
import ReplyComposer from 'flarum/components/ReplyComposer';
import CommentPost from 'flarum/components/CommentPost';
import EditPostComposer from 'flarum/components/EditPostComposer';
import LicenseMeta from './components/LicenseMeta';

function addLicenseField(ComposerComponent) {
    ComposerComponent.prototype.clarkWinkelmannPostLicense = null;

    extend(ComposerComponent.prototype, 'headerItems', function (items) {
        items.add('clarkwinkelmann-post-license', LicensePicker.component({
            license: this.clarkWinkelmannPostLicense,
            onchange: license => {
                this.clarkWinkelmannPostLicense = license;
            },
        }));
    });

    extend(ComposerComponent.prototype, 'data', function (data) {
        data.clarkWinkelmannPostLicense = this.clarkWinkelmannPostLicense;
    });
}

app.initializers.add('clarkwinkelmann/post-license', () => {
    addLicenseField(ReplyComposer);
    addLicenseField(EditPostComposer);
    addLicenseField(DiscussionComposer);

    extend(EditPostComposer.prototype, 'init', function () {
        this.clarkWinkelmannPostLicense = this.props.post.attribute('clarkWinkelmannPostLicense');
    });

    extend(CommentPost.prototype, 'headerItems', function (items) {
        const license = this.props.post.attribute('clarkWinkelmannPostLicense');

        if (license) {
            items.add('clarkwinkelmann-post-license', LicenseMeta.component({
                license,
            }));
        }
    });
});
