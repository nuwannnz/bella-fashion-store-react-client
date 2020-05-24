import React, { useState } from 'react'
import OverlayPopup from '../../../components/common/OverlayPopup'
import TextBox from '../../../components/common/TextBox'
import { useDispatch } from 'react-redux'
import { createBannerAsync, createCategoryBannerAsync } from "../../../redux/actions/banners.actions";

export default function BannerForm({ closePopup, isCategoryBanner = false }) {

    const [link, setLink] = useState('')
    const [bannerText, setBannerText] = useState('')
    const [file, setFile] = useState(null)

    const dispatch = useDispatch();
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('link', link);
        if (isCategoryBanner) {
            formData.append('text', bannerText);
        }
        formData.append('images[]', file);

        console.log(formData);
        if (isCategoryBanner) {
            dispatch(createCategoryBannerAsync(formData)).then(success => {
                if (success) {
                    closePopup();
                }
            });

        } else {

            dispatch(createBannerAsync(formData)).then(success => {
                if (success) {
                    closePopup();
                }
            });
        }
    }

    return (
        <OverlayPopup title="Add new banner"
            onClosing={closePopup}
            primaryActionText="Add banner"
            onSubmit={handleSubmit}
        >
            <div>


                <TextBox name="link" label="Link" placeholder="Enter banner link here" onTextChange={(text) => { setLink(text) }} />

                {isCategoryBanner &&
                    <TextBox name="text" label="text" placeholder="Enter banner text  here" onTextChange={(text) => { setBannerText(text) }} />
                }

                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="files" name="files" onChange={(e) => { setFile(e.target.files.item(0)); console.log(e.target.files) }} />
                    <label class="custom-file-label" for="customFile">Choose image file</label>

                    {file && <img src={file} style={{ width: '150px' }} />}
                </div>

            </div>
        </OverlayPopup>
    )
}
