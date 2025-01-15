import {useEffect} from "react";
import AdsClickIcon from "@mui/icons-material/AdsClick";

export default function AdButton() {
    useEffect(() => {
        if (window.show_8796432) {
            return
        }

        const tag = document.createElement('script')

        tag.src = '//niphaumeenses.net/vignette.min.js'
        tag.dataset.zone = '8796432'
        tag.dataset.sdk = 'show_8796432'

        document.body.appendChild(tag)
    }, [])

    const showAd = () => {
        show_8796432()
    }

    return <AdsClickIcon sx={{position: 'absolute', bottom: 0, right: 0}} onClick={showAd}/>
}