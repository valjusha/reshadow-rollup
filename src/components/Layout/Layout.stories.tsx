import React from 'react';
import { storiesOf } from '@storybook/react';

import { Layout } from '../../components/Layout';

const stories = storiesOf('App test', module);

stories.add('App', () => <Layout />);
