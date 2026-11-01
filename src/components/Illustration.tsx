import React from 'react';
import { SvgXml } from 'react-native-svg';
import { chefSvg } from '../illustrations/chef';
import { deliverySvg } from '../illustrations/delivery';
import { favoritesSvg } from '../illustrations/favorites';

const map = { favorites: favoritesSvg, chef: chefSvg, delivery: deliverySvg } as const;
export type IllustrationName = keyof typeof map;

export default function Illustration({ name, width = 300, height = 280 }: { name: IllustrationName; width?: number; height?: number }) {
  return <SvgXml xml={map[name]} width={width} height={height} />;
}
