import {
  reactExtension,
  useApplyCartLinesChange,
  useCartLines,
} from '@shopify/ui-extensions-react/checkout';
import { useEffect } from 'react';

export default reactExtension(
  'purchase.checkout.cart-line-list.render-after',
  () => <Extension />
);

function Extension() {
  const items = useCartLines();
  const applyCartLinesChange = useApplyCartLinesChange();

  useEffect(() => {
    items.forEach((item) => {
      if (
        item.quantity > 1 &&
        item.merchandise?.subtitle?.includes('Sample -')
      ) {
        applyCartLinesChange({
          type: 'updateCartLine',
          id: item.id,
          quantity: 1,
        })
          .then((result) => console.log(result))
          .catch((error) => console.log(error));
      }
    });
  }, [items]);

  return null;
}
