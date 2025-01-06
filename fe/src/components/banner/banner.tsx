import React, {useEffect, useRef} from "react";

interface AdsterraProps {
    slot: string;
}

const getId = (slot: string) => `atContainer-${slot}`;

export default function Banner({ slot }: AdsterraProps) {
    const ref = useRef<HTMLDivElement>()

    useEffect(() => {
        if (!ref.current.firstChild && slot) {
            const atAsyncOptions = {
                key: slot,
                format: 'js',
                async: true,
                container: getId(slot),
                params: {},
            };

            const conf = document.createElement('script');
            conf.innerHTML = `
        if (typeof atAsyncOptions !== 'object') var atAsyncOptions = [];
        atAsyncOptions.push(${JSON.stringify(atAsyncOptions, null, 2)});
      `;
            conf.type = 'text/javascript';

            const script = document.createElement('script');
            script.async = true;
            script.src = `//pl25492863.profitablecpmrate.com/${slot}/invoke.js`;
            script.type = 'text/javascript';

            if (ref.current) {
                ref.current.append(conf);
                ref.current.append(script);
            }
        }
    }, [slot]);

    return (
        <>
            <div {...{ ref }} />
            <div id={getId(slot)} />
        </>
    );
}