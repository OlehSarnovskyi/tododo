import React, {useEffect, useRef} from "react";

export default function Banner() {
    const banner = useRef<HTMLDivElement>()

    const atOptions = {
        key: 'e728c0d1a1e70cafd453672a3376d226',
        format: 'iframe',
        height: 50,
        width: 320,
        params: {},
    }
    useEffect(() => {
        if (banner.current && !banner.current.firstChild) {
            const conf = document.createElement('script')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `//pl25492863.profitablecpmrate.com/${atOptions.key}/invoke.js`
            conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

            banner.current.append(conf)
            banner.current.append(script)
            console.log('banner!!!', banner);
        }
    }, [banner])

    return <div ref={banner}></div>
}