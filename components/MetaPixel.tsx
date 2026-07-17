"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function MetaPixel() {
  const pathname = usePathname();
  const isFirstPageView = useRef(true);

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    // El primer PageView ya se envía desde el script inicial.
    if (isFirstPageView.current) {
      isFirstPageView.current = false;
      return;
    }

    // Registra las navegaciones internas de Next.js.
    window.fbq?.("track", "PageView");
  }, [pathname]);

  if (!pixelId) {
    return null;
  }

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s) {
            if(f.fbq) return;

            n=f.fbq=function() {
              n.callMethod
                ? n.callMethod.apply(n,arguments)
                : n.queue.push(arguments);
            };

            if(!f._fbq) f._fbq=n;

            n.push=n;
            n.loaded=true;
            n.version='2.0';
            n.queue=[];

            t=b.createElement(e);
            t.async=true;
            t.src=v;

            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s);
          }(
            window,
            document,
            'script',
            'https://connect.facebook.net/en_US/fbevents.js'
          );

          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>

      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          alt=""
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
