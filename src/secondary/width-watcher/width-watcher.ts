import { useEffect, useState } from 'react';

export function useWidthWatcher(): number {
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    return width;
}
