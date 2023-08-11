import {
  Banner,
  reactExtension,
  useCartLines,
} from '@shopify/ui-extensions-react/checkout';
import { useEffect, useState } from 'react';

const euroBrands = [
  'Aldeco Fabric',
  'Alhambra Fabric',
  'Christian Fischbacher Fabric',
  'Colony Fabric',
  'Colony Wallpaper',
  'Jean Paul Gaultier Fabric',
  'Jean Paul Gaultier Wallpaper',
  'JWall Wallpaper',
  'Lelievre Fabric',
  'Lelievre Wallpaper',
  'MissoniHome Wallpaper',
  'Nicolette Mayer Fabric',
  'Nicolette Mayer Wallpaper',
  'Tassinari & Chatel Fabric',
  'JF Fabrics Wallpaper',
  'JF Fabrics Fabric',
  'Maxwell Wallpaper',
  'Maxwell Fabric',
  'Andrew Martin Fabric',
  'Andrew Martin Wallpaper',
  'Baker Lifestyle Fabric',
  'Baker Lifestyle Wallpaper',
  'Baker Lifestyle Trim',
  'Brunschwig & Fils Fabric',
  'Brunschwig & Fils Wallpaper',
  'Brunschwig & Fils Trim',
  'Cole & Son Fabric',
  'Cole & Son Wallpaper',
  'Cole & Son Trim',
  'G P & J Baker Fabric',
  'G P & J Baker Wallpaper',
  'G P & J Baker Trim',
  'Gaston Y Daniela Fabric',
  'Gaston Y Daniela Wallpaper',
  'Lee Jofa Fabric',
  'Lee Jofa Wallpaper',
  'Lee Jofa Trim',
  'Lizzo Fabric',
  'Lizzo Wallpaper',
  'Mulberry Fabric',
  'Mulberry Wallpaper',
  'Mulberry Trim',
  'Threads Fabric',
  'Threads Wallpaper',
  'Threads Trim',
  'Clarke & Clarke Fabric',
  'Clarke & Clarke Wallpaper',
  'Clarke & Clarke Trim',
  'Morris & co Fabric',
  'Morris & co Wallpaper',
  'Harlequin Fabric',
  'Harlequin Wallpaper',
  'Sanderson Fabric',
  'Sanderson Wallpaper',
  'Scion Fabric',
  'Scion Wallpaper',
  'Zoffany Fabric',
  'Zoffany Wallpaper',
  'Tres Tintas Wallpaper',
  'MindTheGap Fabric',
  'MindTheGap Pillow',
  'MindTheGap Wallpaper',
];

function POBannerExtension() {
  return (
    <Banner
      title={'We can not ship to a PO Box.'}
      status={'warning'}
      collapsible={false}
    ></Banner>
  );
}

function ShippingBannerExtension() {
  const items = useCartLines();

  const [euroBrand, setEuroBrand] = useState(false);
  const [multiBrand, setMultiBrand] = useState(false);

  useEffect(() => {
    if (Array.isArray(items) && items?.length > 0) {
      /**
       * Check if Muti-brand
       */
      const firstVendor = items[0].merchandise?.product?.vendor;
      if (
        !items.every(
          (item) => item.merchandise?.product?.vendor === firstVendor
        )
      ) {
        setMultiBrand(true);
      }

      /**
       * Check if European Brand
       */
      if (
        items.some((item) =>
          euroBrands.includes(item.merchandise?.product?.vendor)
        )
      ) {
        setEuroBrand(true);
      }
    }
  }, [items]);

  if (euroBrand || multiBrand) {
    return (
      <Banner
        title={'Expedited Shipping is not available for this order.'}
        status={'warning'}
        collapsible={false}
      ></Banner>
    );
  }

  return null;
}

const poBanner = reactExtension(
  'purchase.checkout.delivery-address.render-before',
  () => <POBannerExtension />
);

const shippingBanner = reactExtension(
  'purchase.checkout.shipping-option-list.render-before',
  () => <ShippingBannerExtension />
);

export { poBanner, shippingBanner };
