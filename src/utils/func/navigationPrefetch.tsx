"use client"

import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {logger} from "@/utils/func/devmode/debug";

const NavigationProgress = () => {
    useEffect(() => {
        const handleStart = () => {
            NProgress.start()
            logger.log('router loader start')
        };
        const handleStop = () => NProgress.done();

        NProgress.configure({ showSpinner: true });


        Router.events.on('routeChangeStart', handleStart);
        Router.events.on('routeChangeComplete', handleStop);
        Router.events.on('routeChangeError', handleStop);

        return () => {
            Router.events.off('routeChangeStart', handleStart);
            Router.events.off('routeChangeComplete', handleStop);
            Router.events.off('routeChangeError', handleStop);
        };
    }, []);

    return null; // Ce composant ne rend rien
};

export default NavigationProgress;
