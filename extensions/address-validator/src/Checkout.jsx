import {
  reactExtension,
  useBuyerJourneyIntercept,
  useShippingAddress,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.delivery-address.render-before',
  () => <Extension />
);

function Extension() {
  const address = useShippingAddress();

  useBuyerJourneyIntercept(({ canBlockProgress }) => {
    if (canBlockProgress) {
      if (address?.countryCode && address?.countryCode !== 'US') {
        return {
          behavior: 'block',
          reason: 'Invalid shipping country',
          errors: [
            {
              message: 'Sorry, we can only ship to United States.',
              // Show an error underneath the country code field
              target: '$.cart.deliveryGroups[0].deliveryAddress.countryCode',
            },
            {
              // In addition, show an error at the page level
              message: 'Please use a different address.',
            },
          ],
        };
      } else if (
        address?.address1?.toLowerCase()?.includes('post box') ||
        address?.address1?.toLowerCase()?.includes('p.o.') ||
        address?.address1?.toLowerCase()?.includes('post office') ||
        address?.address1?.toLowerCase()?.includes('po box')
      ) {
        return {
          behavior: 'block',
          reason: 'Invalid shipping address',
          errors: [
            {
              message: 'We can not ship to a PO Box.',
              // Show an error underneath the country code field
              target: '$.cart.deliveryGroups[0].deliveryAddress.address1',
            },
            {
              // In addition, show an error at the page level
              message: 'Please use a different address.',
            },
          ],
        };
      } else if (
        address?.address2?.toLowerCase()?.includes('post box') ||
        address?.address2?.toLowerCase()?.includes('p.o.') ||
        address?.address2?.toLowerCase()?.includes('post office') ||
        address?.address2?.toLowerCase()?.includes('po box')
      ) {
        return {
          behavior: 'block',
          reason: 'Invalid shipping address',
          errors: [
            {
              message: 'We can not ship to a PO Box.',
              // Show an error underneath the country code field
              target: '$.cart.deliveryGroups[0].deliveryAddress.address2',
            },
            {
              // In addition, show an error at the page level
              message: 'Please use a different address.',
            },
          ],
        };
      } else {
        return {
          behavior: 'allow',
        };
      }
    }
  });

  return null;
}
