import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Layout } from '../shared';

const bundleLocation = 'https://s3.amazonaws.com/dev.shut-up-tom.com/bundle.js';
const styleLocation = 'https://s3.amazonaws.com/dev.shut-up-tom.com/css/style.min.css';

export const makeStaticMarkup = (content) => (
	renderToStaticMarkup(
		<Layout content={content} bundleLocation={bundleLocation} styleLocation={styleLocation} />
));
