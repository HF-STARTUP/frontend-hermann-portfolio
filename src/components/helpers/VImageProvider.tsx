"use client";

import React from "react";
import Image, {StaticImageData} from "next/image";
import {cn} from "@/utils/ui/cn";

type VImageProviderProp = { src: string | StaticImageData, alt: string, width: number, height: number}

const VImageProvider:React.FC<VImageProviderProp&React.HTMLAttributes<HTMLImageElement>> = ({ src, alt, width = 150, height = 150, className }) => {

    const blurDataURL= "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABeAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjEtYzAwMSA3OS5hOGQ0NzUzNDksIDIwMjMvMDMvMjMtMTM6MDU6NDUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyNC43IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMjZDNkY0REQ1MDExMUVFOTA0RDlDNEQ4MzlBODI5NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMjZDNkY0RUQ1MDExMUVFOTA0RDlDNEQ4MzlBODI5NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyNkM2RjRCRDUwMTExRUU5MDREOUM0RDgzOUE4Mjk1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyNkM2RjRDRDUwMTExRUU5MDREOUM0RDgzOUE4Mjk1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgEBAQEBAgICAgICAgICAgMDAwMDAgMDBAQDAwUFBQUFBgYGBgYGBgYGBgEBAQECAgIDAgIDBQQDBAUGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYG/8AAEQgACgAKAwERAAIRAQMRAf/EAHkAAQEAAAAAAAAAAAAAAAAAAAkKAQEBAQAAAAAAAAAAAAAAAAAICQcQAAADBAYLAAAAAAAAAAAAAAECAwAyBAUSM5MGBzfwETGBExQ1VTYICREAAQICBgsAAAAAAAAAAAAAAQADEgQRAnI0FQfwkbFCUkNT0wU1Bv/aAAwDAQACEQMRAD8AT+VfQsuOuJt3ZIhExEghTxySZBTVolVpmAAAdTU7msgcD8a69WAcNCHLOaOJTlRsGEUpj+Ifu5/B+YeG02sQYR0+boFvUR4txRreuWb1zqzq8HVvPg1f8w/UzFk7ECflb81aCr1tcqtN7SZ1XhObsr//2Q=="

    return (
        <>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={cn(`object-cover`, className)}
                placeholder="blur"
                blurDataURL={blurDataURL}
                priority={true}
            />
        </>
    );
};



export default VImageProvider;
