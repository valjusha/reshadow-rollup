import React from "react";
import render, { css } from 'reshadow';

const styles = css`layout { background-color: green }`;

export const Layout: React.FC = () => render(styles)(<layout as="p">Hello world!</layout>);
