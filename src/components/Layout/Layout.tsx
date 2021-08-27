import * as React from 'react';
import { FC } from "react";
import render, { css } from 'reshadow';

const styles = css`Layout { background-color: green }`;

export const Layout: FC = () => render(styles)(<layout as="p">Hello world!</layout>);
